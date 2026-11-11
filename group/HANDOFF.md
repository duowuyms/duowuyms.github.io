# 小组网站改版交接（更新于 2026-11-11）

写给接手的 agent：本文件假设你只能看到 GitHub 仓库，没有之前的对话。先读完本文件，再读 `DESIGN.md`（设计约定，与代码一致，以它为准）和 `README.md`（开发、内容维护、部署、素材来源）。

## 1. 一句话现状

在 `meiyuanGroup` 分支上，用 Astro 重做了 Tsinghua SIGS MMLab「Agentic and Embodied Large Model Training Group」的英文小组网站。功能完整、可构建、已多轮按网站负责人（以下称「用户」）的反馈精修。**尚未合并 main，尚未部署。** 后续工作是继续按用户反馈精修和补内容，不是重新选型或重做。

> 如果你在 GitHub 上看不到 `meiyuanGroup` 分支或最近的提交，说明分支还没 push。请让用户 push，不要从 main 上的旧版开始。

## 2. 背景与需求

- 原站（需替换的中文/旧版小组页）：https://mmlab-sigs.github.io/groups/agentic-and-embodied-large-model-training-group/
- 用户收到的原始需求（来自组内同学）：把小组页改成英文，优化 presentation（“审美好看”），加上新论文：GeoMIND、路荣伟师兄的 JSAC（即 DeCo-SGD 的期刊版）、SeekVLN、eVTA₀。
- 用户允许大改结构和视觉。技术栈已定：**Astro 7 + TypeScript + 手写 CSS**，不要重新选型。
- 本仓库 `duowuyms/duowuyms.github.io` 是 Duo Wu 的个人主页仓库（根目录是 Jekyll 个人站，另有 `evta0/`、`trailblazer/` 等项目页）。**小组站只在 `group/` 目录内**，不要改动仓库其他部分。
- 旧版小组页的 `group/index.html` 和 `group/images/` 仍保留作参考，新站不再引用它们。直接打开旧 `index.html` 看到的是旧站。

## 3. 必须遵守的工作规则

1. **只在 `meiyuanGroup` 分支工作。** 用户确认满意前不要合并 main、不要部署、不要 push 到别处。
2. **每完成并验证一轮修改就单独 commit 一次**（用户要求，便于版本回退）。commit 信息写清改了什么。
3. 不编造：不生成假的论文图、假照片、假链接、假数据或影响力数字。缺素材就用诚实的占位（例如论文的文字封面）。
4. 不因为某人出现在论文作者列表里就把他加进成员名单。成员名单只来自 `src/data/site.ts`（源自旧站）。
5. 不要把 IGen 的输入场景图（如茶具、梵高卧室）当作机器人生成结果展示。
6. 用户审美变化快，改动前先看清当前实现。**先描述再动手**：对大的视觉方向，先给 2–3 个选项或先做一版让用户看，不要一次推翻多处。

## 4. 本地运行与检查

```sh
cd group
npm ci                     # 默认镜像缺包时：npm ci --registry=https://registry.npmjs.org
export ASTRO_TELEMETRY_DISABLED=1
npm run dev -- --port 4321 # 打开 http://127.0.0.1:4321/group/
```

每轮提交前都要跑：

```sh
npm run check          # astro check，应为 0 errors / 0 warnings
npm run format:check   # Prettier；不通过就 npx prettier --write <文件>
npm run build          # 默认 base /group/，应构建 4 页
npm run verify:links   # 检查 dist 内所有内部链接、锚点、媒体
# 生产 base 也要验证（注意 verify:links 也必须带 GROUP_BASE_PATH）：
GROUP_SITE_URL=https://mmlab-sigs.github.io \
GROUP_BASE_PATH=/groups/agentic-and-embodied-large-model-training-group/ \
sh -c 'npm run build && npm run verify:links'
npm run build          # 最后恢复默认 base 的 dist
```

- Node ≥ 22.23.4（用过 24.3）；Astro 7.4.2。
- 最近一次全部通过：4 页，两种 base 各 102 个链接/媒体目标。
- 浏览器检查至少看桌面（1440px）和手机（375px），确认无页面横向滚动。

## 5. 当前网站结构

