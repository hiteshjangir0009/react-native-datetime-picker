import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, forwardRef, useRef } from "react";
import { Month_name, Week_name } from "../Utils/month_name";
import { WheelProps } from "../types";

const Wheel = <T extends number | string>({
  data,
  onChange,
  value,
  type,
  height,
  numRows,
  centerItem,
  textSizeActive,
  textSizeInActive,
  textWeightActive,
  textWeightInActive,
  fontFamily,
  repeat,
  format,
  year,
  month,
}: WheelProps<T>) => {
  const listref = useRef<FlatList<T> | null>(null);
  const [Data, setData] = useState<T[]>(data);

  useEffect(() => {
    setData(data);
  }, [data]);

  useEffect(() => {
    if (!listref.current) return;

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

  const renderItem = (item: T): number | string => {
    if (type === "day") {
      if (format?.day === "alphabetical") {
        const selectedYear = year || new Date().getFullYear();
        const selectedMonth = month ? month - 1 : new Date().getMonth();

        const dayvalue = item as number;

        const dateObj = new Date(selectedYear, selectedMonth, dayvalue);
        const dayIndex = dateObj.getDay();
        const dayName = Week_name[dayIndex].shortName;

        return `${dayName} ${item}`;
      }

      return item;
    }

    if (type === "month") {
      const monthValue = item as number;
      if (format?.month === "alphabeticalShort") {
        const name = Month_name.find((e) => e.id === monthValue);
        return name?.shortName || item;
      }
      if (format?.month === "alphabeticalLong") {
        const name = Month_name.find((e) => e.id == item);
        return name?.fullName || item;
      }
      return item;
    }

    if (type === "year") {
      if (format?.year === "short") {
        return String(item).slice(-2);
      }
      return item;
    }

    if (type === "hours") {
      if (format?.hours === "hh") {
        const result = String(item).padStart(2, "0");
        return `${result} hrs`;
      }
      return `${item} hrs`;
    }

    if (type === "minutes") {
      if (format?.minutes === "mm") {
        const result = String(item).padStart(2, "0");
        return `${result} min`;
      }
      return `${item} min`;
    }

    return item;
  };

  return (
    <View
      style={{
        height: height * numRows,
        width: data.length <= 2 ? 60 : undefined,
        flex: data.length > 2 ? 1 : 0,
      }}
    >
      <FlatList
        ref={listref}
        key={Data.length} // Force re-render when data length changes
        data={Data}
        bounces={false}
        overScrollMode="never"
        keyExtractor={(item, index) => `${type}-${item}-${index}`}
        snapToInterval={height}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        initialScrollIndex={Math.max(0, selectedIndex)}
        onEndReached={repeat ? loadMore : null}
        onEndReachedThreshold={0.7}
        contentContainerStyle={{
          paddingVertical: height * centerItem,
        }}
        getItemLayout={(_, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / height);
          const nextValue = Data[index % data.length];
          // if (isItemDisabled(nextValue)) return;
          onChange?.(nextValue);
        }}
        renderItem={({ item }) => (
          <View
            style={{
              height: height,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                // opacity: isItemDisabled(item) ? 0.25 : item === value ? 1 : 0.4,
                fontFamily,
                fontSize:
                  item === value
                    ? (textSizeActive ?? 18)
                    : (textSizeInActive ?? 14),
                opacity: item === value ? 1 : 0.31,
                fontWeight:
                  item === value
                    ? (textWeightActive ?? "600")
                    : (textWeightInActive ?? "400"),
              }}
            >
              {renderItem(item)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Wheel;
