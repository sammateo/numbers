import { getSupabaseServerClient } from "#/lib/supabase";
import { createClient, type User } from "@supabase/supabase-js";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { createContext, useContext, useEffect, useState } from "react";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

interface SupabaseAuthState {
  isAuthenticated: boolean;
  user: any;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const SupabaseAuthContext = createContext<SupabaseAuthState | undefined>(
  undefined,
);

export function SupabaseAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.HOST_URL}/auth/callback`,
      },
    });
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <SupabaseAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export function useSupabaseAuth() {
  const context = useContext(SupabaseAuthContext);
  if (context === undefined) {
    throw new Error("useSupabaseAuth must be used within SupabaseAuthProvider");
  }
  return context;
}

export const getUserSessionFn = createServerFn().handler(async () => {
  const supabase = getSupabaseServerClient();
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) throw new Error(sessionError.message);
  //   const { data: user, error } = await supabase.auth.getUser();
  //   if (error) throw new Error(error.message);

  return {
    session: session.session,
    user: session.session?.user,
    isAuthenticated: !!session.session?.user,
  };
});

export const login = createServerFn().handler(async () => {
  const supabase = getSupabaseServerClient();
  console.log("inside the login");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.HOST_URL}/auth/callback`,
    },
  });
  if (data.url) {
    throw redirect({ href: data.url });
  }
  if (error) throw error;
});
export const logout = createServerFn().handler(async () => {
  const supabase = getSupabaseServerClient();
  console.log("inside the logout");
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
});