导航五项（顶部与页脚同一个 `navigation` 列表，`src/data/site.ts`）：**About us · Research Directions · Publications · Team · Join us**。只有 3 个内容路由 + 404：

| 路由                   | 内容                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/group/`（首页）      | 顶部白色导航（滚动时固定）→ 首屏 → 论文作品滚动带 → About us（`#about`）→ Research Directions（`#directions`，三个方向 `#agents` `#embodied` `#training`）→ 页脚 |
| `/group/publications/` | 论文档案：研究方向/年份筛选（URL 保存 `?topic=`/`?year=`），按年份分组                                                                                           |
| `/group/team/`         | 按角色分组的纯文字名单，页面底部是 Join us（`#join`，含 `#apply`、`#contact`）                                                                                   |

- 「Research Directions」导航跳到首页 `#directions`；「Join us」跳到 `team/#join`。之前独立的 Research Directions 页和 Join us 页都已按用户要求删除。
- 同一页面上有两个导航项时（首页的 About us 与 Research Directions，Team 页的 Team 与 Join us），`SiteLayout.astro` 里的 `syncSharedPage` 根据 URL hash 只高亮其中一个。

### 首页各部分

- **首屏**：居中标题 “Agentic and Embodied Large Model Training Group”（最大 62px，字重 550），副标题 “We build agents that reason, robots that learn, and systems that make large-scale training possible.”，两个紫色链接。背景是左右两侧极淡的紫/冰蓝光晕加稀疏平面细点（`.home-stage`），中间留白，静态无动画。
- **作品滚动带**（`SelectedWork.astro` + `src/scripts/selected-work.ts`）：全部 11 篇论文的已核实 Figure 1，约 19px/s 自动循环；悬停/聚焦/拖动/离开视野时暂停；可拖动和横向滚轮；减少动态效果时不自动滚。**按用户要求不要左右箭头、不要播放/暂停按钮、不要 “Research work” 标题和 “View all publications” 链接。**
- **About us**：大标题，左文右图（清华 SIGS 信息大楼官方照片，图下只写 “Tsinghua SIGS · Shenzhen”，用户要求去掉来源链接；来源记在 `public/media/about/README.md`）。
- **Research Directions**：参考 HKU MMLab（https://mmlab.hk/）的全宽左右交替行。每行一侧是论文完整图（图框背板分别为淡紫 `#eee8f3`、冰蓝 `#e7eef7`、淡青 `#e6f0ed`），另一侧白底文字：方向名、简介、三个子方向、右下 “Explore papers ›”（打开 Publications 对应筛选）。图：AI Agents = MobileGen Fig. 1，Embodied = IGen Fig. 6（真实机械臂实验），Training = Beyond a Single AI Cluster Fig. 1（来源见 `public/media/research-bands/README.md`）。
- **页脚**：大号 “MMLab @ SIGS” 字标，五个导航标题（悬停变紫），底部版权与 Back to top。

### Publications 页

- 每篇：左边论文 Figure 1（16:10 白底细边圆角框；手机端在上方），右边标题 → 作者（所有作者同样样式，用户要求不加粗组内成员）→ 斜体 venue 行（自动补年份，后跟研究方向小字）→ 一句简介 → 按钮。
- 按钮是学术主页风格的描边方形按钮：PAPER / PROJECT / CODE / ABSTRACT，大写小字，无箭头，悬停变紫。ABSTRACT 展开摘要；`<head>` 内联脚本给 `<html>` 加 `js` 类，无 JS 时摘要直接显示。
- 图片与首页滚动带共用 `src/data/selected-work.ts` 的 `paperFigures`。

### Team 页

- Team 使用两栏布局。左栏为标题、小组简介和导师，导师姓名与机构信息下方展示照片。右栏分博士生与硕士生两组，名单为纯文字。姓名统一为近黑色，有个人链接的姓名带细下划线，悬停变紫。窄屏上两栏上下排列，学生姓名每行两列。原头像素材留在 `public/media/team/`。
- Join us 用浅紫灰底（复用 `--agents-surface`），包含实心清华紫申请按钮和两位联系人的邮箱。

## 6. 设计系统要点（细节见 DESIGN.md）

