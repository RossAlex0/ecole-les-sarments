import { Database } from "@/lib/supabase/database.types";

export enum SupabaseTable {
  TEAM_MEMBERS = "team_members",
  TESTIMONIALS = "testimonials",
}

export type TeamMembers = Database["public"]["Tables"]["team_members"]["Row"];
export type Testimonials = Database["public"]["Tables"]["testimonials"]["Row"];
