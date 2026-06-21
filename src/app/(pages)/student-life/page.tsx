import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import NextEvent from "@/components/layout/event/next-event/NextEvent";
import EventsList from "@/components/layout/event/event-list/EventList";
import { getCachedNextEvent, getCachedUpcomingNews } from "@/server/service/event/event.cache";
import "./studentLife.css";

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61587126793877",
    Icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ecole_les_sarments_toulouse/",
    Icon: FaInstagram,
  },
];

export default async function StudentLifePage() {
  const [nextEvent, news] = await Promise.all([getCachedNextEvent(), getCachedUpcomingNews()]);

  return (
    <section style={{ paddingTop: "10vh" }}>
      {nextEvent && <NextEvent event={nextEvent} />}
      {news.length > 0 && <EventsList events={news} />}
      <section className="follow_us">
        <div className="follow_us_card">
          <SarmentsText format="title">Suivez la vie des Sarments</SarmentsText>
          <SarmentsText format="text" className="follow_us_text">
            Derrière chaque projet, chaque sortie et chaque découverte se cachent de beaux
            souvenirs. Retrouvez les moments forts de l&apos;école et le quotidien de nos élèves sur
            nos réseaux sociaux.
          </SarmentsText>

          <ul className="follow_us_links">
            {socials.map(({ label, href, Icon }) => (
              <div key={label}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="follow_us_btn"
                  aria-label={`Suivre sur ${label}`}
                >
                  <span>Suivre sur</span>
                  <Icon />
                </Link>
              </div>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}
