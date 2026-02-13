import { jsx as _jsx } from "react/jsx-runtime";
import { FlatList, Text, View } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Month_name, Week_name } from "../Utils/month_name";
const Wheel = ({ data, onChange, value, type, height, numRows, centerItem, textSizeActive, textSizeInActive, textWeightActive, textWeightInActive, fontFamily, repeat, format, year, month, }) => {
    const listref = useRef(null);
    const [Data, setData] = useState(data);
    useEffect(() => {
        setData(data);
    }, [data]);
    useEffect(() => {
        if (!listref.current)
            return;
        const index = data.indexOf(value);
        if (index >= 0) {
            listref.current.scrollToIndex({
                index,
                animated: true,
            });
        }
    }, [value]);
    const selectedIndex = Data.indexOf(value);
    const loadMore = () => {
        setData((prev) => [...prev, ...data]);
    };
    const renderItem = (item) => {
        if (type === "day") {
            if ((format === null || format === void 0 ? void 0 : format.day) === "alphabetical") {
                const selectedYear = year || new Date().getFullYear();
                const selectedMonth = month ? month - 1 : new Date().getMonth();
                const dayvalue = item;
                const dateObj = new Date(selectedYear, selectedMonth, dayvalue);
                const dayIndex = dateObj.getDay();
                const dayName = Week_name[dayIndex].shortName;
                return `${dayName} ${item}`;
            }
            return item;
        }
        if (type === "month") {
            const monthValue = item;
            if ((format === null || format === void 0 ? void 0 : format.month) === "alphabeticalShort") {
                const name = Month_name.find((e) => e.id === monthValue);
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
                return `${result} hrs`;
            }
            return `${item} hrs`;
        }
        if (type === "minutes") {
            if ((format === null || format === void 0 ? void 0 : format.minutes) === "mm") {
                const result = String(item).padStart(2, "0");
                return `${result} min`;
            }
            return `${item} min`;
        }
        return item;
    };
    return (_jsx(View, { style: {
            height: height * numRows,
            width: data.length <= 2 ? 60 : undefined,
            flex: data.length > 2 ? 1 : 0,
        }, children: _jsx(FlatList, { ref: listref, data: Data, bounces: false, overScrollMode: "never", keyExtractor: (item, index) => `${type}-${item}-${index}`, snapToInterval: height, decelerationRate: "fast", showsVerticalScrollIndicator: false, initialScrollIndex: Math.max(0, selectedIndex), onEndReached: repeat ? loadMore : null, onEndReachedThreshold: 0.7, contentContainerStyle: {
                paddingVertical: height * centerItem,
            }, getItemLayout: (_, index) => ({
                length: height,
                offset: height * index,
                index,
            }), onMomentumScrollEnd: (e) => {
                const index = Math.round(e.nativeEvent.contentOffset.y / height);
                const nextValue = Data[index % data.length];
                // if (isItemDisabled(nextValue)) return;
                onChange === null || onChange === void 0 ? void 0 : onChange(nextValue);
            }, renderItem: ({ item }) => (_jsx(View, { style: {
                    height: height,
                    justifyContent: "center",
                    alignItems: "center",
                }, children: _jsx(Text, { style: {
                        // opacity: isItemDisabled(item) ? 0.25 : item === value ? 1 : 0.4,
                        fontFamily,
                        fontSize: item === value
                            ? (textSizeActive !== null && textSizeActive !== void 0 ? textSizeActive : 18)
                            : (textSizeInActive !== null && textSizeInActive !== void 0 ? textSizeInActive : 14),
                        opacity: item === value ? 1 : 0.31,
                        fontWeight: item === value
                            ? (textWeightActive !== null && textWeightActive !== void 0 ? textWeightActive : "600")
                            : (textWeightInActive !== null && textWeightInActive !== void 0 ? textWeightInActive : "400"),
                    }, children: renderItem(item) }) })) }, Data.length) }));
};
export default Wheel;
