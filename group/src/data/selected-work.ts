import { publications } from './publications';

// Curated homepage presentation; titles, venues, and links belong to publications.ts.
const covers = [
  {
    id: 'seekvln',
    image: 'media/selected-work/seek-robot.webp',
    crop: 'seek',
    alt: 'A Unitree Go2 robot seeking navigation evidence in a hallway, from the SeekVLN project',
    caption: 'Seeking evidence before the next move.',
  },
  {
    id: 'igen',
    image: 'media/igen/scene_1_tea.jpg',
    crop: 'igen',
    alt: 'An open-world tea-set input image used by IGen to generate robot learning environments',
    caption: 'Robot learning from open-world images.',
  },
  {
    id: 'cobel-world',
    image: 'media/selected-work/cobel-cover.jpg',
    crop: 'cobel',
    alt: 'Detail of the overhead collaborative environment in the CoBel-World paper',
    caption: 'Shared beliefs for better collaboration.',
  },
  {
    id: 'netllm',
    image: 'media/selected-work/netllm-cover.jpg',
    crop: 'netllm',
    alt: 'Detail of the multimodal adaptation architecture in the NetLLM paper',
    caption: 'Large models for networking decisions.',
  },
  {
    id: 'deco-sgd',
    image: 'media/selected-work/deco-cover.jpg',
    crop: 'deco',
    alt: 'Detail of the cross-datacenter communication diagram in the DeCo-SGD paper',
    caption: 'Efficient training across datacenters.',
  },
];

export const selectedWork = covers.map((cover) => {
  const publication = publications.find((paper) => paper.id === cover.id);
  if (!publication)
    throw new Error(`Unknown selected publication: ${cover.id}`);
  return {
    ...cover,
    name: publication.name,
    label:
      publication.venue === 'Preprint'
        ? String(publication.year)
        : publication.venue,
    href: (
      publication.links.find((link) => link.label === 'Project') ||
      publication.links[0]
    )?.href,
  };
});
