---
version: alpha
name: MMLab at SIGS
description: An English research group website with a compact centered introduction and a moving gallery of real research.
colors:
  paper: '#ffffff'
  ink: '#1d1d1f'
  accent: '#660874'
  primary: '#660874'
  accent-hover: '#4e0559'
  surface: '#f5f5f7'
  muted: '#6e6e73'
  rule: '#e8e8ed'
  white: '#ffffff'
  diagram-rule: '#b8b8be'
  scroll-thumb: '#aaaab0'
  scroll-hover: '#85858b'
  scroll-active: '#660874'
  lattice: '#a3abb8'
typography:
  display:
    fontFamily: 'Inter Variable, Helvetica Neue, Arial, sans-serif'
  body:
    fontFamily: 'Inter Variable, Helvetica Neue, Arial, sans-serif'
rounded:
  DEFAULT: '0px'
  work-image: '14px'
spacing:
  page-max: '1680px'
  mobile-gutter: '22px'
  desktop-gutter-max: '90px'
components:
  header:
    height: '76px'
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
  text-link:
    height: '44px'
---

# MMLab at SIGS design

## Overview

An English research group website for prospective students, researchers, and collaborators. Readers should understand the group and its three directions, then find publications, people, or application information.

The user's reference is HKU MMLab, especially its Inter typography and broad introductory bands. The latest approved homepage replaces the earlier purple, two-column slogan and oversized IGen image pair with a compact centered group name and a compact moving research gallery. The visual reference is Apple's restrained white, black, gray, and occasional blue links. Purple is no longer required. This is a content site, not application-style tabs. The five navigation sections remain, but Research Directions is a section of the homepage (`#directions`), not a separate route: the homepage introduces each direction and Publications lists all papers by area, so a separate directions page only repeated them.

Avoid dark landscape heroes, toy-like illustrations, large decorative backgrounds, heavy gradients, invented impact statistics, and a single-paper homepage. The moving gallery is the signature element; everything around it stays quiet.

## Colors

Fixed light appearance is intentional. White paper, near-black ink, gray secondary text, pale neutral surfaces, and Tsinghua purple (`#660874`) links, hover, current-navigation, and focus states are shared across all pages. The user first chose Apple-style blue, then switched the accent to Tsinghua purple for identity; keep it as a restrained accent on white, never a purple wash, gradient, or pink-purple. Research Directions follows HKU MMLab's band layout in the first version's colors: full-bleed rows, each split into a figure panel (about 40%) and a text block (about 60%) with a large title, summary, three topics, and an “Explore papers ›” link at the bottom right. AI Agents: text on `--surface` (#f5f5f7), figure on charcoal `--night` (#242426). Embodied Intelligence: text on `--soft-surface` (#f0f1f2), figure on white, sides swapped. Distributed Training: text on charcoal with `--night-text`/`--night-muted` and a `--night-accent` lilac link, figure on `--surface`. Figures sit uncropped on white with 14px rounding. Gold titles on purple/navy/green, a night-stage hero, black/white bands, all-light bands, and Apple-style tiles were tried; the user chose these colors.

`src/styles/global.css` is the canonical runtime token source. The translucent `--horizon-glow` (`rgba(102, 8, 116, 0.1)`) and `--horizon-violet` (`rgba(130, 49, 142, 0.06)`) glow tokens live only in CSS. Every frontmatter color except the `primary` alias maps directly to `--<key>` in `:root`; `primary` aliases `accent`. Font roles map to `--font-display` and `--font-body`. The document mirrors the runtime source; update both together. Component sizes map to their named selectors in that stylesheet. There is no generated token adapter.

## Typography

Use standard Inter, self-hosted through `@fontsource-variable/inter`, as explicitly requested after inspecting https://mmlab.hk/. Do not revert to Inter Tight, Manrope, or Source Sans 3.

The two homepage section headings, About us and Research Directions, share one `.section-title` display style: 44–84px, weight 700, -0.05em tracking, ink, no uppercase labels. Band titles step down to 32–52px. The Research work gallery has no visible heading or “View all publications” link (the hero links to Publications); it keeps an accessible label. About us opens directly with the group introduction; the mission line is not repeated there. Band titles are ink on light and white on charcoal. The centered homepage group name uses weight 600, tight tracking (-0.045em), and 1.1 line height, in two lines on desktop with natural wrapping on narrow phones. Its exact text is “Agentic and Embodied Large Model Training Group”. The smaller centered subtitle is “We build agents that reason, robots that learn, and systems that make large-scale training possible.” Secondary-page display headings remain 700 with normal tracking; body is 400, navigation 500, and paper titles 600. Long paper titles and author lists wrap in full. Content and accessible labels are English.

## Layout

The shell is at most 1680px wide; gutters grow from 22px to 90px through the `--gutter` token, which `.page-gutter` uses so every section aligns to the same left and right edges. The centered introduction and the Research work gallery share one `.home-stage` background, the homepage's only decorative layer: a soft horizon of light behind the title (`--horizon-glow` in Tsinghua purple, with a faint `--horizon-violet`) and a `--lattice` dot grid tilted into perspective, a ground plane that recedes from the gallery toward the horizon. It is static (the gallery remains the only motion), masked to fade at the sides and bottom, quieter on phones, and hidden in forced-colors mode. Homepage order: centered group introduction → research work gallery → About us → three full-width research direction bands → footer. Preserve the original group information. Each band carries an `id` (`agents`, `embodied`, `training`) used by About us links and the footer, and its “Explore papers ›” link opens Publications filtered to that area (`publications/?topic=<id>`). The homepage ends after the bands; NetLLM and Trailblazer stay reachable through the Publications page's Large-Model Decision-Making filter. Each band lists the direction's three sub-topics from `research.ts` (matching the original group page's topic cards). Each band's figure panel shows one complete paper figure — MobileGen Figure 1 (agents), IGen Figure 6 real-world robot experiments (embodied), and Beyond a Single AI Cluster Figure 1 (training) — with a caption, never cropped. No conceptual diagrams or invented illustrations.

