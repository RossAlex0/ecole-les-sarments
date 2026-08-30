import React from "react";
import "./sarmentsText.css";

export type CustomTextProps = {
  format: "fat-title" | "title" | "semi-title" | "semi-title-medium" | "text" | "view" | "small";
  color?: "white" | "blue" | "gold" | "muted" | "danger" | "success";
  /**
   * Override the rendered HTML tag without changing the visual style.
   * Used to fix heading semantics for SEO (e.g. a fat-title styled block that
   * must be an <h2> instead of the default <h1>) with zero visual impact.
   */
  as?: "h1" | "h2" | "h3" | "p" | "span";
} & React.HTMLAttributes<HTMLElement>;

const formatToTag = {
  "fat-title": "h1",
  title: "h2",
  "semi-title": "h3",
  "semi-title-medium": "h3",
  text: "p",
  view: "p",
  small: "p",
} as const;

export default function SarmentsText({
  format,
  color = "white",
  as,
  className,
  ...props
}: CustomTextProps) {
  const Tag = as ?? formatToTag[format];

  return (
    <Tag {...props} className={`custom_text_${format} text_${color} ${className ?? ""}`.trim()} />
  );
}
