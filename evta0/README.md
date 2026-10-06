# eVTA0 Project Page

Static project webpage for **"Demonstration-Free Success-Probability Reward
Learning for Generalist Robot Policies"** (arXiv:2609.33653).

Canonical URL: <https://duowuyms.github.io/evta0/>

## Structure

```
evta0/
├── index.html          single-page site (semantic HTML, OG/citation meta)
├── styles.css          editorial stylesheet (SeekVLN design language)
├── script.js           demo tabs, paired playback, result split toggle,
│                       BibTeX copy, figure zoom dialog
├── .nojekyll           disable GitHub Pages Jekyll processing
└── assets/
    ├── figures/        WebP crops rendered from the paper PDF (PyMuPDF, 5× zoom):
    │                     architecture, RLER loop, reward curves, GRPO bars,
    │                     PPO learning curves (Tables 1–2 and the real-world
    │                     bar figure are kept on disk but no longer referenced)
    ├── videos/         8 real-world clips extracted from slide 23 of
    │                     eVTA0_talk.pptx (already at 3× speed in the source)
    ├── posters/        first-frame WebP posters for each video
    ├── fonts/          Newsreader + DM Sans (self-hosted, OFL)
    ├── evta0.bib       citation entry
    └── favicon.svg
```

No build step and no external dependencies — open `index.html` directly or
serve the folder with any static file server.

## Video naming

Extracted from the slide-23 media elements (picture names in the PPTX XML
resolve the task/policy mapping):

| File                              | PPT media | Content                        |
| --------------------------------- | --------- | ------------------------------ |
| conveyor-distance-{sft,rler}.mp4  | media7/8  | carrot, OOD-Distance           |
| conveyor-rotation-{sft,rler}.mp4  | media6/5  | carrot, OOD-Rotation           |
| shuttlecock-position-a-{sft,rler}.mp4 | media4/3 | shuttlecock, OOD-Position (1) |
| shuttlecock-position-b-{sft,rler}.mp4 | media2/1 | shuttlecock, OOD-Position (2) |

## Preview locally

```
cd evta0
python -m http.server 8000
# open http://127.0.0.1:8000/
```

## Deploy

Push the contents of this folder to the `main` branch of the
`duowuyms.github.io/evta0` repository (or a `gh-pages` branch of a repo named
`evta0`). `.nojekyll` is included.

## Content policy

All numbers, figures, tables, and videos on the page are taken unmodified
from arXiv:2609.33653v1 and its talk slides. Improvement values are absolute
percentage points (pp); the PPO experiment (1,280 episodes) is reported
separately from the GRPO comparison (6,400 episodes per suite);
"demonstration-free" refers to reward learning — policies start from SFT
checkpoints.
