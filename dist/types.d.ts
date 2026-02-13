import { TextStyle, ViewStyle } from "react-native";
export type Items = {
    key: number;
    id: number;
    shortName: string;
    fullName: string;
};
export type DateTimeFormat = {
    day?: "numeric" | "alphabetical";
    month?: "numeric" | "alphabeticalShort" | "alphabeticalLong";
    year?: "short" | "long";
    timeFormat?: 24 | 12;
    hours?: "hh" | "h";
    minutes?: "mm" | "m";
};
export interface DateTimePickerProps {
    start?: Date;
    end?: Date;
    initial: Date;
    selectorContainerStyle?: ViewStyle;
    textSizeActive?: TextStyle["fontSize"];
    textSizeInActive?: TextStyle["fontSize"];
    textWeightActive?: TextStyle["fontWeight"];
    textWeightInActive?: TextStyle["fontWeight"];
    fontFamily?: string;
    height?: number;
    numRows?: number;
    onChange?: (date: Date) => void;
    format?: DateTimeFormat;
}
export type WheelTypes = "day" | "month" | "year" | "hours" | "minutes";
export interface WheelProps<T = number | string> {
    data: T[];
    onChange: (value: T) => void;
    value: T;
    height: number;
    numRows: number;
    centerItem: number;
    type?: WheelTypes;
    textSizeActive?: number;
    textSizeInActive?: number;
    textWeightActive?: TextStyle["fontWeight"];
    textWeightInActive?: TextStyle["fontWeight"];
    fontFamily?: TextStyle["fontFamily"];
    repeat?: boolean;
    format?: DateTimeFormat;
    year?: number;
    month?: number;
    minDate?: Date;
    maxDate?: Date;
}
//# sourceMappingURL=types.d.ts.map