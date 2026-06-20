# Ecole Les Sarments

Site **vitrine** pour l'école Les Sarments, école **hors contrat** maternelle/primaire à Toulouse.

## 🎯 Mission

Donner un **maximum de visibilité** à l'école. Objectif business : **être la 1ʳᵉ école à apparaître sur Google** pour les recherches d'écoles à Toulouse.
Les 3 priorités qui guident chaque décision technique :

1. **SEO** — chaque page doit être optimisée au maximum (voir section dédiée).
2. **Performance & UX** — zéro latence ressentie, pas de crash, chargement rapide.
3. **Robustesse** — toute erreur doit être gérée gracieusement (jamais d'écran blanc / crash visible).

## Stack

- **Next.js 16** App Router, **React 19** (react-compiler activé), TypeScript
- **Supabase** (`@supabase/supabase-js`) — base de données + stockage d'images
- **react-icons** — **toujours** utiliser cette lib pour les icônes (pas de SVG inline ad hoc)
- `swiper` (carrousels)
- Lint : ESLint (`npm run lint`) · Format : Prettier (`npm run format`)

## Architecture

Archi **Next API + App**. Flux de données :
`app/api/<resource>/route.ts` → `server/controller/*.controller.ts` → `server/service/<resource>/*.service.ts` → Supabase.

- `src/app/` — pages (App Router) et routes API
- `src/server/controller/` — controllers : try/catch obligatoire, renvoient `NextResponse.json(...)`
- `src/server/service/` — classes service : requêtes Supabase, renvoient le résultat brut
- `src/server/service/<resource>/*.cache.ts` — **lectures cachées** (`unstable_cache` + tags) consommées par les Server Components
- `src/server/cache/tags.ts` — tags de cache centralisés (`CacheTag`), partagés lecture/écriture
- `src/components/` — `ui/` (atomiques), `layout/` (sections), `block/` (blocs composés)
- `src/utils/` — `types/table.ts` (enum `SupabaseTable` + types `Row`), `hooks/useFetch.ts`, `navigation/`, `date/`
- `src/lib/supabase/` — clients (`client.ts`, `admin.ts`) + `database.types.ts` généré

## 🗃️ Stratégie de données & cache (décidée)

Le critère d'accès aux données = **où s'exécute le composant**, PAS « front vs back ». Un Server Component s'exécute uniquement sur le serveur (jamais envoyé au navigateur), donc y appeler le service en direct n'est pas « appeler un service depuis le front » : c'est de l'accès données côté serveur, et c'est le pattern Next recommandé (pas de hop HTTP inutile vers sa propre API).

**Règle :**
| Contexte | Pattern data |
|---|---|
| **Server Component** (pages publiques SEO) | appelle le **service** en direct (via `getCached*`) — rendu HTML serveur = indexable |
| **Client Component** (`"use client"` : admin, écrans interactifs) | **`useFetch` → route `/api` → controller → service**, avec loading/error |

Pourquoi pas `useFetch` partout : sur une page publique, `useFetch` (client) rend un HTML vide puis fetch après coup → contenu **non indexé par Google** (priorité SEO) + egress Supabase non maîtrisé.

- **Lecture publique (SEO)** : Server Component → `getCached*` (`*.cache.ts`) enveloppé dans `unstable_cache({ tags, revalidate: false })`. Supabase interrogé une fois puis servi depuis le cache. Pages concernées : `src/app/school/page.tsx`, `src/app/student-life/page.tsx`.
- **Lecture admin** : `useFetch(\`/api/<resource>?v=<version>\`)`dans le`ResourceManager`(route → controller → service), loading/error gérés, re-fetch en bumpant`version` après mutation.
- **Écriture admin** : routes API `POST`/`PATCH`/`DELETE` → controller → service (`supabaseAdmin`), puis `revalidateTag(CacheTag.X, "max")` pour régénérer le cache public. Côté client, une **requête = un hook** dans `utils/hooks/<resource>/` (fetch inline + `useCallback`).
- **PAS de lib de cache client** (ni SWR, ni React Query) : cache natif Next côté public, `useFetch` côté admin.

## Conventions

- **Composants réutilisables avant tout** : factoriser au maximum. Avant de créer un composant, vérifier s'il en existe déjà un dans `ui/` qui couvre le besoin (`SarmentsText`, `SarmentsButton`, `Quote`, `Counter`, `Timeline`, `Separator`, `Toggle`…).
- Composant = dossier kebab-case + `PascalCase.tsx` + `lowercase.css` co-localisé. Classes CSS en `snake_case` préfixées du nom du composant.
- Icônes : **react-icons** uniquement.
- Imports : alias `@/` partout (`@/components`, `@/utils`, `@/lib`, `@/server`) — sauf imports relatifs **au sein de** `server/`.
- **Hooks** : éviter `useEffect` sauf vrai effet de bord (écouteurs DOM, abonnements, synchro externe) — pas de re-renders en cascade. Mémoïser explicitement avec `useMemo`/`useCallback` (calculs coûteux, handlers stables), **même si react-compiler est activé** (choix projet de contrôle explicite).
- `npm run db:types` régénère les types Supabase après un changement de schéma.

## ⚡ Performance & contraintes Supabase (free tier)

Supabase est en **version gratuite** : ressources limitées, perfs moyennes. Conséquences à respecter :

- **Images** = ressource la plus coûteuse. Elles sont stockées sur Supabase Storage (quota limité).
  - **Limiter le nombre d'images** ; pas d'abondance décorative.
  - Servir en **WebP**, dimensionnées au besoin réel ; utiliser `next/image` (lazy-loading, `sizes`, `priority` seulement pour l'image LCP).
  - Mettre en cache / réutiliser les URLs ; éviter les re-fetch inutiles (cf. cache de `useFetch`).
- **Requêtes** : `select` uniquement les colonnes nécessaires, filtrer/limiter côté Supabase (`.eq`, `.gte`, `.limit`, `.single`), jamais côté client. Préférer le rendu serveur (Server Components / fetch côté serveur) pour le contenu indexable.
- Pas de latence ressentie : skeletons/états de chargement, pas de layout shift.

## 🛡️ Gestion d'erreurs (obligatoire)

- **Toute** opération réseau / Supabase est protégée (try/catch côté controller, vérif `error` côté service).
- Côté client : gérer `loading` ET `error` de `useFetch` ; afficher un fallback, jamais un crash.
- `error.tsx` (racine) et `not-found.tsx` (App Router) en place pour les erreurs de rendu. Jamais d'écran blanc.

## 🔎 SEO (priorité n°1)

> **État actuel : le SEO n'est PAS encore optimisé.** Les `metadata` sont centralisées dans le **layout racine** (`src/app/layout.tsx`) avec des valeurs placeholder, et plusieurs pages sont en `"use client"` (contenu rendu côté client). C'est le principal chantier d'amélioration. Objectif ci-dessous = cible à atteindre.

- **Cible : metadata par page.** Migrer du `metadata` global du layout vers un `metadata` (ou `generateMetadata`) propre à **chaque page** : `title` unique et descriptif, `description`, `openGraph`, mots-clés ciblés **« école Toulouse », « école hors contrat Toulouse », « école maternelle/primaire Toulouse »**. Le layout ne garde qu'un fallback (`title.template`).
- Contenu indexable rendu **côté serveur** (Server Components), pas uniquement via fetch client.
- HTML sémantique : un seul `<h1>` par page, hiérarchie `<h2>/<h3>` cohérente, balises `<section>`, `<nav>`, `<main>`.
- Toutes les images ont un `alt` descriptif et pertinent (compte pour le SEO image).
- Liens internes explicites (texte d'ancre parlant) ; `sitemap.ts` et `robots.ts` à jour.
- Données structurées JSON-LD (`EducationalOrganization` / `School`) sur la page d'accueil.
- Core Web Vitals soignés (LCP image prioritaire, pas de CLS).

## Skills disponibles

- `/new-page` — scaffold une page App Router avec `metadata` SEO complet
- `/new-api-resource` — scaffold service + controller + route + types d'une ressource Supabase
- `/new-component` — scaffold un composant React réutilisable conforme aux conventions
- `/optimize-next` — playbook perf/rendu Next 16 (Server Components, caching, images, streaming)
- `/optimize-supabase` — playbook perf/coût Supabase free tier (requêtes, egress, images, cache)
