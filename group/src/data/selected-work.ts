import { publications } from './publications';

// Use complete Figure 1 artwork from the linked papers, never decorative crops.
// Every publication participates; missing media gets an honest text cover.
export const paperFigures: Record<string, { image: string; alt: string }> = {
  igen: {
    image: 'media/selected-work/igen-first-figure.webp',
    alt: 'Figure 1 from IGen, showing open-world images and generated robot observations and actions',
  },
  seekvln: {
    image: 'media/selected-work/seekvln-first-figure.webp',
    alt: 'Figure 1 from SeekVLN, showing progress myopia and evidence-seeking navigation examples',
  },
  evta0: {
    image: 'media/selected-work/evta0-first-figure.webp',
    alt: 'Complete eVTA0 architecture and success-probability reward training overview',
  },
  'deco-sgd': {
    image: 'media/selected-work/deco-sgd-first-figure.webp',
    alt: 'Figure 1 from DeCo-SGD, illustrating large-model training across wide-area networks',
  },
  mobilegen: {
    image: 'media/selected-work/mobilegen-first-figure.webp',
    alt: 'Complete MobileGen overview of capability profiling and difficulty-aware GUI trajectory generation',
  },
  trailblazer: {
    image: 'media/selected-work/trailblazer-first-figure.webp',
    alt: 'Figure 1 from Trailblazer, introducing generalizable network policies and the evaluation scenarios',
  },
  'cobel-world': {
    image: 'media/selected-work/cobel-world-first-figure.webp',
    alt: 'Figure 1 from CoBel-World, comparing multi-agent communication protocols and collaborative belief reasoning',
  },
  'catp-llm': {
    image: 'media/selected-work/catp-llm-first-figure.webp',
    alt: 'Figure 1 from CATP-LLM, comparing tool plans and their performance-cost tradeoffs',
  },
  'decentralized-survey': {
    image: 'media/selected-work/decentralized-survey-first-figure.webp',
    alt: 'Overview figure from the survey Beyond a Single AI Cluster',
  },
  netllm: {
    image: 'media/selected-work/netllm-first-figure.webp',
    alt: 'Figure 1 from NetLLM, illustrating token-based answer generation in language models',
  },
};

const captions: Record<string, string> = {
  igen: 'Robot learning from open-world images.',
  geomind: 'Spatial understanding for robotic manipulation.',
  seekvln: 'Seeking evidence before the next move.',
  evta0: 'Learning rewards from policy experience.',
  'deco-sgd': 'Efficient training across datacenters.',
  mobilegen: 'Training GUI agents at the right difficulty.',
  trailblazer: 'Generalizable policies for network control.',
  'cobel-world': 'Shared beliefs for better collaboration.',
  'catp-llm': 'Better plans with lower tool costs.',
  'decentralized-survey': 'Large-model training beyond one cluster.',
  netllm: 'Large models for networking decisions.',
};

// Put works with supplied figures first; keep every record, including GeoMIND.
const orderedPublications = [
  ...publications.filter((paper) => paperFigures[paper.id]),
  ...publications.filter((paper) => !paperFigures[paper.id]),
];

export const selectedWork = orderedPublications.map((publication) => ({
  id: publication.id,
  name: publication.name,
  title: publication.title,
  image: paperFigures[publication.id]?.image,
  alt: paperFigures[publication.id]?.alt,
  caption: captions[publication.id] || publication.summary,
  label:
    publication.venue === 'Preprint'
      ? String(publication.year)
      : publication.venue,
  href: (
    publication.links.find((link) => link.label === 'Project') ||
    publication.links[0]
  )?.href,
}));
