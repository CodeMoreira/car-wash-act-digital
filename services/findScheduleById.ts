import { supabase } from "./supabaseClient";

interface findScheduleByIdProps {
  id: string;
}

export default async function findScheduleById({ id }: findScheduleByIdProps) {
  return supabase.from("schedules").select("*").eq("id", id).single();
}
