
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { logSecurityEvent, validateSession } from '@/lib/utils';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  checkUserRole: () => Promise<void>;
  // Legacy method for backward compatibility
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkUserRole = async () => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    try {
      // Check if user has admin role
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      setIsAdmin(!error && !!data);
    } catch (error) {
      console.error('Error checking user role:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Set up auth state listener with enhanced security
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        // Log security events for monitoring
        if (event === 'SIGNED_IN') {
          logSecurityEvent('user_login', { 
            userId: session?.user?.id,
            timestamp: new Date().toISOString()
          });
        } else if (event === 'SIGNED_OUT') {
          logSecurityEvent('user_logout', { 
            userId: user?.id,
            timestamp: new Date().toISOString()
          });
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Validate session timeout
          if (!validateSession()) {
            await signOut();
            return;
          }
          
          // Defer the role check to avoid potential deadlocks
          setTimeout(async () => {
            try {
              const { data, error } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', session.user.id)
                .eq('role', 'admin')
                .maybeSingle();

              setIsAdmin(!error && !!data);
            } catch (error) {
              console.error('Error checking user role:', error);
              setIsAdmin(false);
            }
          }, 100);
        } else {
          setIsAdmin(false);
          localStorage.removeItem('lastActivity');
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session with validation
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && !validateSession()) {
        // Session expired, sign out
        signOut();
        return;
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Check role for existing session
        setTimeout(async () => {
          try {
            const { data, error } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', session.user.id)
              .eq('role', 'admin')
              .maybeSingle();

            setIsAdmin(!error && !!data);
          } catch (error) {
            console.error('Error checking user role:', error);
            setIsAdmin(false);
          }
        }, 100);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [user?.id]);

  const signUp = async (email: string, password: string) => {
    try {
      // Enhanced sign up with security logging
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });
      
      if (error) {
        await logSecurityEvent('signup_failed', { 
          email,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        throw error;
      }
      
      await logSecurityEvent('signup_success', { 
        email,
        userId: data.user?.id,
        timestamp: new Date().toISOString()
      });
      
      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        await logSecurityEvent('login_failed', { 
          email,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        throw error;
      }
      
      // Initialize session tracking on successful login
      localStorage.setItem('lastActivity', Date.now().toString());
      
      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    await logSecurityEvent('user_logout', { 
      userId: user?.id,
      timestamp: new Date().toISOString()
    });
    
    localStorage.removeItem('lastActivity');
    await supabase.auth.signOut();
  };

  // Legacy methods for backward compatibility
  const login = async (email: string, password: string): Promise<boolean> => {
    const { error } = await signIn(email, password);
    return !error;
  };

  const logout = async () => {
    await signOut();
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isAuthenticated,
      isAdmin,
      loading,
      signUp,
      signIn,
      signOut,
      checkUserRole,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
