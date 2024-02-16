import { supabase } from "./supabaseClient";

export interface newScheduleProps {
  plate: string;
  wash_type: string;
  date: Date;
  time: string;
}

export default async function newSchedule(values: newScheduleProps) {
  return supabase.from("schedules").insert(values);
}
