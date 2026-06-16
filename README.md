# MindQuestor

Free neurodivergent-first productivity tools by [Nex](https://rainbowcatteck.notion.site/Link-Directory-130127c6a16980d7bf78f03a1cef88cf).  
Part of [moonbloom](https://moonbloom.quest) — a soft studio for neurospicy brains.

## Repo layout

```
mindquestor/
  index.html        ← landing page   (mindquestor.quest)
  app/
    index.html      ← app            (mindquestor.quest/app)
  netlify.toml      ← Netlify config
  sitemap.xml
  robots.txt
```

## Branches

| Branch | Purpose |
|---|---|
| `dev` | active development — all work goes here |
| `main` | production — merging here triggers a Netlify deploy |

## Netlify setup

| Site | Base directory | Publish directory | Deploy branch |
|---|---|---|---|
| mindquestor.quest | `mindquestor` | `.` | `main` |

## Tech

Pure HTML/CSS/JS — no build step, no bundler, no dependencies.  
All data lives in `localStorage`. No accounts, no tracking.
