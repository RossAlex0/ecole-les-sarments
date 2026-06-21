"use client";

import { useCallback, useState } from "react";
import Separator from "@/components/ui/separator/Separator";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import "./footer.css";
import { RiFacebookFill, RiInstagramLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import AdmissionModal from "@/components/block/admission-modal/AdmissionModal";

export default function Footer() {
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const openAdmission = useCallback(() => setAdmissionOpen(true), []);
  const closeAdmission = useCallback(() => setAdmissionOpen(false), []);

  return (
    <section className="footer">
      <div className="footer_main">
        <div className="parent col">
          <SarmentsText format="text">
            Adresse:
            <a
              href="https://www.google.com/maps/search/?api=1&query=20+avenue+Didier+Daurat+Toulouse"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              20 avenue Didier Daurat - 31400 Toulouse
            </a>
          </SarmentsText>
          <div className="footer_tel_hor">
            <SarmentsText format="text">
              Téléphone: <a href="tel:+33769413544">07 69 41 35 44</a>
            </SarmentsText>
            <Separator />
            <SarmentsText format="text"> Horaires: 8h30-17h</SarmentsText>
          </div>
        </div>
        <Separator />
        <div className="parent">
          <SarmentsText format="text">Suivez nous sur: </SarmentsText>
          <a
            href="https://www.facebook.com/profile.php?id=61587126793877"
            className="social-link"
            aria-label="Facebook"
            target="_blank"
          >
            <RiFacebookFill size={32} color="var(--white-color)" />
          </a>
          <a
            href="https://www.instagram.com/ecole_les_sarments_toulouse/"
            className="social-link"
            aria-label="Instagram"
            target="_blank"
          >
            <RiInstagramLine size={32} color="var(--white-color)" />
          </a>
        </div>
        <Separator />
        <div className="row gap1 parent">
          <div>
            <SarmentsText format="text">En partenariat</SarmentsText>
            <SarmentsText format="text">avec</SarmentsText>
          </div>
          <Image
            src={"/logo/logo-fondation-pour-ecole.svg"}
            height={40}
            width={100}
            alt="fondation pour l'école"
            className="margin6"
          />
          <div className="margin6">
            <SarmentsText format="text" className="footer_bold">
              Laurent Lafforgue
            </SarmentsText>
            <SarmentsText format="text">Mathématicien</SarmentsText>
          </div>
        </div>
        <div className="parent">
          <SarmentsButton theme="dark" hasBorder onClick={openAdmission}>
            Faire une demande d&apos;admission
          </SarmentsButton>
        </div>
      </div>

      <nav className="footer_legal" aria-label="Liens légaux">
        <Link href="/legal-notice">
          <SarmentsText format="small">Mentions légales</SarmentsText>
        </Link>
        <span className="footer_legal_sep" aria-hidden="true">
          ·
        </span>
        <Link href="/privacy-policy">
          <SarmentsText format="small">Politique de confidentialité</SarmentsText>
        </Link>
      </nav>

      <AdmissionModal open={admissionOpen} onClose={closeAdmission} />
    </section>
  );
}
