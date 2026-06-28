# MindQuestor

Free neurodivergent-first productivity tools by [Nex](https://rainbowcatteck.notion.site/Link-Directory-130127c6a16980d7bf78f03a1cef88cf).  
Part of [moonbloom](https://moonbloom.quest) — a soft studio for neurospicy brains.

## Repo layout

```
index.html          ← landing page   (mindquestor.quest)
app/
  index.html        ← app            (mindquestor.quest/app)
netlify.toml        ← Netlify config (also blocks public access to the tooling below)
sitemap.xml
robots.txt
tests/              ← Vitest + jsdom suite, run via `npm test` — kept in git, blocked from public access
package.json / package-lock.json
```

## Branches

| Branch | Purpose |
|---|---|
| `feature/*` | bigger features start here, branched off `dev` — merges into `dev` only once fully stable and done |
| `dev` | active development — small fixes go here directly, features merge in from `feature/*` |
| `main` | production — merging here triggers a Netlify deploy |

## Netlify setup

| Site | Base directory | Publish directory | Deploy branch |
|---|---|---|---|
| mindquestor.quest | *(blank)* | `.` | `main` |

`package.json`, `package-lock.json`, and `tests/` sit at the repo root alongside the site for reproducibility (a fresh clone can `npm test`), but `netlify.toml` redirect rules force them to 404 on the live site — they're never actually servable.

## Tech

Pure HTML/CSS/JS — no build step, no bundler, no dependencies.  
All data lives in `localStorage`. No accounts, no tracking.
