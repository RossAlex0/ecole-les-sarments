"use client";

import { useEffect } from "react";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: wire up a monitoring service if needed (Sentry…)
    console.error(error);
  }, [error]);

  return (
    <main className="error_page">
      <SarmentsText format="title">Une erreur est survenue</SarmentsText>
      <SarmentsText format="text">
        Désolé, une erreur inattendue s&apos;est produite. Vous pouvez réessayer.
      </SarmentsText>
      <SarmentsButton onClick={reset} hasBorder>
        Réessayer
      </SarmentsButton>
    </main>
  );
}
