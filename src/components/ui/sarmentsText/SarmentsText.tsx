import React from "react";
import "./sarmentsText.css";

export type CustomTextProps = {
  format: "fat-title" | "title" | "semi-title" | "semi-title-medium" | "text" | "view";
  isDark?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const formatToTag = {
  "fat-title": "h1",
  title: "h2",
  "semi-title": "h3",
  "semi-title-medium": "h3",
  text: "p",
  view: "p",
} as const;

export default function SarmentsText({ format, isDark, className, ...props }: CustomTextProps) {
  const Tag = formatToTag[format];
  const theme = isDark ? "dark" : "light";

  return <Tag {...props} className={`custom_text_${format} ${theme} ${className ?? ""}`.trim()} />;
}
