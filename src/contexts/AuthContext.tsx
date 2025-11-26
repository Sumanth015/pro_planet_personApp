import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  ecoCoins: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateCoins: (coins: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("proplanet_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = JSON.parse(localStorage.getItem("proplanet_users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const loggedInUser = { id: foundUser.id, email: foundUser.email, name: foundUser.name, ecoCoins: foundUser.ecoCoins || 0 };
      setUser(loggedInUser);
      localStorage.setItem("proplanet_user", JSON.stringify(loggedInUser));
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    const users = JSON.parse(localStorage.getItem("proplanet_users") || "[]");
    
    if (users.some((u: any) => u.email === email)) {
      return { success: false, error: "Email already registered" };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      name,
      ecoCoins: 0,
    };

    users.push(newUser);
    localStorage.setItem("proplanet_users", JSON.stringify(users));
    
    const loggedInUser = { id: newUser.id, email: newUser.email, name: newUser.name, ecoCoins: 0 };
    setUser(loggedInUser);
    localStorage.setItem("proplanet_user", JSON.stringify(loggedInUser));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("proplanet_user");
  };

  const updateCoins = (coins: number) => {
    if (user) {
      const updatedUser = { ...user, ecoCoins: user.ecoCoins + coins };
      setUser(updatedUser);
      localStorage.setItem("proplanet_user", JSON.stringify(updatedUser));
      
      const users = JSON.parse(localStorage.getItem("proplanet_users") || "[]");
      const updatedUsers = users.map((u: any) => u.id === user.id ? { ...u, ecoCoins: updatedUser.ecoCoins } : u);
      localStorage.setItem("proplanet_users", JSON.stringify(updatedUsers));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateCoins }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