About us first identifies MMLab@SIGS, Tsinghua SIGS, and the faculty advisor, then connects pretrained-model capabilities with the group's three research directions. It preserves the old page's research scope rather than adopting the neighboring group's distinct research agenda. `AboutUs.astro` pairs the English introduction with an attributed, unaltered official photograph of the Information Building at the Shenzhen campus. The photograph sits beside the text, never behind it; on mobile it follows the introduction. The campus choice is the current design recommendation, pending user feedback. The old AI-stylized gathering pictures are candidates for a future team-life section, not the main About us identity image.

The work gallery includes every publication (currently eleven). Use the verified Figure 1 artwork extracted from each available paper with object-fit: contain, not photos or enlarged diagram crops. Frames are 200px high on desktop and 180px on phones, with copy below, quiet rules, and no shadows. All original figure content remains visible. GeoMIND currently has an explicit typographic cover because a verified figure is not available; the user is asking a colleague and has deferred this asset. Replace it when supplied. Do not invent a research figure. Image dimensions and containers reserve geometry.

Breakpoints: 1100px adapts columns, 800px activates the mobile menu and stacks each band (figure above its color block), and 540px stacks paper records. At 320px the page has no horizontal overflow. The document owns vertical scrolling. Only the unenhanced gallery uses a native, visible horizontal scrollbar; its enhanced version is a transformed carousel without a separate control row. Do not hide the page's scrollbar. Global scrollbar tokens and forced-colors behavior apply to all native scrolling surfaces.

## Elevation & Depth

Use whitespace, scale, tonal blocks, and quiet rules. No card shadows, glass effects, or decorative borders around each content group.

## Shapes

Rectangular reading sections with gently rounded gallery images. Rounded media does not imply rounded containers around all content.

## Components

- `SiteLayout.astro`: shared metadata, navigation, mobile menu, footer, and self-hosted font. The footer follows HKU MMLab's structure in its simplest form: a large `MMLab @ SIGS` wordmark, then the five navigation headings only (About us, Research Directions, Publications, Team, Join us), rendered from the same `navigation` list as the header, as bold 19px links (17px on phones) that turn Tsinghua purple on hover. A ruled bottom row holds copyright, affiliation, and Back to top. The header's Join us has no arrow. No affiliation logo row because no verified logo files are available. Smooth scrolling applies only under `html:focus-within`, because smooth scrolling on the root stops pages loaded with a `#fragment` from jumping to it.
- `AboutUs.astro`: group identity, original research rationale, linked research directions, team entry point, and Shenzhen-campus photograph (caption only; the source is recorded in `public/media/about/README.md`, not linked on the page, at the user's request).
- `SelectedWork.astro`: semantic work markup; `src/data/selected-work.ts` maps complete paper first figures and derives every record, paper name, venue, and link from `publications.ts`; new publications automatically appear with an honest text cover until an image is supplied.
- `src/scripts/selected-work.ts`: carousel enhancement, about 19px/second movement, pointer drag, and horizontal wheel input. The user explicitly requested no previous/next or Play/Pause buttons; there is no control/status row. Hover/focus, active dragging, hidden document, and out-of-view media suspend movement; it resumes when those conditions clear. Reduced motion disables automatic movement. All originals remain keyboard accessible; loop copies are excluded from the tab order and accessibility tree. Without JavaScript all originals remain available with native horizontal scrolling.
- `PageIntro.astro`, `PublicationRow.astro`, and `DirectionArt.astro`: shared secondary headings, complete paper records, and the band figure; each band's title, summary, and topics come from `research.ts` and `publications.ts`.

The archive renders all eleven papers without JavaScript; native year/topic selects preserve URL filters and provide count/no-results/reset states. Native details/summary exposes original abstracts. The operating system owns select popups. Missing paper links are omitted, not fabricated. Navigation is visible without JavaScript; the enhanced mobile menu supports Escape and focus return. The site header is sticky (white, bottom rule, no shadow) so navigation stays visible while scrolling; `--header-height` (76px desktop, 100px at ≤800px) feeds `scroll-padding-top` so anchor jumps land below it. On narrow screens without the menu script the header is not pinned, because the full nav would take too much height.

## Do's and Don'ts

- Preserve original research, roster, and recruitment information while translating and adding work.
- Use actual research media with provenance; never fabricate paper diagrams or imply input images are robot outputs.
- Keep all internal URLs and media base-path aware.
- Keep NetLLM and Trailblazer visible as related large-model decision-making research.
- Do not add members solely from author lists.
- Work on `meiyuanGroup`; commit each completed and checked iteration as explicitly requested. Merge to main and deploy only after user approval.
