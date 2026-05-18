import Link from "next/link";
import SarmentsText from "../sarmentsText/SarmentsText";
import "./sarmentsButton.css";

export type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  href?: string;
};

export default function SarmentsButton({ children, href = "/", ...props }: CustomButtonProps) {
  return (
    <Link href={href}>
      <button type="button" {...props} className="button_custom" aria-label="button">
        <SarmentsText format="view">{children}</SarmentsText>
      </button>
    </Link>
  );
}
