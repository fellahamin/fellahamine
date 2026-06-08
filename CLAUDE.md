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

The whole site is four files at the repo root:

- [index.html](index.html) — all page content as semantic `<section>`s (hero, about, work, projects, stack, contact). Content is hardcoded inline; edit the markup directly to change copy.
- [styles.css](styles.css) — all styling. Design tokens (colors, radius, shadow) live in the `:root` CSS variables block at the top; the single responsive breakpoint is `@media (max-width: 860px)` at the bottom.
- [script.js](script.js) — the only JS: an `IntersectionObserver` that adds the `is-visible` class to every `.reveal` element as it scrolls into view (staggered by `transitionDelay`). To make a new section animate in, give it the `reveal` class.
- [banner.svg](banner.svg) — README banner asset.

[README.md](README.md) is the GitHub profile-style landing page (separate audience from the site itself). The two `Fellah Amine - Resume.*` files are the CV; they are untracked and not part of the site.

## Conventions

- Fonts (Space Grotesk, Chakra Petch) are loaded from Google Fonts via `<link>` in the head — no local font files.
- External links use `target="_blank" rel="noreferrer"`.
- Keep new visual styling driven by the `:root` variables rather than hardcoded color values, and mirror any new grid layout in the 860px breakpoint so it collapses to one column on mobile.
