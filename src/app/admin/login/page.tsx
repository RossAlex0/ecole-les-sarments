"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setBusy(true);
      setError(null);

      const { error: authError } = await createBrowserSupabase().auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("Identifiant ou mot de passe invalide.");
        setBusy(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    },
    [email, password, router],
  );

  return (
    <div className="admin_login">
      <form className="admin_login_card" onSubmit={onSubmit}>
        <h1 className="admin_login_title">Connexion</h1>
        <p className="admin_login_sub">Espace de gestion — École Les Sarments</p>

        <label className="admin_field_label_wrap">
          <span className="admin_field_label">Identifiant (email)</span>
          <input
            className="admin_input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={busy}
            autoComplete="username"
          />
        </label>

        <label className="admin_field_label_wrap">
          <span className="admin_field_label">Mot de passe</span>
          <input
            className="admin_input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={busy}
            autoComplete="current-password"
          />
        </label>

        {error && <p className="admin_error">{error}</p>}

        <SarmentsButton theme="primary" type="submit" disabled={busy}>
          {busy ? "Connexion…" : "Se connecter"}
        </SarmentsButton>
      </form>
    </div>
  );
}
