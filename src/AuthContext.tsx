// src/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from './config/supabaseClient'; // Adjust path if needed
import { User, Session } from '@supabase/supabase-js';

// Define the shape of your AuthContext
interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ user: User | null; session: Session | null }>;
  signup: (
    email: string,
    password: string
  ) => Promise<{ data: { user: User | null; session: Session | null } | null; error: any }>;
    logout: () => Promise<void>;
  loading: boolean; // FIX: Added 'loading' property here
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true); // Initial state set to true

  useEffect(() => {
    // Listener for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false); // Set loading to false once the initial state is determined
    });

    // Initial check for session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false); // Set loading to false after the initial session fetch
    });

    // Clean up the subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data.user);
      setSession(data.session);
      return { user: data.user, session: data.session }; // ✅ Return user for use in LoginPage
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) return { data: null, error }; // ✅ Include error explicitly
      setUser(data.user);
      setSession(data.session);
      return { data, error: null }; // ✅ Include data + error
    } finally {
      setLoading(false);
    }
  };
  

  const logout = async () => {
    setLoading(true); // Set loading to true during logout attempt
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSession(null);
    } finally {
      setLoading(false); // Always set loading to false when done
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};