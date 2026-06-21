import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import "./legal.css";

type LegalLayoutProps = {
  title: string;
  /** Human-readable last-updated date (e.g. "21 juin 2026"). */
  updatedAt: string;
  children: React.ReactNode;
};

export default function LegalLayout({ title, updatedAt, children }: LegalLayoutProps) {
  return (
    <main className="legal">
      <article className="legal_article">
        <SarmentsText format="fat-title" className="legal_title">
          {title}
        </SarmentsText>
        <p className="legal_updated">Dernière mise à jour : {updatedAt}</p>
        <div className="legal_content">{children}</div>
      </article>
    </main>
  );
}
