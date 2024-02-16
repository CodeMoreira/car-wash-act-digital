import { scheduleData } from "../app/schedule/list";
import { supabase } from "./supabaseClient";

interface updateScheduleProps {
  id: string;
  status: scheduleData["status"];
}

export default async function updateSchedule({
  id,
  status,
}: updateScheduleProps) {
  return supabase.from("schedules").update({ status }).eq("id", id);
}
