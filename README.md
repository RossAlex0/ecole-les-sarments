# École Les Sarments — site vitrine

Site vitrine (Next.js + Supabase) de l'**école Les Sarments**, école hors contrat maternelle & primaire à Toulouse. Site public optimisé SEO + un back-office `/admin` pour gérer le contenu (équipe, événements, témoignages, fichiers).

> 📐 **Les règles & conventions du projet sont dans [`CLAUDE.md`](./CLAUDE.md).** À lire avant de coder. Ce README couvre l'installation et l'exploitation.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Supabase** — base de données (PostgreSQL), authentification, stockage de fichiers
- **react-icons**, **swiper** · CSS pur co-localisé
- Hébergement **Vercel** (offre gratuite) · CI/CD GitHub

## Prérequis

- **Node.js ≥ 20** et **npm**
- Un **projet Supabase** (offre gratuite) avec accès au dashboard

## Installation

```bash
git clone <repo>
cd ecole-les-sarments
npm install
cp .env.example .env        # puis renseigner les variables (voir ci-dessous)
npm run dev                 # http://localhost:3000
```

## Variables d'environnement

À mettre dans `.env` (jamais commité). Les valeurs viennent de **Supabase → Project Settings → API**.

| Variable                        | Rôle                                             | Exposition                               |
| ------------------------------- | ------------------------------------------------ | ---------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL du projet Supabase                           | Publique (build + runtime)               |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé `anon` (lectures publiques, auth)            | Publique (build + runtime)               |
| `SUPABASE_SERVICE_ROLE_KEY`     | Clé `service_role` (écritures admin, bypass RLS) | **Secrète — runtime serveur uniquement** |

⚠️ `SUPABASE_SERVICE_ROLE_KEY` ne doit **jamais** être exposée côté client ni commitée. Elle n'est **pas** requise au build (un fallback non-vide évite l'erreur `supabaseKey is required` quand elle est absente, ex. en CI). Elle est nécessaire **au runtime** (env de déploiement).

## Scripts

```bash
npm run dev        # serveur de dev (Turbopack)
npm run build      # build de production
npm run start      # serveur de production (après build)
npm run lint       # ESLint
npm run format     # Prettier (écrit)
npm run db:types   # régénère src/lib/supabase/database.types.ts depuis Supabase
```

> Avant tout commit : `npm run lint` **et** `npx tsc --noEmit` doivent être au vert.

## Configuration Supabase (à faire une fois)

1. **Schéma, RLS & privilèges** : exécuter le script de la section [Reproduire la base de données (SQL)](#reproduire-la-base-de-données-sql). Il crée les tables (`team_members`, `events`, `testimonials`, chacune avec `is_published`), active la RLS (lecture publique des lignes `is_published = true`) et accorde au `service_role` les droits d'écriture (sinon `permission denied`). Puis régénérer les types : `npm run db:types`.
2. **Storage** : bucket **public** `ecole-les-sarments`, dossiers `team/`, `event/`, `doc/` (PDF). Les uploads passent par le `service_role`.
3. **Auth (utilisateur unique)** :
   - **Authentication → Users → Add user** : créer le compte admin (email + mot de passe, cocher **Auto Confirm User** — l'email peut être fictif).
   - **Authentication → Sign In / Providers** : **désactiver « Allow new users to sign up »** (un seul utilisateur autorisé).

## Reproduire la base de données (SQL)

À exécuter une fois dans **Supabase → SQL Editor** pour recréer le schéma (tables, index, RLS, privilèges). Ensuite : `npm run db:types`, créer le bucket Storage et l'utilisateur admin (voir [Configuration Supabase](#configuration-supabase-à-faire-une-fois)).
**_Aucune donnée sensible n'est prévue et ne doit transiter dans cette BDD._**

```sql
-- ===== events =====
create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  short_description text not null,
  description text not null,
  image_url text,
  start_at timestamptz not null,
  end_at timestamptz,
  location text,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index events_start_at_idx on events (start_at desc);
create index events_slug_idx on events (slug);

alter table events enable row level security;
create policy "Public can read published events"
  on events for select
  to anon, authenticated
  using (is_published = true);

-- ===== team_members =====
create table team_members (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  role text not null,
  short_bio text,
  image_url text,
  image_path text,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table team_members enable row level security;
create policy "Public can read published team members"
  on team_members for select
  to anon, authenticated
  using (is_published = true);

-- ===== testimonials =====
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  content text not null,
  school_level text,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table testimonials enable row level security;
create policy "Public can read published testimonials"
  on testimonials for select
  to anon, authenticated
  using (is_published = true);

-- ===== Privilèges service_role (écritures admin, bypass RLS) =====
grant select, insert, update, delete on public.events       to service_role;
grant select, insert, update, delete on public.team_members to service_role;
grant select, insert, update, delete on public.testimonials to service_role;
```

> Les lectures publiques (rôle `anon`) sont restreintes par RLS aux lignes `is_published = true` ; les écritures passent par le `service_role` (bypass RLS).

## Structure du projet

```
src/
  app/
    (pages)/          # pages publiques (route group)
    admin/            # back-office (protégé)
    api/<resource>/   # routes publiques + /admin (CRUD)
  server/
    http/             # wrappers de route (publicRoute/adminRoute) + HttpError
    auth/             # requireAdmin
    controller/       # logique pure (parse → service → data)
    service/          # accès Supabase (+ *.cache.ts)
    cache/            # tags de cache
  components/         # ui / layout / block
  utils/              # form, hooks, http, types, date, navigation…
  lib/supabase/       # clients (client/admin/server/browser), storage, types
  styles/             # CSS globaux + admin.css
  proxy.ts            # middleware Next 16 (protège /admin)
```

Détail de l'architecture (MVC, cache, conventions de routes, règles de code) : **[`CLAUDE.md`](./CLAUDE.md)**.

## Back-office `/admin`

- Accès : `/admin` → redirige vers `/admin/login` si non connecté.
- **Un seul utilisateur** (créé dans Supabase, voir ci-dessus). La session Supabase suffit à autoriser l'admin.
- Permet de gérer : **équipe**, **événements**, **témoignages** (modération + création), et les **fichiers** (photo directrice, PDF frais de scolarité & uniformes).
- Les lectures publiques sont mises en cache (Next) et rafraîchies automatiquement après chaque modification admin.

## Déploiement (Vercel)

1. Connecter le repo à Vercel (framework Next.js détecté).
2. Renseigner les **3 variables d'environnement** ci-dessus dans Vercel :
   - `NEXT_PUBLIC_*` → disponibles au build (inlinées).
   - `SUPABASE_SERVICE_ROLE_KEY` → env **runtime** (Production/Preview).
3. Le `build` ne nécessite **pas** la clé service role ; le runtime, **oui**.
4. Branches : développer sur des branches dédiées, jamais directement sur `main`.
