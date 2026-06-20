import Header from "@/components/block/header/Header";
import Footer from "@/components/block/footer/Footer";
import "@/styles/admin.css";

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
