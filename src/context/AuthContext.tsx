import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';
import {
  getAuthToken,
  loginAdmin,
  logoutAdmin,
  fetchCurrentAdmin,
  setAuthToken,
  removeAuthToken
} from '../services/adminApi';

interface AuthContextType {
  admin: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAdmin: () => Promise<void>;
  setAdminUser: (admin: AdminUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initAuth() {
      const storedToken = getAuthToken();
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const currentAdmin = await fetchCurrentAdmin();
        setAdmin(currentAdmin);
        setToken(storedToken);
      } catch (err) {
        console.warn('Initial auth check failed:', err);
        removeAuthToken();
        setAdmin(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await loginAdmin(email, password);
      setToken(result.token);
      setAdmin(result.admin);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutAdmin();
    } finally {
      setAdmin(null);
      setToken(null);
      removeAuthToken();
    }
  };

  const refreshAdmin = async () => {
    try {
      const current = await fetchCurrentAdmin();
      setAdmin(current);
    } catch (err) {
      console.warn('Failed to refresh admin:', err);
    }
  };

  const setAdminUser = (user: AdminUser) => {
    setAdmin(user);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!admin && !!token,
        isLoading,
        login,
        logout,
        refreshAdmin,
        setAdminUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
