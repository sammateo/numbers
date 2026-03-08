import type { Timestamp, UUID } from "..";

export interface Profile {
  id: UUID;
  first_name: string | null;
  last_name: string | null;
  username: string;
  avatar_url: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}
export interface ProfileInsert {
  id: UUID;
  first_name?: string | null;
  last_name: string | null;
  username?: string;
  avatar_url?: string | null;
}
export interface ProfileUpdate {
  first_name?: string | null;
  last_name: string | null;
  username?: string;
  avatar_url?: string | null;
  updated_at?: Timestamp;
}
