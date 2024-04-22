// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the user data, adjust it to match your user data structure
interface User {
  email: string;
  username: string;
}

// Define the shape of the context data
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    signup: (userData: User) => void; // Add this line
    logout: () => void;
    isLoggedIn: () => boolean;
  }

// Initialize the context with a default value
export const AuthContext = createContext<AuthContextType | null>(null);

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const signup = async (userData: User) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockResponse = {
        user: userData,
        token: 'mock-token-123456', // This would be provided by your backend in a real scenario
      };
  
      // Simulate setting items in localStorage
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      localStorage.setItem('token', mockResponse.token);
  
      // Update state to reflect that the user is now logged in
      setUser(mockResponse.user);
  
    } catch (error) {
      // Handle errors - for example, by setting an error state
      console.error('Error during signup:', error);
      throw error;
    }
  };
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isLoggedIn = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context to be used by other components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
