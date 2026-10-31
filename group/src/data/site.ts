export const site = {
  name: 'Agentic and Embodied Large Model Training',
  affiliation: 'Tsinghua Shenzhen International Graduate School',
  shortName: 'MMLab @ SIGS',
  advisor: {
    name: 'Prof. Zhi Wang',
    url: 'http://zwang.inflexionlab.org/',
    photo: 'media/team/zhi-wang.webp',
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
  // A portrait from the member's own homepage; see public/media/team/README.md.
  photo?: string;
}
export const team: {
  id: string;
  label: string;
  role: string;
  people: Person[];
}[] = [
  {
    id: 'advisor',
    label: 'Faculty advisor',
    role: 'Faculty advisor',
    people: [site.advisor],
  },
  {
    id: 'phd',
    label: 'PhD students',
    role: 'PhD student',
    people: [
      { name: 'Bowen Li' },
      { name: 'Duo Wu', url: 'https://duowuyms.github.io/' },
      { name: 'Rongwei Lu', url: 'https://rongweilu.cc/' },
      {
        name: 'Zhimin Wang',
        url: 'https://zhiminwangss.github.io/',
        photo: 'media/team/zhimin-wang.webp',
      },
    ],
  },
  {
    id: 'masters',
    label: 'Master’s students',
    role: 'Master’s student',
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
        photo: 'media/team/linjia-kang.webp',
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
