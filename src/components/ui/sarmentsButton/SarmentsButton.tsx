import Link from "next/link";
import SarmentsText, { type CustomTextProps } from "../sarmentsText/SarmentsText";
import "./sarmentsButton.css";

type Theme = "dark" | "light" | "transparent" | "primary" | "ghost" | "danger";

export type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: Theme;
  hasBorder?: boolean;
  children: React.ReactNode;
  href?: string;
};

// Public themes render a pill (site); admin themes render a rectangle (back office).
const themeClass: Record<Theme, string> = {
  dark: "dark_btn",
  light: "light_btn",
  transparent: "transparent_btn",
  primary: "admin_primary_btn",
  ghost: "admin_ghost_btn",
  danger: "admin_danger_btn",
};

const ADMIN_THEMES: Theme[] = ["primary", "ghost", "danger"];

// Ghost sits on a light background, so its label is blue; every other theme is white.
const textColor: Partial<Record<Theme, CustomTextProps["color"]>> = {
  ghost: "blue",
};

export default function SarmentsButton({
  theme = "light",
  hasBorder,
  children,
  href,
  ...props
}: CustomButtonProps) {
  const base = ADMIN_THEMES.includes(theme) ? "admin_button_base" : "button_custom";
  const customClass = `${themeClass[theme]} ${hasBorder ? "border" : ""}`.trim();

  const button = (
    <button
      type="button"
      {...props}
      className={`${base} ${customClass} ${props.className ?? ""}`.trim()}
    >
      <SarmentsText format="view" color={textColor[theme] ?? "white"}>
        {children}
      </SarmentsText>
    </button>
  );

  // With `href` → navigation button (Link). Without `href` → action button (onClick).
  return href ? <Link href={href}>{button}</Link> : button;
}
