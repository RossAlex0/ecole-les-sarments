import Counter from "@/components/ui/counter/Counter";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import "./stat.css";

export default function Stat() {
  return (
    <section className="stat">
      <SarmentsText format="title" isDark>
        Quelques chiffres
      </SarmentsText>
      <div className="stat_item">
        <Counter end={15}>Ans d&apos;expérience</Counter>
        <Counter end={200} duration={3400}>
          Elèves accompagnés depuis l&apos;ouverture
        </Counter>
        <Counter end={81} duration={2700}>
          Elèves en 2026
        </Counter>
        <Counter end={4} duration={1700}>
          Classe double-niveau à effectifs réduits
        </Counter>
      </div>
    </section>
  );
}
