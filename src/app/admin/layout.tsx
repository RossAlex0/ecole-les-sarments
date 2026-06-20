import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import AdminLogout from "@/components/block/admin-manager/admin-logout/AdminLogout";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import { MdOutlineEventNote, MdOutlineViewArray } from "react-icons/md";
import { RiDiscussFill, RiFileSettingsLine, RiTeamFill } from "react-icons/ri";
import "@/styles/admin.css";

const NAV = [
  { href: "/admin", label: "Tableau de bord", icon: MdOutlineViewArray },
  { href: "/admin/team-members", label: "Équipe", icon: RiTeamFill },
  { href: "/admin/events", label: "Événements", icon: MdOutlineEventNote },
  { href: "/admin/testimonials", label: "Témoignages", icon: RiDiscussFill },
  { href: "/admin/files", label: "Fichiers", icon: RiFileSettingsLine },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Unauthenticated: only the login page reaches here (middleware guards the rest).
  if (!user) {
    return <div className="admin admin_bare">{children}</div>;
  }

  return (
    <div className="admin">
      <aside className="admin_sidebar">
        <span className="admin_brand">Les Sarments · Admin</span>
        <nav className="admin_nav">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="admin_nav_link">
                <Icon className="admin_nav_icon" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="admin_sidebar_foot">
          <AdminLogout />
          <SarmentsButton href="/" theme="transparent">
            ← Retour au site
          </SarmentsButton>
        </div>
      </aside>
      <main className="admin_main">{children}</main>
    </div>
  );
}
