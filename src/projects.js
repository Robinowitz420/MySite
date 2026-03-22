/**
 * `summary` = short blurb on the landing cards.
 * `detailImages` = extra screenshots on the detail page only (hero uses `image`).
 * Full copy: paragraphs / highlights / stack. Optional `liveUrl` for “Visit live”.
 * Files live in public/images/ → paths like /images/…
 */
export const projects = [
  {
    id: 'paws-and-plates',
    title: 'Paws & Plates',
    tagline: 'Pet meal planning with nutrition guardrails',
    summary:
      'Species-aware pet profiles, generated meals and plans, and compatibility scoring against nutrition rules—plus Clerk auth, Firebase Admin, and a profile UI refactored until mobile felt as solid as desktop.',
    subtitle: null,
    liveUrl: 'https://www.pawsandplates.vercel.app',
    paragraphs: [
      'Paws & Plates is a full-stack web app for creating pet profiles (species-specific), generating and managing meals and meal plans, and comparing recipes against nutrition guardrails—with flows that work on desktop and mobile. It is not a single-entity CRUD demo: pets, recipes, portions, costs, compatibility scoring, personalization, and external commerce-style ingredient links all have to stay consistent.',
      'The stack is Next.js App Router with API routes for server-only work (generation, scoring, fetches), Clerk for auth, and Firebase Admin for secure server-side data. Environment separation (including NEXT_PUBLIC_* vs server secrets) is part of the product—misconfiguration shows up as confusing auth or storage errors, and the app is structured so those paths are debuggable.',
      'The /profile experience alone layers active pet selection, tab state (Bio / Saved / Plan), and different defaults on small vs large screens. Responsive work went beyond extra Tailwind classes: viewport configuration, horizontal overflow from transforms, reflow so key blocks sit in the right order on phones, and action controls moved into a stacked layout so nothing overlaps or misses tap targets. Compatibility scoring uses caching so repeated checks stay fast when inputs change.',
    ],
    highlights: [
      'Multi-entity modeling: pets, recipes/meals, ingredients, computed cost, compatibility scoring, saved meals and meal plans—clear split of what runs on the client vs server and what gets cached.',
      'Production-shaped setup: Clerk provider + protected routes, Firebase Admin, disciplined env handling across local/dev/prod.',
      'Complex profile UI: conditional layouts, mobile-first fixes for overflow and duplicate controls, adaptive tabs and actions rather than one rigid form.',
      'Performance: compatibility result caching for snappy UI while still recalculating when inputs change.',
    ],
    stack:
      'Next.js App Router, TypeScript, Clerk, Firebase Admin, Tailwind, API routes, compatibility scoring with caching—deployed on Vercel (pawsandplates.vercel.app).',
    type: 'website',
    image: '/images/PawsAndPlates.jpg',
    detailImages: [
      '/images/PawsAndPlates2.jpg',
      '/images/PawsAndPlates3.jpg',
      '/images/PawsAndPlates4.jpg',
      '/images/PawsAndPlates5.jpg',
    ],
    links: [
      { label: 'Live site', href: 'https://www.pawsandplates.vercel.app' },
      { label: 'Source', href: '#' },
    ],
    tags: [
      'Next.js',
      'TypeScript',
      'Clerk',
      'Firebase',
      'Tailwind',
      'Vercel',
    ],
  },
  {
    id: 'cyoctw',
    title: 'Change Your Outfit Change The World',
    tagline: 'Membership clothing club, shipped as a full product',
    summary:
      'Rental-closet member experience: onboarding, taste-led discovery, referrals, and admin—Next.js, Prisma, Clerk, and Stripe-ready billing behind a strong brand.',
    subtitle: null,
    liveUrl: null,
    paragraphs: [
      'A Next.js app for a rental closet: sign-in, onboarding, profile and taste preferences, search and discovery, referrals, and admin—wrapped in a playful sparkle-forward brand and copy that explains how the club actually works.',
      'It turns a nuanced offer into software members can use: tiers, swap-outs, trust, and fees are spelled out in FAQs and flows so the site sells and educates at the same time. The foundation is serious—auth, typed API routes, Prisma, Stripe-ready billing—so it can grow with the business.',
    ],
    highlights: [
      'Onboarding and taste-driven discovery—vibe, color, era, garment type—so search feels closer to styling than filtering a spreadsheet.',
      'Plain-language coverage of swap-outs, extras, and the trust-based model, so expectations are clear before someone joins.',
      'Referrals, calendar-related flows, and admin for memberships and staff—signals operational thinking, not only visual design.',
    ],
    stack:
      'Next.js (App Router), TypeScript, Prisma, Clerk, Stripe-ready billing, component-driven UI (e.g. Radix)—responsive, multi-route app structure.',
    type: 'website',
    image: '/images/ChangeYourOutfitChangeTheWorld.jpg',
    detailImages: [
      '/images/ChangeYourOutfitChangeTheWorld2.jpg',
      '/images/ChangeYourOutfitChangeTheWorld3.jpg',
      '/images/ChangeYourOutfitChangeTheWorld4.jpg',
    ],
    links: [
      { label: 'Live site', href: '#' },
      { label: 'Case study', href: '#' },
    ],
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Clerk', 'Radix', 'Stripe-ready'],
  },
  {
    id: 'wardrobe-manager',
    title: 'Wardrobe Manager',
    tagline: 'Backoffice + API for the same rental boutique ecosystem',
    summary:
      'Staff dashboard for inventory, photos, scheduling, and referrals; public JSON under /api/public/* so a separate marketing site can consume the same Firestore data.',
    subtitle:
      'Staff curate inventory here; a separate customer-facing site can stay on any stack—it consumes the public garment APIs.',
    liveUrl: null,
    paragraphs: [
      'An operational app for a clothing rental boutique: inventory and photos, scheduling, staff roles, referrals, and admin—not a thin CRUD sample, but workflows that match how rentals actually run.',
      'Clerk protects the dashboard and most API routes; middleware leaves /api/public/* open so JSON handlers can serve catalog, availability, reservations, and alternatives without the same auth as staff. Firestore holds garments, staff, referrals, and schedule-related data; Firebase Storage handles uploads with URL handling you’d expect in production.',
    ],
    highlights: [
      'Split surface: staff-only routes (/dashboard/*, schedule, roles, admin) vs a deliberate public API layer for storefronts or static sites that need live inventory.',
      'Referral attribution: links with ?ref= post to /api/referrals so visits from the sister site or campaigns map to staff codes in Firestore.',
      'Single source of truth—curated availability and public fields in Firestore are what both the tools and the public APIs read, so you are not maintaining two unrelated inventories.',
    ],
    stack:
      'Next.js App Router (many routes, API-heavy), Clerk middleware, Firestore modeling, Firebase Storage uploads—multi-role auth, protected APIs, and a public read/write surface by design.',
    type: 'tool',
    image: '/images/WarDrobeManager.jpg',
    detailImages: ['/images/WarDrobeManager2.jpg', '/images/WarDrobeManager3.jpg'],
    links: [
      { label: 'Live app', href: '#' },
      { label: 'API docs', href: '#' },
    ],
    tags: [
      'Next.js',
      'TypeScript',
      'Clerk',
      'Firestore',
      'Firebase Storage',
      'App Router',
    ],
  },
  {
    id: 'steam-ai',
    title: 'Steam.AI',
    tagline:
      'Turns your Steam library into a behavioral profile, a “play tonight” plan, and an honest buying filter',
    summary:
      'Imports your real Steam library through Edge proxies, then uses Claude for profiles, tonight picks, wishlist verdicts, and library-aware chat—shipped as one HTML file plus localStorage.',
    subtitle:
      'Real owned games + playtime—no fake data—through Claude and a tiny Edge proxy.',
    liveUrl: null,
    paragraphs: [
      'Steam.AI tackles decision fatigue and “library guilt”: huge backlogs, repeat purchases you never launch, and wishlists that don’t match how you actually play. It imports your real library, then surfaces a behavioral profile, pattern call-outs, mood- and time-based picks for tonight, wishlist verdicts, and “find something new” recommendations that track behavior—not stated taste.',
      'The UI is intentionally a single HTML/CSS/JS file for speed and sharing. Steam’s web APIs are hit through minimal Vercel Edge routes (/api/steam, /api/wishlist) so the browser avoids CORS dead ends. Claude (Anthropic Messages API) drives structured prompts and JSON-shaped output; setup, last profile, and chat history persist in localStorage so you are not re-entering keys every visit.',
    ],
    highlights: [
      'Mood + available time → “play this tonight”; “stop buying these” style diagnosis; wishlist analyzer with blunt YES / MAYBE / KIDDING YOURSELF verdicts.',
      'Library-aware in-app chat with Claude grounded in your summary and prior profile—not generic gaming small talk.',
      'Constraints handled on purpose: CORS via Edge proxy; owned-title dedupe via prompt rules plus client-side filtering and retry when the model drifts.',
    ],
    stack:
      'Single-file front end; Vercel Edge Functions for Steam + wishlist proxying; Anthropic Messages API; localStorage for config, profiles, and chat—no build step to run the client.',
    type: 'app',
    image: '/images/SteamAi.jpg',
    links: [
      { label: 'Try it', href: '#' },
      { label: 'Source', href: '#' },
    ],
    tags: [
      'HTML/CSS/JS',
      'Vercel Edge',
      'Steam Web API',
      'Anthropic Claude',
      'localStorage',
    ],
  },
  {
    id: 'repolock',
    title: 'RepoLock',
    tagline:
      'Keeps Git sane when several AI coding tools work the same repo at once',
    summary:
      'Daemon + hooks + locks so Cursor, Windsurf, VS Code, and friends don’t stomp each other’s commits—status UI, Git hooks, and Socket.io, not a weekend script.',
    subtitle: 'Git traffic control for the multi-AI-editor era.',
    liveUrl: null,
    paragraphs: [
      'RepoLock is a coordination layer for teams who run multiple AI assistants against one codebase. It watches active editors, tracks branch and dirty-file state, and applies granular locks so one tool doesn’t commit or push over another’s work.',
      'A daemon ties it together: Git hooks, optional file- or branch-level locks, a small live status UI, and clipboard-friendly context exports so people (and other tools) share one source of truth. Build monitoring adds quality checks so merge conflicts aren’t the only failure mode.',
    ],
    highlights: [
      'Distributed coordination without a central IDE server—inference from processes plus repo signals.',
      'Concurrency: repo-wide, file, and branch locks, expiry, and conflict rules that avoid deadlocking real workflows.',
      'Cross-platform hooks and paths (Windows and Unix), polling + watchers + sockets so status stays fresh without crushing huge repos.',
      'Real surface area: CLI, hooks, HTTP/Socket.io—not a one-off script.',
    ],
    stack:
      'Process introspection, filesystem watching, concurrent state, cross-platform Git hooks, and a live API—systems glue that stays correct under racey, everyday editor use.',
    type: 'app',
    image: '/images/REPOLOCK.jpg',
    links: [
      { label: 'Repository', href: '#' },
      { label: 'Details', href: '#' },
    ],
    tags: ['Node.js', 'Git', 'TypeScript', 'Daemon', 'Socket.io', 'Cross-platform'],
  },
]
