export const topics = {
  agents: 'AI Agents',
  embodied: 'Embodied Intelligence',
  training: 'Distributed Training',
  decision: 'Large-Model Decision-Making',
};
export type Topic = keyof typeof topics;
export interface Publication {
  id: string;
  name: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  topic: Topic;
  summary: string;
  links: { label: string; href: string }[];
  abstract?: string;
}

export const publications: Publication[] = [
  {
    id: 'igen',
    name: 'IGen',
    year: 2026,
    venue: 'CVPR 2026',
    topic: 'embodied',
    title:
      'IGen: Scalable Data Generation for Robot Learning from Open-World Images',
    authors:
      'Chenghao Gu*, Haolan Kang*, Junchao Lin*, Jinghe Wang, Duo Wu, Shuzhao Xie, Fanding Huang, Junchen Ge, Ziyang Gong, Letian Li, Hongying Zheng, Changwei Lv, Zhi Wang.',
    summary:
      'Generating structured 3D scenes and robot trajectories from open-world images to scale robot learning data.',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2512.01773' },
      { label: 'Project', href: 'https://chenghaogu.github.io/IGen/' },
      { label: 'Code', href: 'https://github.com/ChenghaoGu/IGen_Robot' },
    ],
  },
  {
    id: 'geomind',
    name: 'GeoMIND',
    year: 2026,
    venue: 'NeurIPS 2026',
    topic: 'embodied',
    title:
      'GeoMIND: A Benchmark for Spatial Understanding in Robotic Manipulation',
    authors:
      'Jinghe Wang*, Xinrui Cao*, Duo Wu*, Chenghao Gu, Yong Zhong, Linjia Kang, Tianyi Xiong, Zhi Wang.',
    summary:
      'A benchmark for evaluating spatial understanding in robotic manipulation.',
    links: [],
  },
  {
    id: 'seekvln',
    name: 'SeekVLN',
    year: 2026,
    venue: 'Preprint',
    topic: 'embodied',
    title:
      'Seek Before You Move: Evidence Seeking for Progress Grounding in Vision-Language Navigation',
    authors:
      'Zhimin Wang, Meiyuan Zhu, Duo Wu, Linjia Kang, Yajun Wang, Yuan Ni, Xiaohang Wang, Tianlu Pan, Jingyan Jiang, Yaowei Wang, Zhi Wang.',
    summary:
      'Seeking evidence to ground navigation progress before deciding where to move.',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2609.37353' },
      {
        label: 'Project',
        href: 'https://zhiminwangss.github.io/seekvln-project/',
      },
    ],
  },
  {
    id: 'evta0',
    name: 'eVTA₀',
    year: 2026,
    venue: 'Preprint',
    topic: 'embodied',
    title:
      'Demonstration-Free Success-Probability Reward Learning for Generalist Robot Policies',
    authors:
      'Duo Wu, Haifeng Wang, Rongwei Lu, Jinghe Wang, Tianyi Xiong, Zhimin Wang, Chao Yu, Shuai Ma, Zhi Wang.',
    summary:
      'Learning dense success-probability rewards from policy experience and sparse task outcomes, without human demonstrations.',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2609.33653' },
      { label: 'Project', href: 'https://duowuyms.github.io/evta0/' },
      { label: 'Code', href: 'https://github.com/duowuyms/eVTA0' },
    ],
  },
  {
    id: 'deco-sgd',
    name: 'DeCo-SGD',
    year: 2026,
    venue: 'IEEE JSAC',
    topic: 'training',
    title:
      'Taming Latency and Bandwidth: A Theoretical Framework and Adaptive Algorithm for Communication-Constrained Training',
    authors:
      'Rongwei Lu*, Jingyan Jiang*, Chunyang Li, Xingguang Wei, Zhi Wang.',
    summary:
      'Adapting gradient compression and staleness to communication conditions for efficient cross-datacenter training.',
    links: [{ label: 'Paper', href: 'https://arxiv.org/abs/2507.17346' }],
  },
  {
    id: 'mobilegen',
    name: 'MobileGen',
    year: 2026,
    venue: 'Preprint',
    topic: 'agents',
    title:
      'Learning with Challenges: Adaptive Difficulty-Aware Data Generation for Mobile GUI Agent Training',
    authors:
      'Linjia Kang*, Zhimin Wang*, Yongkang Zhang*, Duo Wu, Jinghe Wang, Ming Ma, Haopeng Yan, Zhi Wang.',
    summary:
      'Adapting the difficulty of generated interaction trajectories to the capability frontier of mobile GUI agents.',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2601.22781' },
      {
        label: 'Project',
        href: 'https://xiaogou1234.github.io/papers/mobilegen/',
      },
    ],
  },
  {
    id: 'trailblazer',
    name: 'Trailblazer',
    year: 2025,
    venue: 'Preprint · updated 2026',
    topic: 'decision',
    title:
      'Grounding Large Language Models as Generalizable Policies in Network Control',
    authors:
      'Duo Wu, Linjia Kang, Zhimin Wang, Fangxin Wang, Wei Zhang, Chongbo Sun, Xuefeng Tao, Wei Yang, Le Zhang, Wenwu Zhu, Peng Cui, Zhi Wang.',
    summary:
      'Grounding LLMs as generalist network policies that transfer across tasks and environments, with real-world evaluation on Douyin.',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2512.11839' },
      { label: 'Project', href: 'https://duowuyms.github.io/trailblazer/' },
      { label: 'Code', href: 'https://github.com/duowuyms/Trailblazer' },
    ],
  },
  {
    id: 'cobel-world',
    name: 'CoBel-World',
    year: 2025,
    venue: 'Preprint',
    topic: 'agents',
    title:
      'Collaborative Belief Reasoning with LLMs for Efficient Multi-Agent Collaboration',
    authors:
      'Zhimin Wang*, Duo Wu*, Shaokang He*, Linjia Kang, Jinghe Wang, Jing Yu, Kai Zhu, Jiawei Li, Zhi Wang.',
    summary:
      'Modeling the environment and collaborators’ intentions to improve coordination while reducing redundant communication.',
    links: [{ label: 'Paper', href: 'https://arxiv.org/abs/2509.21981' }],
  },
  {
    id: 'catp-llm',
    name: 'CATP-LLM',
    year: 2025,
    venue: 'ICCV 2025',
    topic: 'agents',
    title:
      'CATP-LLM: Empowering Large Language Models for Cost-Aware Tool Planning',
    authors:
      'Duo Wu*, Jinghe Wang*, Yuan Meng*, Yanning Zhang, Le Sun, Zhi Wang.',
    summary:
      'Reinforcement learning for effective tool planning that balances plan quality with execution costs.',
    links: [
      {
        label: 'Paper',
        href: 'https://openaccess.thecvf.com/content/ICCV2025/html/Wu_CATP-LLM_Empowering_Large_Language_Models_for_Cost-Aware_Tool_Planning_ICCV_2025_paper.html',
      },
      { label: 'Code', href: 'https://github.com/duowuyms/OpenCATP-LLM' },
    ],
  },
  {
    id: 'decentralized-survey',
    name: 'Beyond a Single AI Cluster',
    year: 2025,
    venue: 'EMNLP 2025',
    topic: 'training',
    title: 'Beyond a Single AI Cluster: A Survey of Decentralized LLM Training',
    authors:
      'Haotian Dong*, Jingyan Jiang*, Rongwei Lu, Jiajun Luo, Jiajun Song, Bowen Li, Ying Shen, Zhi Wang.',
    summary:
      'A resource-driven perspective on decentralized LLM training across clusters, datacenters, and regions.',
    links: [{ label: 'Paper', href: 'https://arxiv.org/abs/2503.11023' }],
  },
  {
    id: 'netllm',
    name: 'NetLLM',
    year: 2024,
    venue: 'SIGCOMM 2024',
    topic: 'decision',
    title: 'NetLLM: Adapting Large Language Models for Networking',
    authors:
      'Duo Wu, Xianda Wang, Yaqi Qiao, Zhi Wang, Junchen Jiang, Shuguang Cui, Fangxin Wang.',
    summary:
      'A framework for adapting large language models to networking decisions, including viewport prediction, bitrate adaptation, and cluster scheduling.',
    links: [
      {
        label: 'Paper',
        href: 'https://dl.acm.org/doi/10.1145/3651890.3672268',
      },
      { label: 'Code', href: 'https://github.com/duowuyms/NetLLM' },
    ],
  },
];
