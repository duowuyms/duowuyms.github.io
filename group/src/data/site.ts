export const site = {
  name: 'Agentic and Embodied Large Model Training',
  affiliation: 'Tsinghua Shenzhen International Graduate School',
  shortName: 'MMLab @ SIGS',
  advisor: {
    name: 'Prof. Zhi Wang',
    url: 'http://zwang.inflexionlab.org/',
  },
  mission:
    'Turning the knowledge of large models into decisions and actions in open-world environments.',
  admissions:
    'https://www.notion.so/mmlabsigs/14302b1c9db140c6b0842a2537b8bbbb',
};

export const navigation = [
  { label: 'About us', path: '' },
  { label: 'Research Directions', path: '#directions' },
  { label: 'Publications', path: 'publications/' },
  { label: 'Team', path: 'team/' },
  { label: 'Join us', path: 'team/#join' },
];

export const contacts = [
  {
    name: 'Duo Wu',
    area: 'AI agents & embodied intelligence',
    email: 'wu-d24@mails.tsinghua.edu.cn',
  },
  {
    name: 'Rongwei Lu',
    area: 'Distributed large-model training',
    email: 'lurw24@mails.tsinghua.edu.cn',
  },
];

export interface Person {
  name: string;
  url?: string;
}
export const team: {
  id: string;
  label: string;
  people: Person[];
}[] = [
  {
    id: 'advisor',
    label: 'Faculty advisor',
    people: [site.advisor],
  },
  {
    id: 'phd',
    label: 'PhD students',
    people: [
      { name: 'Bowen Li' },
      { name: 'Duo Wu', url: 'https://duowuyms.github.io/' },
      { name: 'Rongwei Lu', url: 'https://rongweilu.cc/' },
      {
        name: 'Zhimin Wang',
        url: 'https://zhiminwangss.github.io/',
      },
    ],
  },
  {
    id: 'masters',
    label: 'Master’s students',
    people: [
      { name: 'Bingkun Zhu' },
      { name: 'Chunyang Li' },
      {
        name: 'Haotian Dong',
        url: 'https://scholar.google.com/citations?user=uZcizG0AAAAJ&hl=en',
      },
      { name: 'Jiajun Luo', url: 'https://cobalt-27.github.io/' },
      { name: 'Jiajun Song' },
      { name: 'Jinghe Wang' },
      { name: 'Le Sun' },
      {
        name: 'Linjia Kang',
        url: 'https://xiaogou1234.github.io/',
      },
      { name: 'Tianyi Xiong' },
      { name: 'Vahagn Ghazaryan' },
      { name: 'Xinrui Cao' },
      { name: 'Xinwan Wen' },
      { name: 'Yanning Zhang' },
      { name: 'Yutong Jiang' },
    ],
  },
];
