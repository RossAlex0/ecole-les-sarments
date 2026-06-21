# École Les Sarments

Site **vitrine** pour l'école Les Sarments — école **hors contrat** maternelle & primaire à Toulouse.
Public **francophone** (familles toulousaines). Site **mono-langue (français)**, pas d'i18n.

> **Le code est en anglais** (commentaires, noms de variables/fonctions, constantes). Seul le **contenu destiné aux visiteurs** (copy) est en français.

## 🎯 Mission & priorités

Objectif business : **maximiser la visibilité** de l'école — être **la 1ʳᵉ école à apparaître sur Google** pour les recherches d'écoles à Toulouse.

Priorités qui arbitrent **chaque** décision technique, dans cet ordre :

1. **Free / zéro maintenance** _(strict)_ — uniquement des outils open-source & gratuits ; aucune dépendance ni service payant ; rien qui demande de la maintenance dev régulière.
2. **SEO** — chaque page optimisée au maximum.
3. **Performance** — chargement rapide, zéro latence ressentie.
4. **UX** — parcours fluide, états de chargement clairs, pas de layout shift.
5. **Robustesse** — toute erreur gérée gracieusement, jamais d'écran blanc.

## 🧰 Stack & règles de dépendances

**Stack figée :**

- **Next.js 16** (App Router, Turbopack) · **React 19** (react-compiler activé) · **TypeScript**
- **Supabase** (`@supabase/supabase-js` + `@supabase/ssr`) — base de données, auth, stockage
- **react-icons** — seule source d'icônes
- **swiper** — carrousels
- **CSS pur co-localisé** (pas de Tailwind, pas de CSS-in-JS)
- **npm** · ESLint (`npm run lint`) · Prettier (`npm run format`)
- Hébergement **Vercel (offre gratuite)** + CI/CD GitHub

**Règles de dépendances (strict) :**

- **Gratuit & open-source uniquement** — aucune lib ni SaaS payant.
- **Privilégier le natif Next/React** avant d'ajouter une lib externe.
- **Pas de lib lourde/gourmande** sauf nécessité réelle justifiée.
- **Pas de lib obsolète / non maintenue** — vérifier l'activité du repo avant d'ajouter.

## 🏛️ Architecture — MVC

Flux : `app/api/<resource>/route.ts` (wrapper) → `server/controller/*.controller.ts` (pur) → `server/service/<resource>/*.service.ts` (Supabase).

- **Route** (`route.ts`) — composée via `publicRoute(handler)` / `adminRoute(handler)` / `cronRoute(handler)` (`server/http/route.ts`) : applique le rate limit + l'auth (admin / cron) + la sérialisation JSON & erreurs. **Aucune logique métier.**
- **Controller** — **pur** : parse la requête, appelle le service, renvoie la data (`throw` sur erreur, capté par le wrapper). Pas d'auth, pas de try/catch HTTP.
- **Service** — accès Supabase uniquement.

**Convention de routes (toute ressource) :**

- **Public** (sans auth) : `/api/<resource>` — GET des publiés (+ POST public si applicable).
- **Admin** (`requireAdmin`) : `/api/<resource>/admin` (GET tous + POST), `/api/<resource>/admin/[id]` (PATCH/DELETE).
- **Cron** (`requireCron`) : `/api/cron/<job>` — déclenché par **Vercel Cron**, protégé par `CRON_SECRET` (`Authorization: Bearer`), **fail-closed**.
- **Jamais** de `requireAdmin` « en place » sur une route potentiellement publique.

**Sécurité transverse (toutes routes API) :**

- **Rate limit** : limiter in-memory par IP (`server/http/rateLimit.ts`), appliqué dans `execute()` → couvre `publicRoute`/`adminRoute`/`cronRoute`. In-memory choisi pour le free tier (pas de SaaS) ; à migrer vers un store partagé (Upstash) + le middleware si un comptage global exact devient nécessaire.
- **Validation des bodies** : **Zod** via `parseBody(request, schema)` (`server/http/validate.ts`) ; schémas par ressource dans `server/validation/`. Zod strippe les clés inconnues → anti mass-assignment. Trim + bornes de longueur obligatoires.

**Cron (Vercel) :**

- Planifié dans `vercel.json` (clé `crons`). Plan **Hobby/gratuit** : ≤ 1×/jour, 2 crons max.
- Job actuel : `/api/cron/cleanup-events` (`0 3 */6 * *`) → supprime les events dont `start_at` > 10 mois + leurs images storage, puis `revalidateTag(EVENTS)`.
- `CRON_SECRET` doit être défini sur Vercel (Production) ; sans lui l'endpoint renvoie 401.

**Structure des dossiers :**

- `src/app/` — pages (route group `(pages)` pour le public) + routes API
- `src/server/` — `http/` (wrappers route + `HttpError` + `rateLimit` + `validate`), `auth/` (`requireAdmin`, `requireCron`), `controller/`, `service/<resource>/` (+ `.cache.ts`), `validation/<resource>.schema.ts` (Zod), `cache/tags.ts`
- `src/components/` — `ui/` (atomiques) · `layout/` (sections) · `block/` (blocs composés). Dossier **kebab-case** + `PascalCase.tsx` + `lowercase.css` co-localisé ; classes CSS **snake_case** préfixées du composant.
- `src/utils/` — `form/`, `hooks/<resource>/`, `http/`, `types/`, `date/`, `navigation/`…
- `src/lib/supabase/` — `client.ts` (anon), `admin.ts` (service role), `server.ts` / `browser.ts` (SSR auth), `storage.ts`, `database.types.ts`
- `src/styles/` — CSS globaux + `admin.css`
- `src/proxy.ts` — middleware Next 16 (protège `/admin`)
- `vercel.json` — jobs **Vercel Cron** (clé `crons`)

