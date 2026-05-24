import CardSupportUs from "@/components/block/card-support-us/CardSupportUs";

import "./homeFooter.css";

export default function HomeFooter() {
  // Await api to fetch events( events.length === 0 ? false : true)
  const hasEvent = false;
  return (
    <section className="home_footer">
      <div>{hasEvent ? <div></div> : undefined}</div>
      <div className="home_footer_card">
        <CardSupportUs
          title="Soutenir l'école"
          text="Participer à un projet ou parrainer un enfant"
        />
      </div>
    </section>
  );
}
