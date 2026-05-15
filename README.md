# MindQuestor / Moonbloom

Neurodivergent-first productivity tools by [Nex (RainbowCatTeck)](https://ko-fi.com/rainbowcatteck).

## Repo layout

```
mindquestor/
  index.html        ← MindQuestor landing page  (mindquestor.netlify.app)
  app/
    index.html      ← MindQuestor app            (mindquestor.netlify.app/app)
  netlify.toml      ← Netlify config for the MindQuestor site

moonbloom/
  index.html        ← Moonbloom landing page     (moonbloom.netlify.app)
  netlify.toml      ← Netlify config for the Moonbloom site
```

## Netlify deploy setup

Two separate Netlify sites, both pointing at this repo:

| Site | Base directory | Publish directory |
|---|---|---|
| mindquestor.netlify.app | `mindquestor` | `.` |
| moonbloom.netlify.app | `moonbloom` | `.` |

Set **Base directory** in each site's *Build & deploy → Build settings* in the Netlify dashboard.

## Tech

Pure HTML/CSS/JS — no build step, no bundler, no dependencies.  
All data lives in `localStorage`. No accounts, no tracking.
