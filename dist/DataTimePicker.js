import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyleSheet, View } from "react-native";
import { useEffect, useState, useMemo } from "react";
import Wheel from "./Components/Wheel";
export const DateTimePicker = ({ start, end, initial, selectorContainerStyle, textSizeActive = 15, textSizeInActive, textWeightActive, textWeightInActive, fontFamily, height = 44, numRows = 5, onChange, format = {
    day: "alphabetical",
    month: "alphabeticalShort",
    year: "short",
    timeFormat: 24,
    hours: "hh",
    minutes: "mm",
}, }) => {
    const initialdate = initial instanceof Date ? initial : new Date(initial !== null && initial !== void 0 ? initial : Date.now());
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
    const [meridiem, setMeridiem] = useState(period);
    // Calculate days in month - THIS IS THE FIX
    const days_DATA = useMemo(() => {
        const daysInMonth = new Date(year, month, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }, [year, month]); // Recalculate when year or month changes
    const month_DATA = Array.from({ length: 12 }, (_, i) => i + 1);
    const year_DATA = Array.from({ length: 20 }, (_, i) => 2020 + i);
    // Time
    const hour24_DATA = Array.from({ length: 24 }, (_, i) => i);
    const hour12_DATA = Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i));
    const minutes_DATA = Array.from({ length: 60 }, (_, i) => i);
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
        if (minDate && selected < minDate)
            selected = new Date(minDate);
        if (maxDate && selected > maxDate)
            selected = new Date(maxDate);
        // 🔒 Prevent infinite loop
        if (selected.getTime() !==
            new Date(year, month - 1, day, finalHour, minutes, 0).getTime()) {
            setDay(selected.getDate());
            setMonth(selected.getMonth() + 1);
            setYear(selected.getFullYear());
            setHour(format.timeFormat === 12
                ? selected.getHours() % 12 || 12
                : selected.getHours());
            setMinutes(selected.getMinutes());
            setMeridiem(selected.getHours() >= 12 ? "PM" : "AM");
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(selected);
    }, [day, month, year, hour, minutes, meridiem]);
    const to24Hour = (hour12, meridiem) => {
        if (meridiem === "AM") {
            return hour12 === 12 ? 0 : hour12;
        }
        return hour12 === 12 ? 12 : hour12 + 12;
    };
    return (_jsxs(View, { style: styles.container, children: [_jsx(View, { pointerEvents: "none", style: {
                    ...selectorContainerStyle,
                    position: "absolute",
                    top: ITEM_HEIGHT * CENTER_INDEX,
                    height: ITEM_HEIGHT,
                    left: 0,
                    right: 0,
                    backgroundColor: "#d9d9db8d",
                    borderRadius: 30,
                } }), format.day && (_jsx(Wheel, { type: "day", data: days_DATA, onChange: setDay, value: day, height: height, numRows: numRows, centerItem: CENTER_INDEX, textSizeActive: textSizeActive, textSizeInActive: textSizeInActive, textWeightActive: textWeightActive, textWeightInActive: textWeightInActive, fontFamily: fontFamily, repeat: true, format: format, year: year, month: month, minDate: start, maxDate: end })), format.month && (_jsx(Wheel, { type: "month", data: month_DATA, onChange: setMonth, value: month, height: height, numRows: numRows, centerItem: CENTER_INDEX, textSizeActive: textSizeActive, textSizeInActive: textSizeInActive, textWeightActive: textWeightActive, textWeightInActive: textWeightInActive, fontFamily: fontFamily, repeat: true, format: format, year: year, month: month, minDate: start, maxDate: end })), format.year && (_jsx(Wheel, { type: "year", data: year_DATA, onChange: setYear, value: year, height: height, numRows: numRows, centerItem: CENTER_INDEX, textSizeActive: textSizeActive, textSizeInActive: textSizeInActive, textWeightActive: textWeightActive, textWeightInActive: textWeightInActive, fontFamily: fontFamily, repeat: true, format: format, year: year, month: month, minDate: start, maxDate: end })), format.hours && (_jsx(Wheel, { type: "hours", data: format.timeFormat == 12 ? hour12_DATA : hour24_DATA, onChange: setHour, value: hour, height: height, numRows: numRows, centerItem: CENTER_INDEX, textSizeActive: textSizeActive, textSizeInActive: textSizeInActive, textWeightActive: textWeightActive, textWeightInActive: textWeightInActive, fontFamily: fontFamily, repeat: true, format: format, year: year, month: month, minDate: start, maxDate: end })), format.minutes && (_jsx(Wheel, { type: "minutes", data: minutes_DATA, onChange: setMinutes, value: minutes, height: height, numRows: numRows, centerItem: CENTER_INDEX, textSizeActive: textSizeActive, textSizeInActive: textSizeInActive, textWeightActive: textWeightActive, textWeightInActive: textWeightInActive, fontFamily: fontFamily, repeat: true, format: format, year: year, month: month, minDate: start, maxDate: end })), format.timeFormat == 12 && (_jsx(Wheel, { data: ["AM", "PM"], onChange: setMeridiem, value: meridiem, height: height, numRows: numRows, centerItem: CENTER_INDEX, textSizeActive: textSizeActive, textSizeInActive: textSizeInActive, textWeightActive: textWeightActive, textWeightInActive: textWeightInActive, fontFamily: fontFamily, year: year, month: month, minDate: start, maxDate: end }))] }));
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
});
