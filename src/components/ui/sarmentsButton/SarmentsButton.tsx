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
  href = "/",
  ...props
}: CustomButtonProps) {
  const customClass = `${theme === "dark" ? "dark_btn" : "light_btn"} ${hasBorder ? "border" : ""}`;

  return (
    <Link href={href}>
      <button
        type="button"
        {...props}
        className={`button_custom ${customClass} ${props.className}`}
        aria-label="button"
      >
        <SarmentsText format="view">{children}</SarmentsText>
      </button>
    </Link>
  );
}
