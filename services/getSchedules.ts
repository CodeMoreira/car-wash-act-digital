import { supabase } from "./supabaseClient";

export default async function getSchedules() {
  return supabase.from("schedules").select("*");
}
