# MMLab @ SIGS group website

An independent Astro + TypeScript website. The five routes are About us (home), Research Directions, Publications, Team, and Join us. Source and tooling are scoped to this directory; the personal homepage and project websites are independent.

## Local development

Use Node 22.23.4 or newer (Node 24 LTS recommended) and npm.

```sh
cd group
npm ci
npm run dev
```

Open `http://127.0.0.1:4321/group/`. The new source is in `src/`. The old `index.html` and `images/` are deliberately retained during review, so opening the old HTML directly will still show the old website.

```sh
npm run check
npm run format:check
npm run build
npm run verify:links
npm run preview
```

`dist/` is the generated website and is ignored by Git. No deployment is triggered by these commands.

## Maintaining content

- `src/data/site.ts`: affiliation, navigation, contacts, and member roster.
- `src/data/research.ts`: the three research directions and their related publication IDs.
- `src/data/publications.ts`: title, authors, year, venue/status, topic, summary, image, and resource links for each paper.
- `src/data/abstracts.json`: abstracts preserved from the original group page.
- `src/data/selected-work.ts`: the homepage's five curated covers, crop classes, alt text, and captions. Paper names, venues, and links are derived from `publications.ts`.
- `src/components/SelectedWork.astro` and `src/scripts/selected-work.ts`: progressively enhanced moving work gallery.
- `src/styles/global.css`: canonical design tokens and shared styles; see `DESIGN.md` for intent.
- `public/`: research media and figures, copied into the generated website.

To add a publication, add a record to `publications.ts`, using a unique `id`. Reference that ID from `research.ts` where relevant. Avoid speculative acceptance labels, citation/star counts, or links to similarly named papers. Filters use publication year; Trailblazer keeps its initial preprint year and explicitly notes its 2026 update.

The roster is translated from the existing group page. Names were not added based solely on a paper author list. GeoMIND has no resource link until a verified paper/project URL is available. DeCo-SGD's JSAC status was confirmed by the site owner; its author list and paper link follow the linked preprint. Recheck final journal metadata before publishing citations in another format.

## Deployment and path configuration

The default build targets this personal repository's `/group/` path. All navigation, media, and generated assets respect the configured base path. For the existing MMLab group URL:

```sh
GROUP_SITE_URL=https://mmlab-sigs.github.io \
GROUP_BASE_PATH=/groups/agentic-and-embodied-large-model-training-group/ \
npm run build
```

The base path must begin and end with `/`. Publish the **contents** of `dist/` into the matching directory of the destination website. `dist/` itself does not contain the base-path directories. Keep other site content intact and configure the destination's build process to include this output. A GitHub Actions workflow can build this directory and combine its output with the existing site; it must not publish only this `dist/` as the root of the personal website.

No workflow is enabled here because the production URL belongs to a separate MMLab repository and its publishing configuration has not been established. Do not replace the existing repository-wide Jekyll deployment with the group build. Verify the destination configuration before merging or publishing. For GitHub Pages' site-wide custom 404 page, integrate the generated `404.html` with the destination's own fallback rather than assuming a subdirectory-specific fallback.

## Media provenance

- IGen scene input images and generated clips: [official IGen project](https://chenghaogu.github.io/IGen/), from `ChenghaoGu/ChenghaoGu.github.io/IGen/img/scenes/` and `IGen/video/scenes/`. The homepage uses the tea-set input image and links to the original project. Files retain their original names under `public/media/igen/`; generated videos are retained but no longer loaded by the homepage.
- SeekVLN robot cover: [official SeekVLN project](https://zhiminwangss.github.io/seekvln-project/), `ZhiminWangSS/seekvln-project/assets/robot-seek.webp`, copied as `public/media/selected-work/seek-robot.webp`.
- Gallery CoBel-World, NetLLM, and DeCo-SGD covers: resized versions of the existing group figures, cropped with CSS. See `public/media/selected-work/README.md`.
- MobileGen, CoBel-World, CATP-LLM, Trailblazer, NetLLM, DeCo-SGD, survey figures: existing group website's `images/`.
- eVTA₀ overview: existing `evta0/assets/figures/model.webp`.
- Standard Inter: self-hosted from `@fontsource-variable/inter` (OFL), matching the font used by [HKU MMLab](https://mmlab.hk/). Homepage title uses 600, secondary display headings 700, navigation 500, and body 400.
- The original DM Sans asset and license remain in `src/assets/fonts/` for reference; the new typography does not load them.

The homepage gallery moves slowly, with dragging and horizontal wheel navigation, without previous/next or Play/Pause buttons. Hover/focus, active dragging, or a hidden/offscreen document suspends movement; reduced motion disables automatic movement. Without JavaScript it becomes a native horizontal list. No video autoplay or remote font requests are required. Research images are not labeled as measured results.

See `HANDOFF.md` for the conversation decisions, current state, verification, and remaining review/deployment work.
