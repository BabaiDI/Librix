import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import supabase from "../services/supabaseClient";
import { User } from "@supabase/supabase-js";
import { AuthModal } from "@modals/auth/AuthModal";
import { Tables } from "@consts/database.types";

interface UserContextType {
  user: User | null;
  profile: Tables<"profile"> | null;
  signIn: (
    email: string,
    password: string,
    captchaToken: string
  ) => Promise<{ needsConfirmation: boolean }>;
  signOut: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    captchaToken: string,
    username: string
  ) => Promise<{ needsConfirmation: boolean }>;
  openAuthModal: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Tables<"profile"> | null>(null);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const openAuthModal = () => {
    setAuthModalOpen(true);
  };
  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const signIn = async (email: string, password: string, captchaToken: string) => {
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
    username: string,
    captchaToken: string
  ) => {
    const hasSpaces = username.includes(" ");

    if (hasSpaces) {
      console.error("username has space");
      return Promise.reject(new Error("username can`t include spaces"));
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        captchaToken,
        data: {
          name: username,
        },
      },
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
      if (res.error) {
        console.error("Error getting session:", res.error);
        return;
      }
      setUser(res.data.session?.user || null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    supabase
      .from("profile")
      .select()
      .eq("id", user.id)
      .single()
      .then((data) => {
        setProfile(data.data);
      });
  }, [user]);

  return (
    <UserContext.Provider value={{ user, profile, signIn, signOut, signUp, openAuthModal }}>
      <>
        <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
        {children}
      </>
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
