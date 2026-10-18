"use client";

import api from "@/config/axoisConfig";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: number;
  email: string;
  name?: string | null;
  phone?: string | null;
  image?: string | null;
  role: {
    roleName: string; 
  };
  doctor?: {
    specialization: string;
    bio: string;
  } | null;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get<User>("auth/me");
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("accessToken");
        
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []); 

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};