import Link from "next/link";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import "@/styles/not-found.css";

export default function NotFound() {
  return (
    <main className="not_found">
      <div className="not_found_content">
        <p className="not_found_code">404</p>

        <SarmentsText format="fat-title" className="not_found_title">
          Page introuvable
        </SarmentsText>

        <SarmentsText format="text" className="not_found_text">
          Désolé, la page que vous recherchez semble s&apos;être égarée dans les vignes. Elle a
          peut-être été déplacée ou n&apos;existe plus.
        </SarmentsText>

        <div className="not_found_actions">
          <SarmentsButton href="/">Retour à l&apos;accueil</SarmentsButton>
          <Link href="/contact" className="not_found_link">
            Nous contacter
          </Link>
        </div>
      </div>

      <div className="not_found_decoration" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.3"
          />
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.5"
          />
          <circle
            cx="100"
            cy="100"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.7"
          />
        </svg>
      </div>
    </main>
  );
}