## 🗃️ Données, cache & auth

**Lecture** (critère = _où s'exécute le composant_) :

- **Server Component** (pages publiques SEO) → service en direct via `getCached*` → HTML serveur **indexable**.
- **Client Component** (admin, interactif) → `useFetch` → route → controller → service (loading/error gérés). Choisi pour un **meilleur contrôle du cache** lors des manips admin ; la data publique change rarement, donc un cache qui persiste une session est acceptable.

**Cache** : natif Next (`unstable_cache` + tags), invalidation par `revalidateTag(tag, "max")` après mutation admin. **PAS de lib de cache client** (SWR / React Query).

**Accès Supabase :**

- **Admin** (lectures complètes + écritures) → `supabaseAdmin` (service role, bypass RLS).
- **Public** → client **anon** (RLS + filtre `is_published`).
- La **clé service role** n'est **JAMAIS** exposée côté client ; requise seulement **au runtime** (jamais au build → fallback non-vide dans `admin.ts`).

**Auth :** **utilisateur unique** Supabase (email/mot de passe). **Sign-ups désactivés** (dashboard). `requireAdmin` = une session Supabase valide suffit (= l'admin). `/admin` protégé par le middleware (`proxy.ts`).

## ✍️ Conventions de code

- **Langue** : code en **anglais** ; copy visiteur en **français**.
- **Re-renders maîtrisés** : contrôler les rendus au maximum. `useEffect` **uniquement** pour de vrais effets de bord (listeners DOM, abonnements, synchro externe) — **jamais** pour dériver/synchroniser un state interne. Mémoïser explicitement (`useMemo` / `useCallback`) calculs coûteux & handlers, **même avec react-compiler**.
- **Imports** : alias `@/` partout (`@/components`, `@/utils`, `@/lib`, `@/server`) — relatif uniquement **au sein de** `server/`. Créer l'alias dans `tsconfig.json` si un nouveau dossier le nécessite.
- **Composants réutilisables d'abord** : vérifier `src/components/` avant d'en créer un ; factoriser.
- **Icônes** : `react-icons` uniquement, rendues en JSX (`<Icon />`), jamais appelées comme fonction.
- **Hooks data admin** : **un hook par mutation** (Create/Update/Delete) dans `utils/hooks/<resource>/` (fetch inline + `useCallback`, erreurs via `parseError`) — chaque mutation a ses particularités (à robustifier). Les **lectures** passent par `useFetch` directement (pas de hook de read dédié).
- `npm run db:types` après tout changement de schéma Supabase.

## ⚡ Performance & free tier (Supabase)

- **Images** _(poste le plus coûteux)_ : **peu** d'images (pas de déco superflue), **WebP** dimensionnées au besoin, **`next/image`** obligatoire (lazy + `sizes`), `priority` **seulement** sur l'image LCP, `alt` descriptif.
- **Requêtes** : toujours filtrer/limiter **côté Supabase** (`.eq` / `.gte` / `.limit` / `.single`), jamais côté client. `select` ciblé recommandé ; `select("*")` toléré sur les petites tables. Privilégier le **cache serveur** pour limiter l'egress.
- **Rendu** : **zéro CLS** (réserver l'espace des images/blocs), états loading/skeleton, Core Web Vitals soignés (LCP prioritaire).

## 🛡️ Gestion d'erreurs (obligatoire)

- **Toute** opération réseau/Supabase est protégée : le wrapper de route renvoie `{ error: { message } }` + status ; le service renvoie le résultat brut (`{ data, error }`), le controller `throw` sur `error`.
- **Client** : gérer `loading` **et** `error`, afficher un fallback — jamais de crash.
- `error.tsx` (racine) + `not-found.tsx` en place. **Jamais d'écran blanc.**

## 🔎 SEO (priorité haute)

- **Metadata** : la metadata principale du site (titre, description, `openGraph`) vit dans le **layout racine** via l'API `metadata` de Next ; une page peut ajouter/spécialiser sa metadata si pertinent.
- **HTML sémantique optimisé** : un seul `<h1>` par page, hiérarchie `<h2>/<h3>` cohérente, balises `<main>` / `<section>` / `<nav>`.
- **Contenu indexable rendu côté serveur** (Server Components), pas via fetch client.
- `alt` descriptifs sur les images ; **liens internes** au texte d'ancre parlant.
- `sitemap.ts` + `robots.ts` à jour ; **JSON-LD** `EducationalOrganization` sur l'accueil.
- **Mots-clés cibles** : école Toulouse · maternelle · primaire · privé · hors contrat · éducation · savoir · bienveillance.
- Core Web Vitals soignés (LCP image prioritaire, pas de CLS).

## 🔧 Process de dev

- **Avant tout commit** : `npm run lint` (0 erreur) **et** `npx tsc --noEmit` (0 erreur hors `.next` généré).
- **Git** : Claude **ne lance jamais** de commande git — il **propose** un message de commit **one-line** (Conventional Commits : `feat/fix/refactor/chore(scope): …`). L'utilisateur gère `add` / `commit` / `push`.
- **Branches** : travailler sur des **branches dédiées** (feature), **jamais directement sur `main`**.
