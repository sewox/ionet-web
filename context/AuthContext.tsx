import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // API Base Path
  const API_BASE = ((import.meta as any).env.VITE_BASE_PATH || '/').replace(/\/$/, '');

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE}/v1/auth/check`, {
          credentials: 'include' // Important: include cookies in request
        });

        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(data.authenticated === true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (password: string) => {
    try {
      const res = await fetch(`${API_BASE}/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important: include cookies in request
        body: JSON.stringify({ password })
      });
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include' // Important: include cookies in request
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always set to false even if request fails
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};