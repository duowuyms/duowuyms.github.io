export const directions = [
  {
    id: 'agents',
    name: 'AI Agents',
    title: 'AI Agents',
    summary:
      'From understanding a goal to getting things done. We study how agents plan, use tools, navigate interfaces, and collaborate.',
    topics: ['Tool-use agents', 'GUI agents', 'Multi-agent collaboration'],
    publications: ['mobilegen', 'cobel-world', 'catp-llm'],
  },
  {
    id: 'embodied',
    name: 'Embodied Intelligence',
    title: 'Embodied Intelligence',
    summary:
      'Learning to see, move, and act in the physical world. We connect vision, language, and action through spatial understanding and interaction.',
    topics: [
      'Reinforcement learning for VLA',
      'World models for VLA training',
      'Spatial understanding & perception',
    ],
    publications: ['igen', 'geomind', 'seekvln', 'evta0'],
  },
  {
    id: 'training',
    name: 'Distributed Large-Model Training',
    title: 'Distributed Training',
    summary:
      'Training beyond a single cluster. We develop efficient, scalable systems that connect distributed compute under real communication constraints.',
    topics: [
      'Cross-datacenter training',
      'Communication optimization',
      'Gradient compression',
    ],
    publications: ['deco-sgd', 'decentralized-survey'],
  },
] as const;
