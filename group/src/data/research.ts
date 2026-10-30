export const directions = [
  {
    id: 'agents',
    name: 'AI Agents',
    verb: 'Reason',
    headline: ['AI', 'Agents'],
    summary:
      'From understanding a goal to getting things done. We study how agents plan, use tools, navigate interfaces, and collaborate.',
    description:
      'We use large models as the reasoning core of autonomous agents, equipping them with goal understanding, task decomposition, tool use, and memory. Our goal is to enable agents to make decisions and adapt as complex tasks unfold.',
    topics: ['Tool-use agents', 'GUI agents', 'Multi-agent collaboration'],
    questions: [
      'How can agents choose and coordinate tools while balancing performance and cost?',
      'How can training data adapt to the evolving capabilities of GUI agents?',
      'How can agents reason about collaborators’ intentions and communicate efficiently?',
    ],
    publications: ['mobilegen', 'cobel-world', 'catp-llm'],
  },
  {
    id: 'embodied',
    name: 'Embodied Intelligence',
    verb: 'Interact',
    headline: ['Embodied', 'Intelligence'],
    summary:
      'Learning to see, move, and act in the physical world. We connect vision, language, and action through spatial understanding and interaction.',
    description:
      'We connect vision-language-action models with robotic control to build systems that perceive their surroundings and act in the physical world. Through reinforcement learning, world models, and spatial understanding, we study how policies can improve through interaction.',
    topics: [
      'Reinforcement learning for VLA',
      'World models for robot learning',
      'Spatial understanding & perception',
    ],
    questions: [
      'How can open-world visual data provide scalable experience for robot learning?',
      'How can policies improve with rewards learned without human demonstrations?',
      'How can agents ground navigation and manipulation in spatial evidence?',
    ],
    publications: ['igen', 'geomind', 'seekvln', 'evta0'],
  },
  {
    id: 'training',
    name: 'Distributed Large-Model Training',
    verb: 'Scale',
    headline: ['Distributed', 'Training'],
    summary:
      'Training beyond a single cluster. We develop efficient, scalable systems that connect distributed compute under real communication constraints.',
    description:
      'We study distributed systems for efficient large-model training across heterogeneous clusters and datacenters. By coordinating parallelism, communication compression, and synchronization, we aim to make training stable and scalable under real-world resource constraints.',
    topics: [
      'Cross-datacenter training',
      'Communication optimization',
      'Gradient compression',
    ],
    questions: [
      'How can training use compute distributed across clusters and datacenters?',
      'How should compression and synchronization adapt to latency and bandwidth?',
      'How can theory guide practical systems for decentralized large-model training?',
    ],
    publications: ['deco-sgd', 'decentralized-survey'],
  },
] as const;