- 字体：标准 **Inter**（`@fontsource-variable/inter` 自托管），与 HKU MMLab 一致。不要换 Inter Tight / Manrope / Source Sans 3。
- 颜色：白底、近黑文字 `#1d1d1f`、灰色次要文字；强调色为**清华紫 `#660874`**（悬停 `#4e0559`）。所有 token 在 `src/styles/global.css` 顶部 `:root`。
- 标题层级（最大值）：首页主标题 62px > 页面标题 58px > 分节标题（About us / Research Directions / Join us，`.section-title`）48px > 年份 38px > 方向行标题 36px。用户刚要求过「标题小一点」，不要再放大。
- 不用全大写小标签（eyebrow）、不用 “A · B · C” 中点串、不在链接后加 ↗。Publications 页直接显示标题，资源和摘要按钮采用浅灰描边。
- 无卡片投影、无玻璃效果、无渐变色块。
- 所有内部链接用 `src/lib/urls.ts` 的 `url()`，以适配 `/group/` 与生产子目录两种 base。

## 7. 用户试过并否定的方向（不要再提）

按时间顺序，括号内是可回看的 commit：

- 深色海景/风景大图首屏、toy 风格机器人/服务器插画、浅色风景 + 论文网格。
- 首屏下方一整张巨大图片；只突出一篇论文的首页。
- 滚动带的左右切换和 Pause/Play 按钮。
- 概念插图式的研究方向配图（文字板、Cluster A/B/C 方块图）。
- 浓紫、粉紫和廉价渐变。（后来用户主动选择清华紫作为点缀强调色，但不要大面积紫色。）
- **夜景首屏 + 黑白研究行**（`c2ba191`，已 revert）：用户觉得丑。
- **Apple 式白色大圆角卡片的研究方向**（`68238ad`）：用户要的是 HKU 式的全宽行。
- **紫/海军蓝/深绿色块 + 金色标题的研究行**（`6582439`）：用户觉得颜色丑。
- 研究行用第一版灰/炭黑配色（`30f3819`）后又被另一轮改成现在的淡色背板版本（`4de3915`、`e6ee07b`）。若用户再改，先问清楚要哪一版。
- 组内成员在作者列表中加粗；成员下方的 “Website” 字样；首页 “Large models as decision-makers” 段落和 “Build what comes next, with us.” 邀请段。

## 8. 内容事实（核实过的，勿随意改）

现有 11 篇论文（`src/data/publications.ts`）：IGen、GeoMIND、SeekVLN、eVTA₀、DeCo-SGD（JSAC）、MobileGen、Trailblazer、CoBel-World、CATP-LLM、Beyond a Single AI Cluster、NetLLM。

- **DeCo-SGD / JSAC**：用户确认标题 “Taming Latency and Bandwidth: A Theoretical Framework and Adaptive Algorithm for Communication-Constrained Training”，IEEE JSAC，arXiv 2507.17346。作者顺序依据 preprint，上线前核对期刊最终书目。它是更新已有条目，不要重复新增。
- **IGen**：CVPR 2026，arXiv 2512.01773，项目 https://chenghaogu.github.io/IGen/ 。
- **GeoMIND**：“A Benchmark for Spatial Understanding in Robotic Manipulation”，NeurIPS 2026。**没有已核实的论文/项目链接和配图**，所以无按钮、用文字封面。用户说在问学长，收到后补 `publications.ts` 的 links 和 `selected-work.ts` 的 `paperFigures`。
- **SeekVLN**：arXiv 2609.37353，项目 https://zhiminwangss.github.io/seekvln-project/ 。
- **eVTA₀**：arXiv 2609.33653，项目 https://duowuyms.github.io/evta0/ 。
- **Trailblazer**：arXiv 2512.11839，初版 2025、2026 更新，归在 2025，不要改成 2026 录用。
- 论文图均为从公开 PDF 按 Figure 1（或标注的图号）完整截取，不裁切内部；来源与页码见 `public/media/selected-work/README.md` 和 `public/media/research-bands/README.md`。
- 人名：是 **Zhimin Wang**，不是 Zhiming。导师 Prof. Zhi Wang（主页 http://zwang.inflexionlab.org/ 跳转到 https://mmlab-sigs.github.io/groups/zwang/ ）。
- 联系人：AI agents & embodied — Duo Wu `wu-d24@mails.tsinghua.edu.cn`；distributed training — Rongwei Lu `lurw24@mails.tsinghua.edu.cn`。招生链接是 `site.ts` 里的 Notion 页，保留 “first preference” 说明。
- 研究方向名目前是 AI Agents / Embodied Intelligence / Distributed Training。旧站叫 “Embodied VLA”“Distributed LM Training”，用户未决定是否改回，可问。子方向沿用旧站，其中 “World models for VLA training” 已改回旧站措辞。

