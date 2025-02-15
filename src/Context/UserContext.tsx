import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import supabase from "../supabaseClient";
import { User } from "@supabase/supabase-js";

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error && !data.user) {
      console.error("Error signing in:", error.message);
      return Promise.reject(new Error(error?.message || "Unknown error"));
    }

    setUser(data.user);
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error signing up:", error.message);
      return Promise.reject(new Error(error.message));
    }

    // Проверяем, есть ли пользователь (подтверждение email может требоваться)
    if (!data.user) {
      return Promise.reject(new Error("Check your email for confirmation."));
    }

    // После успешной регистрации, сразу выполняем вход
    signIn(email, password);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      if (res.error) return;
      setUser(res.data.session?.user || null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, signIn, signOut, signUp }}>
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
