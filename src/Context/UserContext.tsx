import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import supabase from "../services/supabaseClient";
import { Session, User } from "@supabase/supabase-js";

export interface UserContextType {
  user: User | undefined;
  signIn: (
    email: string,
    password: string,
    captchaToken: string
  ) => Promise<{ needsConfirmation: boolean }>;
  signOut: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    captchaToken: string
  ) => Promise<{ needsConfirmation: boolean }>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined);

  const signIn = async (
    email: string,
    password: string,
    captchaToken: string
  ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: { captchaToken },
    });

    if (error && !data.user) {
      return Promise.reject(new Error(error?.message || "Unknown error"));
    }

    return {
      needsConfirmation: !data.user?.email_confirmed_at,
    };
  };

  const signUp = async (
    email: string,
    password: string,
    captchaToken: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { captchaToken },
    });

    if (error && !data.user) {
      console.error("Error signing up:", error.message);
      return Promise.reject(new Error(error.message));
    }

    return Promise.resolve({
      needsConfirmation: !data.user?.email_confirmed_at,
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      if (res.error) return;
      setSession(res.data.session);
      setUser(res.data.session?.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(session);
      setSession(session);
      setUser(session?.user);
    });

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
