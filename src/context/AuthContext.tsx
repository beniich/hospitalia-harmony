import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    loginWithGoogle: () => void;
    logout: () => void;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("hospitalia_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const loginWithGoogle = () => {
        // Mock login
        const mockUser: User = {
            id: "1",
            name: "Dr. Martin Martin",
            email: "martin.martin@hospitalia.com",
            avatar: "https://github.com/shadcn.png",
        };
        setUser(mockUser);
        localStorage.setItem("hospitalia_user", JSON.stringify(mockUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("hospitalia_user");
        // Optionally redirect here or let the ProtectedRoute handle it
    };

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated: !!user, loginWithGoogle, logout, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
