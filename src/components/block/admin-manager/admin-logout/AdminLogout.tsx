"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";

export default function AdminLogout() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const logout = useCallback(async () => {
    setBusy(true);
    await createBrowserSupabase().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }, [router]);

  return (
    <SarmentsButton theme="light" onClick={logout} disabled={busy}>
      {busy ? "…" : "Déconnexion"}
    </SarmentsButton>
  );
}
