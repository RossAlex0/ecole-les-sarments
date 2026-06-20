import Link from "next/link";
import SarmentsText from "../sarmentsText/SarmentsText";
import "./sarmentsButton.css";

export type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: "dark" | "light" | "transparent";
  hasBorder?: boolean;
  children: React.ReactNode;
  href?: string;
};

const themeClass = {
  dark: "dark_btn",
  light: "light_btn",
  transparent: "transparent_btn",
} as const;

export default function SarmentsButton({
  theme = "light",
  hasBorder,
  children,
  href,
  ...props
}: CustomButtonProps) {
  const customClass = `${themeClass[theme]} ${hasBorder ? "border" : ""}`;

  const button = (
    <button
      type="button"
      {...props}
      className={`button_custom ${customClass} ${props.className ?? ""}`.trim()}
    >
      <SarmentsText format="view">{children}</SarmentsText>
    </button>
  );

  // With `href` → navigation button (Link). Without `href` → action button (onClick).
  return href ? <Link href={href}>{button}</Link> : button;
}
