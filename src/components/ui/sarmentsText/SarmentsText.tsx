import React from "react";
import "./sarmentsText.css";

export type CustomTextProps = {
  format: "fat-title" | "title" | "semi-title" | "semi-title-medium" | "text" | "view";
  color?: "white" | "blue" | "gold";
} & React.HTMLAttributes<HTMLElement>;

const formatToTag = {
  "fat-title": "h1",
  title: "h2",
  "semi-title": "h3",
  "semi-title-medium": "h3",
  text: "p",
  view: "p",
} as const;

export default function SarmentsText({
  format,
  color = "white",
  className,
  ...props
}: CustomTextProps) {
  const Tag = formatToTag[format];

  return (
    <Tag {...props} className={`custom_text_${format} text_${color} ${className ?? ""}`.trim()} />
  );
}
