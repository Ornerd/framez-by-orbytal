import { createContext, ReactNode, useContext, useState } from "react";

// 1. Define the type for the user object (adjust properties as needed)
interface User {
    [key: string]: any;
    // Add other user properties here
}

// 2. Define the type for the entire context value
interface AuthContextType {
    user: User | null;
    setAuth: (authUser: User | null) => void;
    setUserData: (userData: User) => void;
}

// 3. Create the context with an explicit type and a default value of `undefined`
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Define the type for the AuthProvider props, including children
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    // 5. Explicitly type the state
    const [user, setUser] = useState<User | null>(null);

    const setAuth = (authUser: User | null) => {
        setUser(authUser);
    }

    const setUserData = (userData: User) => {
        setUser({ ...userData });
    }

    return (
        // 6. Ensure the value prop matches AuthContextType
        <AuthContext.Provider value={{ user, setAuth, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
}

// 7. Create a custom hook to use the context with a null check
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
