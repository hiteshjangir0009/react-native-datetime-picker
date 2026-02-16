import { jsx as _jsx } from "react/jsx-runtime";
import { FlatList, Text, View } from "react-native";
import { useState, useEffect, useRef, useMemo } from "react";
import { Month_name, Week_name } from "../Utils/month_name";
const Wheel = ({ data = [], onChange, value, type, height, numRows, centerItem, textSizeActive, textSizeInActive, textWeightActive, textWeightInActive, fontFamily, repeat, format, year, month, }) => {
    const listref = useRef(null);
    const [currentCenterIndex, setCurrentCenterIndex] = useState(0);
    useEffect(() => {
        if (!listref.current || data.length === 0)
            return;
        const baseIndex = data.indexOf(value);
        if (baseIndex === -1)
            return;
        const targetIndex = repeat ? middleOffset + baseIndex : baseIndex;
        const targetOffset = targetIndex * height;
        listref.current.scrollToOffset({
            offset: targetOffset,
            animated: false,
        });
        setCurrentCenterIndex(targetIndex);
    }, [value, data]);
    const middleOffset = repeat ? data.length : 0;
    const LOOP_MULTIPLIER = 3;
    const loopedData = useMemo(() => {
        if (!repeat)
            return data;
        let result = [];
        for (let i = 0; i < LOOP_MULTIPLIER; i++) {
            result = [...result, ...data];
        }
        return result;
    }, [data, repeat]);
    const renderItem = (item) => {
        var _a;
        if (type === "day") {
            if ((format === null || format === void 0 ? void 0 : format.day) === "alphabetical") {
                const selectedYear = year || new Date().getFullYear();
                const selectedMonth = month ? month - 1 : new Date().getMonth();
                const dateObj = new Date(selectedYear, selectedMonth, item);
                const dayIndex = dateObj.getDay();
                const dayName = (_a = Week_name[dayIndex]) === null || _a === void 0 ? void 0 : _a.shortName;
                return `${dayName} ${item}`;
            }
            return item;
        }
        if (type === "month") {
            if ((format === null || format === void 0 ? void 0 : format.month) === "alphabeticalShort") {
                const name = Month_name.find((e) => e.id == item);
                return (name === null || name === void 0 ? void 0 : name.shortName) || item;
            }
            if ((format === null || format === void 0 ? void 0 : format.month) === "alphabeticalLong") {
                const name = Month_name.find((e) => e.id == item);
                return (name === null || name === void 0 ? void 0 : name.fullName) || item;
            }
            return item;
        }
        if (type === "year") {
            if ((format === null || format === void 0 ? void 0 : format.year) === "short") {
                return String(item).slice(-2);
            }
            return item;
        }
        if (type === "hours") {
            if ((format === null || format === void 0 ? void 0 : format.hours) === "hh") {
                const result = String(item).padStart(2, "0");
                return (format === null || format === void 0 ? void 0 : format.timeFormat) !== 24 ? result : `${result} hrs`;
            }
            return (format === null || format === void 0 ? void 0 : format.timeFormat) !== 24 ? item : `${item} hrs`;
        }
        if (type === "minutes") {
            if ((format === null || format === void 0 ? void 0 : format.minutes) === "mm") {
                const result = String(item).padStart(2, "0");
                return (format === null || format === void 0 ? void 0 : format.timeFormat) !== 24 ? result : `${result} min`;
            }
            return (format === null || format === void 0 ? void 0 : format.timeFormat) !== 24 ? item : `${item} min`;
        }
        return item;
    };
    return (_jsx(View, { style: {
            height: height * numRows,
            width: data.length <= 2 ? 30 : undefined,
            flex: data.length > 2 ? 1 : 0,
        }, children: _jsx(FlatList, { ref: listref, data: loopedData, keyExtractor: (item, index) => `${type}-${item}-${index}`, snapToInterval: height, decelerationRate: "fast", disableIntervalMomentum: true, showsVerticalScrollIndicator: false, initialScrollIndex: repeat ? middleOffset + data.indexOf(value) : data.indexOf(value), contentContainerStyle: {
                paddingVertical: height * centerItem,
            }, getItemLayout: (_, index) => ({
                length: height,
                offset: height * index,
                index,
            }), 
            // ✅ FIX: Update center index in real-time
            onScroll: (e) => {
                const offsetY = e.nativeEvent.contentOffset.y;
                const newCenterIndex = Math.round(offsetY / height);
                setCurrentCenterIndex(newCenterIndex);
            }, scrollEventThrottle: 16, onMomentumScrollEnd: (e) => {
                var _a, _b;
                const offsetY = e.nativeEvent.contentOffset.y;
                const index = Math.round(offsetY / height);
                let adjustedIndex = index;
                if (repeat) {
                    const baseLength = data.length;
                    // If user scrolls into first copy → jump forward
                    if (index < baseLength) {
                        adjustedIndex = index + baseLength;
                        (_a = listref.current) === null || _a === void 0 ? void 0 : _a.scrollToOffset({
                            offset: adjustedIndex * height,
                            animated: false, // ✅ FIX: Changed to false to prevent jerk
                        });
                        setCurrentCenterIndex(adjustedIndex);
                    }
                    // If user scrolls into last copy → jump backward
                    if (index >= baseLength * 2) {
                        adjustedIndex = index - baseLength;
                        (_b = listref.current) === null || _b === void 0 ? void 0 : _b.scrollToOffset({
                            offset: adjustedIndex * height,
                            animated: false, // ✅ FIX: Changed to false to prevent jerk
                        });
                        setCurrentCenterIndex(adjustedIndex);
                    }
                }
                const nextValue = data[adjustedIndex % data.length];
                onChange === null || onChange === void 0 ? void 0 : onChange(nextValue);
            }, renderItem: ({ item, index }) => {
                // Use real-time scroll position to determine if item is centered
                const isActive = index === currentCenterIndex;
                return (_jsx(View, { style: {
                        height: height,
                        justifyContent: "center",
                    }, children: _jsx(Text, { style: {
                            fontSize: isActive
                                ? textSizeActive || 15
                                : textSizeInActive || 14,
                            fontWeight: isActive
                                ? textWeightActive || "400"
                                : textWeightInActive || "300",
                            fontFamily: fontFamily,
                            textAlign: "center",
                            lineHeight: height * 0.8, // ✅ FIX: Prevent vertical shift
                            includeFontPadding: false, // ✅ FIX: Android-specific
                        }, children: renderItem(item) }) }));
            } }) }));
};
export default Wheel;