## 9. 待办与开放问题

1. **GeoMIND** 链接与配图（见上）。
2. **Publications 页**：曾建议但尚未做——把筛选下拉改成可点击的胶囊；为 IGen、GeoMIND、SeekVLN、eVTA₀ 补摘要（可从 arXiv 原文逐字复制，GeoMIND 需等材料）；论文标题本身可链接到论文。
3. 上线前：真实手机/跨浏览器、读屏器、减少动态效果的浏览器内实测（目前只做了代码层面和桌面/375px 检查）。
4. **部署**：目标 URL 属于另一个仓库 `mmlab-sigs.github.io`，发布流程未建立。用上面的生产 base 构建后，把 `dist/` 的**内容**放进目标站对应子目录，并协调全站 404。不要把本仓库根站替换成 group 的 dist。需用户确认后再做。

## 10. 文件地图（都在 `group/` 下）

| 文件                                                                | 作用                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------ |
| `src/pages/index.astro`                                             | 首页：首屏、滚动带、About us、Research Directions 行         |
| `src/pages/publications.astro`                                      | 论文档案、筛选和摘要展开脚本                                 |
| `src/pages/team.astro`                                              | Team 与 Join us                                              |
| `src/layouts/SiteLayout.astro`                                      | `<head>`、固定导航、手机菜单、页脚、导航高亮脚本             |
| `src/components/SelectedWork.astro`, `src/scripts/selected-work.ts` | 滚动带结构与交互                                             |
| `src/components/AboutUs.astro`                                      | About us 段                                                  |
| `src/components/DirectionArt.astro`                                 | 研究行的论文图与说明                                         |
| `src/components/PublicationRow.astro`                               | 单篇论文                                                     |
| `src/components/MemberName.astro`                                   | 成员姓名与个人链接                                                 |
| `src/components/PageIntro.astro`                                    | 子页面大标题区                                               |
| `src/data/site.ts`                                                  | 机构信息、导师、导航、联系人、按角色分组的成员名单 |
| `src/data/publications.ts`, `abstracts.json`                        | 论文数据与旧站摘要                                           |
| `src/data/research.ts`                                              | 三个方向的标题、简介、子方向                                 |
| `src/data/selected-work.ts`                                         | 论文图映射 `paperFigures`、滚动带数据                        |
| `src/styles/global.css`                                             | 全部样式与设计 token                                         |
| `public/media/*/README.md`                                          | 每类素材的来源记录                                           |
| `scripts/verify-links.mjs`                                          | 构建产物链接检查（期望 ≥4 个页面）                           |

## 11. 踩过的坑

- **`html { scroll-behavior: smooth }` 会让从别的页面带 `#锚点` 打开时不跳转**（Chromium 实测）。现在只在 `html:focus-within` 时平滑滚动，不要改回去。
- 固定导航遮挡锚点：用 `--header-height` 驱动 `scroll-padding-top`（桌面 76px，≤800px 为 100px）。改导航高度要同步改。
- 用正则批量删 CSS 规则时，曾把 `.hero-links a, .work-heading a {…}` 这类合并选择器拆坏，导致别的元素继承了错误样式。删样式后要 `git diff` 检查合并选择器。
- `verify:links` 默认按 `/group/` 检查；验证生产 base 时也必须给它 `GROUP_BASE_PATH`，否则会误报 “escapes base”。
- 内置浏览器截图有时不随滚动更新，以 JS 读到的 `scrollY`/元素位置为准，或重新 navigate 后再截。
- 这条分支曾有两个 agent 同时提交（`4de3915`、`e6ee07b`、`98a751b` 来自另一会话）。开始工作前先 `git log` 看最新状态，不要假设本文件描述之外没有新改动。
