# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page static personal portfolio site for Amine Fellah (Industrial Software Engineer / SCADA / ERP-CRM). Pure HTML, CSS, and vanilla JavaScript — no build step, no package manager, no framework, no tests, no backend.

## Running / previewing

There is nothing to build or install. Open [index.html](index.html) directly in a browser, or serve the folder statically, e.g.:

```powershell
python -m http.server 8000   # then visit http://localhost:8000
```

The repo lives under a Laragon webroot (`c:\laragon\www\fellahamine`), so Laragon also serves it as a vhost.

## Structure

A static site with one HTML entry point and assets split into folders:

- [index.html](index.html) — all page content as semantic `<section>`s (hero, about, experience, work, projects, education, contact). Content is hardcoded inline; edit the markup directly to change copy. The Featured Projects cards show title + tags only and open a detail modal on click.
- [assets/css/styles.css](assets/css/styles.css) — all styling. Design tokens (colors, radius, shadow) live in the `:root` CSS variables block at the top; the single responsive breakpoint is `@media (max-width: 860px)` near the bottom, plus a `prefers-reduced-motion` block.
- [assets/js/script.js](assets/js/script.js) — the only JS: reveal-on-scroll `IntersectionObserver` (add the `reveal` class to animate a new section in), nav scroll-spy, the projects slider arrows, and the project detail modal.
- [assets/img/](assets/img/) — `fellah-amine.jpg` (hero portrait) and `banner.svg` (social `og:image`).

[README.md](README.md) is the GitHub profile-style landing page (separate audience from the site itself). The resume/CV is intentionally **not** in the repo (gitignored) — the site asks visitors to contact for it; there is no download link.

## Conventions

- Fonts (Space Grotesk, Chakra Petch) are loaded from Google Fonts via `<link>` in the head — no local font files.
- External links use `target="_blank" rel="noreferrer"`.
- Keep new visual styling driven by the `:root` variables rather than hardcoded color values, and mirror any new grid layout in the 860px breakpoint so it collapses to one column on mobile.
