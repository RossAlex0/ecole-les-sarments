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
- `src/components/` — `ui/` (atomiques), `layout/` (sections), `block/` (blocs composés)
- `src/utils/` — `types/table.ts` (enum `SupabaseTable` + types `Row`), `hooks/useFetch.ts`, `navigation/`, `date/`
- `src/lib/supabase/` — clients (`client.ts`, `admin.ts`) + `database.types.ts` généré

## Conventions

- **Composants réutilisables avant tout** : factoriser au maximum. Avant de créer un composant, vérifier s'il en existe déjà un dans `ui/` qui couvre le besoin (`SarmentsText`, `SarmentsButton`, `Quote`, `Counter`, `Timeline`, `Separator`, `Toggle`…).
- Composant = dossier kebab-case + `PascalCase.tsx` + `lowercase.css` co-localisé. Classes CSS en `snake_case` préfixées du nom du composant.
- Icônes : **react-icons** uniquement.
- Imports : alias `@/` partout (sauf imports relatifs au sein de `server/`).
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
- Utiliser `error.tsx` / `not-found.tsx` (App Router) pour les erreurs de rendu. Jamais d'écran blanc.

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
