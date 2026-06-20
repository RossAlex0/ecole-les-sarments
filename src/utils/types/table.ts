import { Database } from "@/lib/supabase/database.types";

export enum SupabaseTable {
  TEAM_MEMBERS = "team_members",
  TESTIMONIALS = "testimonials",
  EVENTS = "events",
}

export type TeamMembers = Database["public"]["Tables"]["team_members"]["Row"];
export type Testimonials = Database["public"]["Tables"]["testimonials"]["Row"];
export type Events = Database["public"]["Tables"]["events"]["Row"];
