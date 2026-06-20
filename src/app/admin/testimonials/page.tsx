import TestimonialsManager from "@/components/block/testimonials-manager/TestimonialsManager";

export default function AdminTestimonialsPage() {
  return (
    <section className="admin_page">
      <header className="admin_page_head">
        <h1 className="admin_h1">Témoignages</h1>
        <p className="admin_lead">
          Les témoignages soumis depuis le site arrivent « en attente ». Validez ceux à publier (ils
          apparaîtront alors sur le site) ou supprimez-les.
        </p>
      </header>

      <TestimonialsManager />
    </section>
  );
}
