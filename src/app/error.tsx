"use client";

import { useEffect } from "react";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO : brancher un service de monitoring si besoin (Sentry…)
    console.error(error);
  }, [error]);

  return (
    <main className="error_page">
      <SarmentsText format="title">Une erreur est survenue</SarmentsText>
      <SarmentsText format="text">
        Désolé, une erreur inattendue s&apos;est produite. Vous pouvez réessayer.
      </SarmentsText>
      <button type="button" onClick={reset} className="error_page_retry">
        <SarmentsText format="view">Réessayer</SarmentsText>
      </button>
    </main>
  );
}
