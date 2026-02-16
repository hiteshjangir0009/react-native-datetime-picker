# React Native Wheel DateTime Picker

A fully customizable **wheel-based Date & Time Picker** for React Native — built from scratch with smooth physics, infinite wheels, date constraints, and complete TypeScript support.

Unlike modal pickers, this component is designed to be **embedded directly in your UI**, making it ideal for booking flows, schedulers, forms, onboarding, and any design that demands control.

---

## 📸 Preview

<p align="center">
  <img src="./screenshots/iphone_example.gif" width="250" alt="Wheel DateTime Picker Preview" />
</p>

---

## ✨ Features

- 🌀 Native-like wheel scrolling (iOS style)
- 📅 Unified date & time selection
- ⏱ 12-hour and 24-hour support
- 🔒 Min / Max date constraints with auto-clamping
- 🔁 Infinite scrolling wheels
- 🧠 Automatic day handling (month length, leap years)
- 🎨 Highly customizable appearance
- 🧩 Fully typed with TypeScript
- ⚡ No native modules, zero dependencies
- 📱 Works on both iOS & Android
- 🧱 Designed for embedded layouts (not modals)

---

## 📦 Installation

```bash
npm install react-native-wheel-datetime-picker
```

or

```bash
yarn add react-native-wheel-datetime-picker
```

---

## 🚀 Basic Usage

```tsx
import { DateTimePicker } from "react-native-wheel-datetime-picker";

export default function App() {
  return (
    <DateTimePicker
      initial={new Date()}
      onChange={(date) => {
        console.log("Selected:", date);
      }}
    />
  );
}
```

---

## 🧠 How It Works

- Each unit (day, month, year, hours, minutes) is rendered as an independent **wheel**
- Wheels snap to rows for precise selection
- Values outside `start` / `end` are automatically **clamped**
- Wheels roll back to the nearest valid value when limits are exceeded
- Day count updates dynamically when month or year changes

---

## 🧩 Props

### `DateTimePickerProps`

| Prop                     | Type                      | Required | Description                   |
| ------------------------ | ------------------------- | -------- | ----------------------------- |
| `initial`                | `Date`                    | ✅       | Initial selected date         |
| `start`                  | `Date`                    | ❌       | Minimum selectable date       |
| `end`                    | `Date`                    | ❌       | Maximum selectable date       |
| `onChange`               | `(date: Date) => void`    | ❌       | Fired on every valid change   |
| `format`                 | `DateTimeFormat`          | ❌       | Display & time format options |
| `height`                 | `number`                  | ❌       | Row height (default: `44`)    |
| `numRows`                | `number`                  | ❌       | Visible rows (default: `5`)   |
| `fontFamily`             | `string`                  | ❌       | Font family                   |
| `textSizeActive`         | `number`                  | ❌       | Font size of selected item    |
| `textSizeInActive`       | `number`                  | ❌       | Font size of inactive items   |
| `textWeightActive`       | `TextStyle["fontWeight"]` | ❌       | Font weight of selected item  |
| `textWeightInActive`     | `TextStyle["fontWeight"]` | ❌       | Font weight of inactive items |
| `selectorContainerStyle` | `ViewStyle`               | ❌       | Style for selection highlight |

---

## 🎛 Format Options

### `DateTimeFormat`

```ts
type DateTimeFormat = {
  day?: "numeric" | "alphabetical";
  month?: "numeric" | "alphabeticalShort" | "alphabeticalLong";
  year?: "short" | "long";
  timeFormat?: 12 | 24;
  hours?: "hh" | "h";
  minutes?: "mm" | "m";
};
```

### Example

```tsx
<DateTimePicker
  initial={new Date()}
  format={{
    day: "alphabetical",
    month: "alphabeticalShort",
    year: "long",
    timeFormat: 12,
    hours: "hh",
    minutes: "mm",
  }}
/>
```

---

## ⏱ Min / Max Date Example

```tsx
<DateTimePicker
  initial={new Date()}
  start={new Date(2024, 0, 1)}
  end={new Date(2026, 11, 31, 23, 59)}
  onChange={(date) => console.log(date)}
/>
```

✔ If the user scrolls outside limits, the picker automatically snaps to the nearest valid value.

---

## 🧪 TypeScript Support

All public types are exported.

```ts
import type {
  DateTimePickerProps,
  DateTimeFormat,
  WheelProps,
} from "react-native-wheel-datetime-picker";
```

Provides:

- IntelliSense
- Autocomplete
- Compile-time safety
- Strongly typed formatting options

---

## 🧱 Architecture

**DateTimePicker**
Manages state, validation, date math, and constraints.

**Wheel**
Generic reusable wheel component powered by `FlatList` snapping.

**types.ts**
Public API surface for consumers.

No context, no Redux, no hidden state — just predictable React components.

---

## ⚠️ Notes

- This is an embedded picker, not modal-based
- Designed for custom layouts and complex UI flows
- No native code required
- Works in Expo and bare React Native

---

## 📄 License

MIT © 2026

---

## 🙌 Contributing

Issues and pull requests are welcome.
If you encounter a bug or want a feature, feel free to open an issue.

---

## ⭐ Why This Library Exists

Most React Native date pickers are:

- Modal-only
- Hard to customize
- Poorly typed
- Overly complex
- Difficult to embed

This library focuses on **control, composability, and developer ergonomics**.

---

Happy building 🚀
