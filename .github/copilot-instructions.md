<!-- .github/copilot-instructions.md -->

# Copilot / AI agent instructions — 04-react-query

This project is a small React + TypeScript + Vite app that uses @tanstack/react-query to search The Movie Database (TMDB) and render results. Keep guidance short and concrete — focus on patterns and files listed below.

Key facts
- Entry: `src/main.tsx` mounts the app wrapped in a React Query `QueryClientProvider`.
- UI tree: `src/components/App/App.tsx` is the main orchestrator. It delegates search input to `SearchBar`, renders results with `MovieGrid`, and shows details in `MovieModal`.
- API: `src/services/movieService.ts` wraps TMDB requests with an axios instance. It expects an environment variable `VITE_TMDB_TOKEN` and throws early if missing.

What to change / where to look (examples)
- To fetch or change movie data: edit `fetchMovies` in `src/services/movieService.ts`. It calls `/search/movie` and returns a typed `FetchMoviesResponse`.
- To change displayed fields or types: update `src/types/movie.ts` and re-run `tsc` (build) to catch type issues.
- To change app behavior (pagination, query cache): edit `src/components/App/App.tsx` — it uses `useQuery(['movies', query, page], () => fetchMovies(query, page), { enabled: query.trim().length>0, keepPreviousData: true })`.

Build / run / debug
- Common commands (see `package.json`):
  - Start dev server: `npm run dev` (runs `vite`).
  - Build: `npm run build` (runs `tsc -b && vite build`).
  - Preview production build: `npm run preview`.
  - Lint: `npm run lint`.
- Environment: the app requires `VITE_TMDB_TOKEN` in the environment (e.g., `.env` file at project root). The app throws on missing token (`movieService.ts`).

Project-specific conventions and patterns
- Small functional components with module CSS alongside each component (`src/components/*/Component.module.css`).
- Prefer typed interfaces in `src/types`. Update types in one place (e.g., `Movie`) and propagate changes.
- Network layer centralization: `src/services/movieService.ts` owns axios configuration (baseURL + Authorization header). Avoid creating multiple axios instances unless necessary.
- React Query is used for caching: follow the pattern of key = `["movies", query, page]` so cached entries are scoped to query + page.

Common fixes and tips for AI edits
- If adding a new env-driven feature, ensure the value is read from `import.meta.env.VITE_*` and validate presence early (see `movieService.ts`).
- When changing fetch signatures (e.g., adding `page`), update all call sites: `App.tsx` useQuery key and the `fetchMovies` function.
- Keep CSS module names aligned with component exports (e.g., `MovieGrid.module.css` <-> `MovieGrid.tsx`).
- When introducing new dependencies, update `package.json` and prefer devDependency vs dependency correctly.

Files to inspect for context
- `src/main.tsx` — app bootstrap + React Query provider
- `src/components/App/App.tsx` — main app logic (query handling, pagination)
- `src/services/movieService.ts` — network layer, axios instance, `getImageUrl`
- `src/types/movie.ts` — data shapes used across the app
- `src/components/SearchBar/SearchBar.tsx` — form handling; uses progressive placeholder animation
- `src/components/MovieGrid/MovieGrid.tsx` — rendering list and keyboard accessibility patterns

Acceptance criteria for code changes
- Builds cleanly with `npm run build` (TypeScript errors fixed).
- No hard-coded secrets. Use `import.meta.env` for envs.
- Network changes must preserve `axiosInstance` headers (Authorization) unless intentionally replacing it.
- When updating types, run a quick typecheck: `npx tsc -b`.

If anything is unclear or you need deeper context (tests, CI, or more runtime commands), ask for the preferred workflow (Windows PowerShell vs. shell) and I'll expand the doc.
