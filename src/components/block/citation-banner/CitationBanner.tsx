import Quote from "@/components/ui/quote/Quote";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";

import "./citationBanner.css";

export default function CitationBanner() {
  return (
    <div className="citation_banner">
      <Quote className="first_quote" />
      <div className="citation_banner_title">
        <SarmentsText format="fat-title" as="h2">
          Connaître pour aimer, aimer pour connaître
        </SarmentsText>
        <SarmentsText format="text" className="citation_banner_title_desc">
          Transmettre l’excellence et former chaque enfant dans toutes ses dimensions
          intellectuelles et humaines : telle est la vocation des Sarments où chaque élève découvre,
          s’épanouit et rayonne.
        </SarmentsText>
      </div>
      <Quote className="last_quote" />
    </div>
  );
}
