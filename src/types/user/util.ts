import type { User, Session } from "@supabase/supabase-js";
import type { UUID } from "..";
export interface UserSearchResult {
  id: UUID;
  username: string;
  avatar_url: string | null;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
}
