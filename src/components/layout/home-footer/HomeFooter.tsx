import CardInfo from "@/components/block/card-info/CardInfo";

import "./homeFooter.css";

export default function HomeFooter() {
  // Await api to fetch events( events.length === 0 ? false : true)
  const hasEvent = false;
  return (
    <section className="home_footer">
      <div>{hasEvent ? <div></div> : undefined}</div>
      <div className="home_footer_card">
        <CardInfo
          title="Soutenir l'école"
          text="Participer à un projet ou parrainer un enfant"
          href="/support-us"
        />
      </div>
    </section>
  );
}
