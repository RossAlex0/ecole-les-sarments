import TestimonialsManager from "@/components/block/admin-manager/testimonials-manager/TestimonialsManager";
import AdminInfo from "@/components/block/admin-manager/admin-info/AdminInfo";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";

export default function AdminTestimonialsPage() {
  return (
    <section className="admin_page">
      <header className="admin_page_head">
        <h1 className="admin_h1">Témoignages</h1>
        <AdminInfo>
          <SarmentsText format="text" color="blue">
            Les témoignages soumis depuis le site arrivent « en attente ». Validez ceux à publier
            (ils apparaîtront alors sur le site) ou supprimez-les.
          </SarmentsText>
        </AdminInfo>
      </header>

      <TestimonialsManager />
    </section>
  );
}
