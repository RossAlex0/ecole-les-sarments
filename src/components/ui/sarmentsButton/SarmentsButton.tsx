import Link from "next/link";
import SarmentsText from "../sarmentsText/SarmentsText";
import "./sarmentsButton.css";

export type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: "dark" | "light";
  hasBorder?: boolean;
  children: React.ReactNode;
  href?: string;
};

export default function SarmentsButton({
  theme,
  hasBorder,
  children,
  href,
  ...props
}: CustomButtonProps) {
  const customClass = `${theme === "dark" ? "dark_btn" : "light_btn"} ${hasBorder ? "border" : ""}`;

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
