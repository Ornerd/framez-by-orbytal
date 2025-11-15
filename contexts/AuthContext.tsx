import { supabase } from "@/lib/supabase";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface UserProfile {
  id: string;
  email?: string;
  name?: string;
  phoneNumber?: string;
  address?: string;
  bio?: string;
  image?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: UserProfile | null;
  loadingUser: boolean; // <-- important
  setUserData: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // 🔥 Fetch profile from DB
  const loadProfile = async (authUser: any) => {
    try {
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single();

      return { ...authUser, ...profile };
    } catch {
      return authUser;
    }
  };

  // 🔄 On startup load session + profile
  useEffect(() => {
    const init = async () => {
      setLoadingUser(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const fullUser = await loadProfile(session.user);
        setUser(fullUser);
      } else {
        setUser(null);
      }

      setLoadingUser(false);
    };

    init();

    // 🔔 Listen to login/logout events
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setLoadingUser(true);
          const fullUser = await loadProfile(session.user);
          setUser(fullUser);
          setLoadingUser(false);
        } else {
          setUser(null);
          setLoadingUser(false);
        }
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  const setUserData = (data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  };

  return (
    <AuthContext.Provider value={{ user, loadingUser, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
