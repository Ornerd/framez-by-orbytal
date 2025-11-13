import { supabase } from "@/lib/supabase"; // adjust this import to your project path
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface User {
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
  user: User | null;
  setAuth: (authUser: User | null) => void;
  setUserData: (userData: User) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const setAuth = (authUser: User | null) => {
    setUser(authUser);
  };

  const setUserData = (userData: User) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  // Rehydrate user from Supabase on startup
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { data: profile, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (!error && profile) {
          setUser({ ...session.user, ...profile });
        } else {
          // fallback to session data if no profile row found
          setUser(session.user);
        }
      }

      setLoading(false);
    };

    loadUser();

    // 🔄 Optional: subscribe to auth changes (login/logout)
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setAuth, setUserData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
