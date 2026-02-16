import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useMemo, useRef } from "react";
import Wheel from "./Components/Wheel";
import { DateTimePickerProps } from "./types";

export const DateTimePicker = ({
  start,
  end,
  initial,
  selectorContainerStyle,
  textSizeActive = 15,
  textSizeInActive,
  textWeightActive,
  textWeightInActive,
  fontFamily,
  height = 44,
  numRows = 5,
  onChange,
  format = {
    day: "alphabetical",
    month: "alphabeticalShort",
    year: "short",
    timeFormat: 24,
    hours: "hh",
    minutes: "mm",
  },
}: DateTimePickerProps) => {
  const initialdate =
    initial instanceof Date ? initial : new Date(initial ?? Date.now());
  const minDate = start instanceof Date ? start : null;
  const maxDate = end instanceof Date ? end : null;

  const hours24 = initialdate.getHours();
  const hours12 = hours24 % 12 || 12;
  const period = hours24 >= 12 ? "PM" : "AM";

  // State declarations
  const [day, setDay] = useState(initialdate.getDate());
  const [month, setMonth] = useState(initialdate.getMonth() + 1);
  const [year, setYear] = useState(initialdate.getFullYear());
  const [hour, setHour] = useState(format.timeFormat == 24 ? hours24 : hours12);
  const [minutes, setMinutes] = useState(initialdate.getMinutes());
  const [meridiem, setMeridiem] = useState<"AM" | "PM">(period);

  const firstDayOfMonth = 1;
  const lastDayOfMonth = new Date(year, month, 0).getDate();

  // Calculate days in month
  const days_DATA = useMemo(() => {
    let min_day = firstDayOfMonth;
    let max_Day = lastDayOfMonth;

    if (
      minDate &&
      year === minDate.getFullYear() &&
      month === minDate.getMonth() + 1
    ) {
      min_day = minDate.getDate();
    }
    if (
      maxDate &&
      year === maxDate.getFullYear() &&
      month === maxDate.getMonth() + 1
    ) {
      max_Day = maxDate.getDate();
    }

    const array = Array.from(
      { length: max_Day - min_day + 1 },
      (_, i) => min_day + i,
    );
    return array;
  }, [year, month]); // Recalculate when year or month changes

  const month_DATA = useMemo(() => {
    let min_month = 1;
    let max_month = 12;

    if (minDate) {
      min_month = minDate.getMonth() + 1;
    }
    if (maxDate) {
      max_month = maxDate.getMonth() + 1;
    }

    const array = Array.from(
      { length: max_month - min_month + 1 },
      (_, i) => min_month + i,
    );
    return array;
  }, [minDate, maxDate]);

  const year_DATA = useMemo(() => {
    let min_year = 2020;
    let max_year = 2050;

    if (minDate) {
      min_year = minDate.getFullYear();
    }
    if (maxDate) {
      max_year = maxDate.getFullYear();
    }

    const array = Array.from(
      { length: max_year - min_year + 1 },
      (_, i) => min_year + i,
    );
    return array;
  }, [minDate, maxDate]);

  // Time
  const hour24_DATA = useMemo(() => {
    let min_hour = 0;
    let max_hour = 23;

    if (minDate) min_hour = minDate.getHours();
    if (maxDate) max_hour = maxDate.getHours();
    const array = Array.from(
      { length: max_hour - min_hour + 1 },
      (_, i) => min_hour + i,
    );
    return array;
  }, [minDate, maxDate]);
  const hour12_DATA = useMemo(() => {
    let min_hour = 1;
    let max_hour = 12;

    if (minDate) min_hour = minDate.getHours() === 0 ? 12 : minDate.getHours();
    if (maxDate) max_hour = maxDate.getHours() === 0 ? 12 : maxDate.getHours();

    const array = Array.from({ length: max_hour - min_hour + 1 }, (_, i) =>
      min_hour + i === 0 ? 12 : min_hour + i,
    );
    return array;
  }, [minDate, maxDate]);
  const minutes_DATA = Array.from({ length: 60 }, (_, i) => i);
  const meridiem_DATA = ["AM", "PM"];

  const to12 = (h24: number) => {
    const h = h24 % 12;
    return h === 0 ? 12 : h;
  };

  const ITEM_HEIGHT = height || 44;
  const VISIBLE_ITEMS = numRows || 3;
  const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2);

  // Adjust day if it exceeds days in new month
  useEffect(() => {
    const maxDay = new Date(year, month, 0).getDate();
    if (day > maxDay) {
      setDay(maxDay);
    }
  }, [year, month]);

  useEffect(() => {
    let finalHour = hour;
    if (format.timeFormat === 12) {
      finalHour = to24Hour(hour, meridiem);
    }

    let selected = new Date(year, month - 1, day, finalHour, minutes, 0);

    if (minDate && selected < minDate) selected = new Date(minDate);
    if (maxDate && selected > maxDate) selected = new Date(maxDate);

    // 🔒 Prevent infinite loop
    if (
      selected.getTime() !==
      new Date(year, month - 1, day, finalHour, minutes, 0).getTime()
    ) {
      setDay(selected.getDate());
      setMonth(selected.getMonth() + 1);
      setYear(selected.getFullYear());
      setHour(
        format.timeFormat === 12
          ? selected.getHours() % 12 || 12
          : selected.getHours(),
      );
      setMinutes(selected.getMinutes());
      setMeridiem(selected.getHours() >= 12 ? "PM" : "AM");
    }

    onChange?.(selected);
  }, [day, month, year, hour, minutes, meridiem]);

  const to24Hour = (hour12: number, meridiem: "AM" | "PM") => {
    if (meridiem === "AM") {
      return hour12 === 12 ? 0 : hour12;
    }
    return hour12 === 12 ? 12 : hour12 + 12;
  };

  return (
    <View style={styles.container}>
      {/* Selection window */}
      <View
        pointerEvents="none"
        style={{
          ...selectorContainerStyle,
          position: "absolute",
          top: ITEM_HEIGHT * CENTER_INDEX,
          height: ITEM_HEIGHT,
          left: 0,
          right: 0,
          backgroundColor: "#d9d9db8d",
          borderRadius: 30,
        }}
      />

      {format.day && (
        <Wheel
          type="day"
          data={days_DATA}
          onChange={setDay}
          value={day}
          height={height}
          numRows={numRows}
          centerItem={CENTER_INDEX}
          textSizeActive={textSizeActive}
          textSizeInActive={textSizeInActive}
          textWeightActive={textWeightActive}
          textWeightInActive={textWeightInActive}
          fontFamily={fontFamily}
          repeat={true}
          format={format}
          year={year}
          month={month}
          minDate={start}
          maxDate={end}
        />
      )}

      {format.month && (
        <Wheel
          type="month"
          data={month_DATA}
          onChange={setMonth}
          value={month}
          height={height}
          numRows={numRows}
          centerItem={CENTER_INDEX}
          textSizeActive={textSizeActive}
          textSizeInActive={textSizeInActive}
          textWeightActive={textWeightActive}
          textWeightInActive={textWeightInActive}
          fontFamily={fontFamily}
          repeat={true}
          format={format}
          year={year}
          month={month}
          minDate={start}
          maxDate={end}
        />
      )}

      {format.year && (
        <Wheel
          type="year"
          data={year_DATA}
          onChange={setYear}
          value={year}
          height={height}
          numRows={numRows}
          centerItem={CENTER_INDEX}
          textSizeActive={textSizeActive}
          textSizeInActive={textSizeInActive}
          textWeightActive={textWeightActive}
          textWeightInActive={textWeightInActive}
          fontFamily={fontFamily}
          repeat={true}
          format={format}
          year={year}
          month={month}
          minDate={start}
          maxDate={end}
        />
      )}

      {format.hours && (
        <Wheel
          type="hours"
          data={format.timeFormat == 12 ? hour12_DATA : hour24_DATA}
          onChange={setHour}
          value={hour}
          height={height}
          numRows={numRows}
          centerItem={CENTER_INDEX}
          textSizeActive={textSizeActive}
          textSizeInActive={textSizeInActive}
          textWeightActive={textWeightActive}
          textWeightInActive={textWeightInActive}
          fontFamily={fontFamily}
          repeat={true}
          format={format}
          year={year}
          month={month}
          minDate={start}
          maxDate={end}
        />
      )}

      {format.minutes && (
        <Wheel
          type="minutes"
          data={minutes_DATA}
          onChange={setMinutes}
          value={minutes}
          height={height}
          numRows={numRows}
          centerItem={CENTER_INDEX}
          textSizeActive={textSizeActive}
          textSizeInActive={textSizeInActive}
          textWeightActive={textWeightActive}
          textWeightInActive={textWeightInActive}
          fontFamily={fontFamily}
          repeat={true}
          format={format}
          year={year}
          month={month}
          minDate={start}
          maxDate={end}
        />
      )}

      {format.timeFormat == 12 && (
        <Wheel<"AM" | "PM">
          data={["AM", "PM"]}
          onChange={setMeridiem}
          value={meridiem}
          height={height}
          numRows={numRows}
          centerItem={CENTER_INDEX}
          textSizeActive={textSizeActive}
          textSizeInActive={textSizeInActive}
          textWeightActive={textWeightActive}
          textWeightInActive={textWeightInActive}
          fontFamily={fontFamily}
          year={year}
          month={month}
          minDate={start}
          maxDate={end}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
