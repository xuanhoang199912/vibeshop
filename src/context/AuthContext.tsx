import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "vibeshop_users";
const SESSION_KEY = "vibeshop_session";

type StoredUser = User & { password: string };

function toSafeUser(storedUser: StoredUser): User {
  return {
    id: storedUser.id,
    name: storedUser.name,
    email: storedUser.email,
    phone: storedUser.phone,
    address: storedUser.address,
  };
}

function loadUsers(): Record<string, StoredUser> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, StoredUser>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      const users = loadUsers();
      const found = Object.values(users).find((u) => u.id === session);
      if (found) {
        setUser(toSafeUser(found));
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = loadUsers();
    const found = Object.values(users).find((u) => u.email === email && u.password === password);
    if (found) {
      setUser(toSafeUser(found));
      localStorage.setItem(SESSION_KEY, found.id);
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    const users = loadUsers();
    if (Object.values(users).some((u) => u.email === email)) return false;
    const id = "user_" + Date.now();
    const newUser = { id, name, email, phone, address: "", password };
    users[id] = newUser;
    saveUsers(users);
    setUser(toSafeUser(newUser));
    localStorage.setItem(SESSION_KEY, id);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const users = loadUsers();
    const updated = { ...users[user.id], ...data };
    users[user.id] = updated;
    saveUsers(users);
    setUser(toSafeUser(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
