import CalendarPicker from "react-native-calendar-picker";
import { config } from "./configs";
import { AntDesign } from "@expo/vector-icons";
import { ComponentProps, useState } from "react";
import { formatDate, getDay } from "date-fns";

interface DatePickerProps extends ComponentProps<typeof CalendarPicker> {
  onChange: (date: Date) => void
}

const DatePicker = ({ onChange }: DatePickerProps) => {
  const disabledDays = [0, 6] // sunday and saturday

  return (
    <CalendarPicker
      onDateChange={onChange}
      previousComponent={<AntDesign name="arrowleft" size={config.fontSizes.lg} color={config.colors.background} />}
      nextComponent={<AntDesign name="arrowright" size={config.fontSizes.lg} color={config.colors.background} />}
      dayLabelsWrapper={{ borderColor: config.colors.complementary_1 }}
      selectedDayColor={config.colors.background}
      selectedDayTextColor={config.colors.Primary}
      disabledDates={date => disabledDays.includes(getDay(date))}
      disabledDatesTextStyle={{
        color: config.colors.complementary_1
      }}
      todayBackgroundColor={config.colors.Primary}
      todayTextStyle={{
        fontWeight: "bold",
      }}
      textStyle={{
        fontSize: config.fontSizes.sm,
        color: config.colors.background
      }}
      minDate={new Date()}
      restrictMonthNavigation
      selectYearTitle="Selecione o ano"
      weekdays={["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]}
      months={[
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ]}
    />
  );
};

export default DatePicker;
