import Image from "next/image";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import "./supportTrust.css";

export default function SupportTrust() {
  return (
    <section className="support_trust">
      <div className="support_trust_card">
        <SarmentsText format="title">Ils nous font confiance</SarmentsText>

        <div className="support_trust_logos">
          <Image
            src="/logo/logo-fondation-pour-ecole.svg"
            alt="Fondation pour l'école"
            width={210}
            height={80}
            className="support_trust_logo"
          />
          <div className="support_trust_person">
            <SarmentsText format="semi-title" className="support_trust_name">
              Laurent Lafforgue
            </SarmentsText>
            <SarmentsText format="text">Mathématicien</SarmentsText>
          </div>
        </div>
      </div>
    </section>
  );
}
