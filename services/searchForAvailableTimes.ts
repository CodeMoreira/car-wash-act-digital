import { parse, addMinutes, isWithinInterval, format } from "date-fns";
import { supabase } from "./supabaseClient";

interface searchForAvailableTimesProps {
  date: Date;
}

export default async function searchForAvailableTimes({
  date,
}: searchForAvailableTimesProps) {
  const { data, error } = await supabase
    .from("schedules")
    .select(
      `
        time,
        wash_type
    `
    )
    .eq("date", date);

  if (error) {
    return { error };
  } else {
    const bookedTimes = data.flatMap((booking) => {
      const startTime = parse(booking.time, "HH:mm", new Date());
      const duration = booking.wash_type === "COMPLETA" ? 45 : 30; // Duração baseada no tipo de lavagem
      return Array.from({ length: duration / 15 }).map((_, index) =>
        addMinutes(startTime, index * 15)
      );
    });

    const workingHours = {
      start: parse("10:00", "HH:mm", new Date()),
      end: parse("17:15", "HH:mm", new Date()),
    }; // Ajuste para garantir que as lavagens terminem dentro do expediente
    const lunchBreak = {
      start: parse("12:00", "HH:mm", new Date()),
      end: parse("13:00", "HH:mm", new Date()),
    };

    let currentTime = workingHours.start;
    const freeSlots = [];

    while (isWithinInterval(currentTime, workingHours)) {
      if (isWithinInterval(currentTime, lunchBreak)) {
        currentTime = addMinutes(lunchBreak.end, 15); // Pula para depois do intervalo de almoço
        continue;
      }

      const isBooked = bookedTimes.some(
        (bookedTime) => bookedTime.getTime() === currentTime.getTime()
      );

      if (!isBooked) {
        freeSlots.push(format(currentTime, "HH:mm"));
      }

      currentTime = addMinutes(currentTime, 15); // Verifica o próximo incremento de 15 minutos
    }

    return { data: freeSlots };
  }
}
