import "@/styles/loading.css";

export default function Loading() {
  return (
    <main className="loading">
      <div className="loading_rings" aria-hidden="true">
        <span className="loading_ring loading_ring_1" />
        <span className="loading_ring loading_ring_2" />
        <span className="loading_ring loading_ring_3" />
      </div>

      <div className="loading_content">
        <div className="loading_spinner" aria-hidden="true" />
        <h1 className="loading_title">Chargement…</h1>
        <p className="loading_text">Un instant, la page se prépare.</p>
      </div>
    </main>
  );
}
