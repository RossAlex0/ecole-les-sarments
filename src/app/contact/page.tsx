// src/app/contact/page.tsx
import { FaBus, FaTrain, FaCar, FaSquareParking } from "react-icons/fa6";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import Separator from "@/components/ui/separator/Separator";
import "./contact.css";
import CardInfo from "@/components/block/card-info/CardInfo";

export default function ContactPage() {
  return (
    <section className="contact">
      <div className="contact_location">
        <SarmentsText format="title" className="contact_title">
          Où nous trouver
        </SarmentsText>
        <SarmentsText format="text" className="contact_intro">
          Située au 20 avenue Didier Daurat dans le quartier de Montaudran à Toulouse, l&apos;école
          Les Sarments est facilement accessible en transports et en voiture.
        </SarmentsText>

        <div className="contact_location_content">
          <ul className="contact_access">
            <li className="contact_access_item">
              <span>Bus L7, L8, L9, L12 et 37 à proximité</span>
              <FaBus className="contact_access_icon" />
            </li>
            <li className="contact_access_item">
              <span>Métro ligne B</span>
              <FaTrain className="contact_access_icon" />
            </li>
            <li className="contact_access_item">
              <span>Accès rapide depuis la rocade — sortie 18 Montaudran</span>
              <FaCar className="contact_access_icon" />
            </li>
            <li className="contact_access_item">
              <span>Parking gratuit devant l&apos;école</span>
              <FaSquareParking className="contact_access_icon" />
            </li>
          </ul>

          <div className="contact_map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.83858332837!2d1.4900748761100928!3d43.56824647110625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebdc7cf21c39f%3A0x1ecdff6fff8710fb!2s20%20Av.%20Didier%20Daurat%2C%2031400%20Toulouse!5e0!3m2!1sfr!2sfr!4v1781375416674!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte de l'école Les Sarments — 20 avenue Didier Daurat, 31400 Toulouse"
            />
          </div>
        </div>
      </div>

      <div className="contact_discover">
        <div className="contact_hours">
          <Separator color="white" />
          <SarmentsText format="text" className="contact_hours_text">
            Accueil du lundi au vendredi de 8h30 à 17h
          </SarmentsText>
        </div>

        <div className="contact_discover_hero">
          <CardInfo
            title="Découvrir l'école"
            text="Nos portes ouvertes sont l'occasion de découvrir notre projet pédagogique, rencontrer l'équipe et visiter un cadre d'apprentissage chaleureux où chaque enfant grandit à son rythme."
            label="Contactez-nous"
            className="contact_discover_card"
          />
        </div>
      </div>
    </section>
  );
}
