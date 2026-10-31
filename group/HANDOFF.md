# 小组网站改版交接（2026-10-30）

## 给接手 agent 的起点

用户已批准最新的浅色、居中标题、滚动作品展示带草案，并要求“实现一下这个，实现结束之后整理当前对话，准备交接给另一个 agent”。**该草案现已接入正式 Astro 源码，不再只是外部 mockup。** 最新补充要求：去掉滚动带的左右切换与 Pause/Play 按钮，已移除整个控制/状态栏。之后用户要求扩充到所有研究工作，并换用论文首图/总览图，已更新为 11 项完整图展示。 后续应在当前实现上继续精修，先听取用户反馈，不要重新启动框架选择或恢复早期方案。

仓库：`/Users/zhumeiyuan/Desktop/THUSIGS/duowuyms.github.io`。
当前分支：`meiyuanGroup`。用户要求只在此分支修改，只有用户觉得 OK 后才能合并 main。当前起始实现已提交为 **`2d03930`**（包含无按钮版本），尚未 push、merge 或部署。用户新增要求：**每轮修改完成并检查后都做一次 commit，便于版本管理**。切换分支、清理文件前先检查并保护工作区。原 `group/index.html`、`group/images/` 保留；不要以为直接打开旧 HTML 就能看到新版。

当前预览地址：`http://127.0.0.1:4321/group/`。本轮已启动开发服务器；若进程不在，按下方命令重启。源码与工具均在 `group/` 内，个人主页和其他论文项目网站没有改动。

## 原始目标与信息架构

原网站：https://mmlab-sigs.github.io/groups/agentic-and-embodied-large-model-training-group/ 。用户受托把小组页翻成英文、改善 presentation、增加新论文，可以大改结构和视觉，也接受 Vue 等框架。前面已讨论并确定 **Astro + TypeScript + 自定义 CSS**，无需重新选型。

五个栏目必须保留：**About us、Research Directions、Publications、Team、Join us**。首页本身对应 About us。其下用类似 HKU MMLab 校区介绍的一栏一栏内容介绍研究方向，点击进入对应研究方向页面/锚点，而不是只做一篇论文的宣传页。

三个方向：

1. AI Agents：工具使用、GUI 交互、多智能体协作。
2. Embodied Intelligence：VLA/RL、world models、空间理解。
3. Distributed Large-Model Training：跨数据中心、通信优化、压缩与可扩展训练。

NetLLM、Trailblazer 等相关 large-model decision-making 工作也要保留。保留原有基本介绍、团队名单、完整旧论文记录、招聘说明与联系方式；不要仅凭论文作者列表增添成员。

## 用户已确定的视觉偏好（后面的决定优先）

- 主要参考：https://mmlab.hk/ 。喜欢其大气字体和介绍行布局。用户明确要求同款字体；先前浏览器检查确认标准 **Inter**，现用 `@fontsource-variable/inter` 自托管。不要恢复 Inter Tight、Manrope 或 Source Sans 3。
- 曾要求清华紫及邻近色，但不喜欢浓紫、粉紫和廉价渐变。**最新决定是 Apple 风格的白底、黑灰文字、少量蓝色链接，不必坚持紫色。** 全站共享配色已同步为这一方向。
- 首屏标题必须是居中的 **Agentic and Embodied Large Model Training Group**；下面小字是 **We build agents that reason, robots that learn, and systems that make large-scale training possible.** 不要恢复 “Intelligence, into the world.”。
- 首屏要紧凑，图片区域窄一点，不要下面铺一整张巨大图片。拒绝了深色海景、toy 感机器人/服务器插画，之后也否定了普通浅色风景加论文网格的效果。
- 用户更喜欢真实 work/paper 的好看图片，体现研究；之前偏好 IGen，最新接受了多篇精选作品的小图滚动展示带。不得生成虚假的论文图或将 IGen 输入图标作机器人生成结果。
- 最新滚动带包含全部 11 项论文工作，优先完整论文首图/总览图，不再使用放大的局部裁切或场景照片。GeoMIND 尚缺已核实原图，暂用文字封面；用户回复正在问学长，这篇先不急。图片圆角，文字在图片下方，留白克制，不加厚重卡片边框、投影、玻璃效果或无依据的影响力统计。
- 首页以下仍保留三个研究介绍区域。本轮没有重新设计方向介绍的全部内容；可在收到用户反馈后继续优化其真实配图。

## 已实现内容

前面已建立独立 Astro 项目：五个内容页面 + 404、共享导航/footer、移动菜单、完整团队和招聘页、数据驱动论文档案、原七篇论文 abstracts、11 篇论文的 year/topic 筛选（URL 保留筛选状态、空结果、重置）。所有内部路径适配可配置 base。

本轮落地最新方案：

- 居中小组全名、较小副标题、研究方向和论文入口，替换旧的双栏口号与大幅 IGen 双图。
- 共享颜色改为白/黑灰/蓝色交互色，导航更紧凑；保留清晰的 Inter 排版。
- 新 `SelectedWork.astro` + `selected-work.ts` 脚本：约 19px/s 循环移动，鼠标/触控拖动、横向滚轮输入；按用户最新要求，不显示左右切换或 Pause/Play 按钮。
- 悬停、焦点进入、切换到后台和离开视野时暂停位移；拖动时暂停；悬停、焦点等条件消失后继续自动滚动。减少动态效果偏好下禁用自动位移。
- 所有原始项目保持键盘可访问；循环副本不进入 Tab 顺序或辅助技术阅读树。无 JavaScript 时为全部原始内容的原生横向列表，滚动条可用。
- 图片全在本地，有英文 alt、固定容器尺寸和来源说明。SeekVLN 真实 Go2 走廊图也加入 Publications 记录。
- 删除未再使用的 `HeroMedia.astro` 及旧 hero/video 样式；以前下载的视频仍保留于素材目录，但当前首页不加载。
- 更新 `DESIGN.md`、`README.md`、媒体来源说明，并新增此交接文档。

## 文件导航

| 文件                                                    | 职责                                                              |
| ------------------------------------------------------- | ----------------------------------------------------------------- |
| `group/src/pages/index.astro`                           | 首页，首屏、精选作品、About us、研究介绍行、加入入口              |
| `group/src/components/SelectedWork.astro`               | 精选作品语义结构和控制按钮                                        |
| `group/src/scripts/selected-work.ts`                    | 循环移动、悬停/焦点暂停、拖动、滚轮、可访问性增强                 |
| `group/src/data/selected-work.ts`                       | 全部作品、论文首图、alt、简短说明；名称/venue/link 从论文数据派生 |
| `group/src/styles/global.css`                           | 全站设计 token、排版、布局、滚动条、响应式和 gallery 样式         |
| `group/src/layouts/SiteLayout.astro`                    | 共享导航、移动菜单、metadata、字体、footer                        |
| `group/src/components/DirectionArt.astro`               | 三个方向的介绍媒体，后续可进一步精修                              |
| `group/src/pages/publications.astro`                    | 论文档案与筛选交互                                                |
| `group/src/components/PublicationRow.astro`             | 完整论文记录组件                                                  |
| `group/src/data/publications.ts`                        | 11 篇论文的正式信息                                               |
| `group/src/data/abstracts.json`                         | 原七篇论文摘要                                                    |
| `group/src/data/research.ts`                            | 方向介绍及相关论文 ID                                             |
| `group/src/data/site.ts`                                | 机构信息、导师、成员、导航、联系方式                              |
| `group/src/pages/team.astro`, `join.astro`, `404.astro` | 其他页面                                                          |
| `group/public/media/selected-work/`                     | 新封面，含来源 README                                             |
| `group/public/media/igen/`                              | IGen 原项目图片和保留的视频                                       |
| `group/astro.config.mjs`, `src/lib/urls.ts`             | base/site 与路径处理                                              |
| `group/scripts/verify-links.mjs`                        | 构建结果中的内部链接和媒体路径检查                                |
| `group/DESIGN.md`                                       | 最新、已批准且已实现的设计约定；以此为准                          |
| `group/README.md`                                       | 开发、内容维护、部署、素材来源                                    |
| `group/premium-audit.json`                              | 本轮静态审计结果，0 findings                                      |

## 论文与内容注意事项

现有 11 篇：IGen、GeoMIND、SeekVLN、eVTA₀、DeCo-SGD、MobileGen、Trailblazer、CoBel-World、CATP-LLM、Beyond a Single AI Cluster、NetLLM。新增四篇为 IGen、GeoMIND、SeekVLN、eVTA₀；JSAC 是更新现有 DeCo-SGD，**不要重复新增**。

- 用户确认路荣伟师兄 JSAC 标题：**Taming Latency and Bandwidth: A Theoretical Framework and Adaptive Algorithm for Communication-Constrained Training**（DeCo-SGD，arXiv 2507.17346）。当前作者顺序依据 preprint，正式期刊版本可能不同；上线前核对最终期刊书目。
- IGen：**Scalable Data Generation for Robot Learning from Open-World Images**，CVPR 2026，arXiv 2512.01773，项目 https://chenghaogu.github.io/IGen/ 。封面茶具图是输入图。
- GeoMIND：**A Benchmark for Spatial Understanding in Robotic Manipulation**，目前按已有本地资料列 NeurIPS 2026。没有确认到 paper/project URL，因此未编造链接；可向用户补齐或继续核对。
- SeekVLN：**Seek Before You Move: Evidence Seeking for Progress Grounding in Vision-Language Navigation**，arXiv 2609.37353，项目 https://zhiminwangss.github.io/seekvln-project/ 。封面来源 GitHub `ZhiminWangSS/seekvln-project/assets/robot-seek.webp`。
- eVTA₀：**Demonstration-Free Success-Probability Reward Learning for Generalist Robot Policies**，arXiv 2609.33653，项目 https://duowuyms.github.io/evta0/ 。不是用户偏好的首页大封面，但档案中保留。
- Trailblazer：**Grounding Large Language Models as Generalizable Policies in Network Control**，arXiv 2512.11839；初版年份 2025，2026 更新，不要简单改成 2026 接收论文。
- 名字是 **Zhimin Wang**，不是 Zhiming Wang。成员 roster 源自旧页面，不因论文新增作者自动扩充。
- 导师 Prof. Zhi Wang；agent/embodied 联系 `wu-d24@mails.tsinghua.edu.cn`，training 联系 `lurw24@mails.tsinghua.edu.cn`。原 Notion 招生链接和 first-preference group 说明保留。

## 验证与运行

本轮执行：

- `npm run check`：20 个文件，0 errors / 0 warnings / 0 hints。
- `npm run build`：默认 `/group/` 和目标生产 base 都成功，各 6 页；最后恢复默认 `/group/` 的 dist。
- `npm run verify:links`：两种 base 均通过，105 个内部链接/媒体目标。
- `npm run format:check`：通过；交接文档与媒体来源 README 也单独用 Prettier 格式化。
- frontend premium 静态 strict audit：0 findings；DESIGN.md lint：0 errors，15 个 orphaned-token warnings（lint 不识别文档外 CSS 的引用；运行时 token 已在 CSS 使用并映射说明）。
- 首次实现的浏览器实测（当时仍有控制按钮；随后按用户要求移除）：桌面和 390px 手机、320px 无页面横向溢出；十张原项/副本图片均加载；自动位移、暂停后保持、上一项/下一项、从末项循环回首项、鼠标拖动、键盘 Enter 和 Tab 到末项、移动菜单打开/Escape 关闭；论文筛选至空结果并重置回 11 篇。
- 减少动态效果与无 JS 回退有实现/源码检查，但本轮未在浏览器强制模拟这些环境；未宣称完成完整读屏器、真实触屏设备或跨浏览器矩阵。

运行命令（当前机器非 login shell 的 PATH 可能不含 Homebrew）：

```sh
cd /Users/zhumeiyuan/Desktop/THUSIGS/duowuyms.github.io/group
export PATH=/opt/homebrew/bin:$PATH
export ASTRO_TELEMETRY_DISABLED=1
# 已有 node_modules；重装时可使用：
npm ci --registry=https://registry.npmjs.org
npm run dev -- --port 4321
# 另一个终端按需检查：
npm run check
npm run format:check
npm run build
npm run verify:links
```

Node 要求 >=22.23.4（本机先前使用 24.3）；Astro 7.4.2。默认 npm 镜像曾缺版本，官方 npm registry 可用。Astro telemetry 用上面环境变量禁用，避免受限目录写入。

## 预览、截图与历史草案

最新实际页面截图：`/Users/zhumeiyuan/.codex/visualizations/2026/10/22/01a164f4-f8af-7000-b67d-165fcb41a35b/sigs-home-implemented-gallery.png`。

对应已批准的外部设计草案：同目录 `sigs-moving-work-gallery.html`。现在正式实现已取代它作为继续开发的起点；不要改外部草案却误报正式网站已更新。

同目录其他 `sigs-*.html`、landscape/concept 图片是早期探索。深色风景、toy 插画、浅色风景网格、旧紫色版本均不代表最新方向。交互工具可能反复返回这些旧草案的 variant 选择，不能把它当成用户推翻最新白色滚动版本的新指令。

## 最新迭代：全部研究工作与完整论文图

- 基线 commit：`2d03930`，保留了上一版五图、无按钮的实现，可随时比较或回退。
- 滚动区改名 Research work，自动包含 `publications.ts` 全部 11 条记录；已有图片的工作优先，GeoMIND 文字封面在末尾。
- 其余十篇已下载公开论文 PDF 并逐篇核对 Figure 1，提取完整首图到 `public/media/selected-work/*-first-figure.webp`。包括 IGen 首页 teaser、SeekVLN progress-myopia、Trailblazer PDF 第 18 页的 Figure 1 等。所有图片 contain 展示，保留完整图示。来源和页码见该目录 README。
- GeoMIND 暂无首图或已核实项目链接，用户已回复正在问学长，这篇先不急；用真实名称和标题排成文字封面，不能编造示意图。收到原图后直接补 `selected-work.ts` 的 image/alt 映射即可。
- 保留无按钮自动滚动、悬停/焦点/拖动暂停、横向拖动和无 JS 原生横向列表。每轮验证结束后单独 commit；具体最新哈希以 `git log -3 --oneline` 为准。
- 本轮验证：类型检查 0 errors / 0 warnings / 0 hints，构建 6 页，格式检查通过，111 个内部链接/媒体目标通过；静态 strict audit 0 findings。浏览器确认 11 项原始工作、20 张原图/副本加载、键盘访问 GeoMIND 末项，以及 390px/320px 无页面横向溢出。当前最新截图：`/Users/zhumeiyuan/.codex/visualizations/2026/10/22/01a164f4-f8af-7000-b67d-165fcb41a35b/sigs-work-all-paper-figures.png`。

## 后续待办与边界

最新 About us 迭代：用户要求参照旧小组网站及 self-evolving embodied agents 小组，完善介绍，并询问校园图与原 AI 合照的选择。已重写为“团队身份/导师 → 预训练模型能力 → 三个相连研究方向”，保留原研究范围，未套用另一组的独特研究愿景或招生类别。新组件 `src/components/AboutUs.astro` 左文右图，链接三个方向和 Team；移动端文字在前、图片在后。当前推荐并实现的是学院官方图库的深圳信息大楼照片，蓝天、白色建筑、绿树，与浅色版式协调，图片下有来源链接。AI 合照更适合未来 Team/小组生活区域，尚未移入新版；校园图的最终偏好仍可根据用户反馈调整。原图与来源记录在 `public/media/about/`。本轮按用户要求在验证后单独 commit。

About us 验证：21 个文件类型检查 0 errors / 0 warnings / 0 hints，构建 6 页，116 个内部链接/媒体目标通过，格式与 diff 检查通过。浏览器确认原图 799×533 正常加载、研究链接进入正确锚点、390px/320px 没有页面横向溢出；桌面/手机版式已查看。截图：`/Users/zhumeiyuan/.codex/visualizations/2026/10/22/01a164f4-f8af-7000-b67d-165fcb41a35b/sigs-about-campus.png`。

最新研究方向行迭代：三条研究介绍行的右侧媒体原为概念插图（“Plan / Use tools / Collaborate” 文字板、蓝色 Cluster A/B/C 方块图）和 IGen 茶具输入图，已全部换成真实研究素材：AI Agents 用 CoBel-World Figure 1，Embodied 用 SeekVLN 的真实 Unitree Go2 走廊照片，Distributed Training 用 DeCo-SGD（JSAC）Figure 1。论文图白底、14px 圆角、contain 不裁切；机器人照片 cover 裁切并保留机器人。图下有说明文字，再接该方向论文列表（名称 + venue，链接到 `publications/#<id>` 锚点），数据来自 `research.ts` 与 `publications.ts`，新增论文 ID 后自动出现。旧的 agent-art/system-art/cluster 样式已删除。

本轮验证：类型检查 0 errors / 0 warnings / 0 hints，格式检查通过，构建 6 页，`/group/` 与生产 base 各 127 个内部链接/媒体目标通过（注意：生产 base 验证时 `verify:links` 也需带 `GROUP_BASE_PATH`）。浏览器确认桌面三条行版式、375px 手机无横向溢出、三张图均加载、9 个论文锚点链接正确。

最新首页美化迭代（用户要求“加一点背景，更好看”，并换更好看的论文图）：

- 首屏与 Research work 滚动带共用 `.home-stage` 背景：标题后方一道柔和的“地平线”光（蓝色为主，极淡清华紫），以及透视倾斜的点阵地面，滚动带的作品像站在这片地面上。静态无动画（滚动带仍是唯一动态），两侧和底部渐隐，手机端点更小更淡，forced-colors 下隐藏。没有使用大图、深色背景或浓重渐变。
- 研究方向行换成从论文 PDF 提取的完整高清图（1800px WebP，`public/media/research-bands/`，来源与页码见其 README）：AI Agents = MobileGen Figure 1，Embodied = IGen Figure 6 真实机械臂实验，Distributed Training = Beyond a Single AI Cluster Figure 1。媒体列加宽到约 59%。SeekVLN 机器人照片、CoBel/DeCo 首图不再用于方向行，但文件保留。
- 验证：类型检查 0 errors，构建 6 页，两种 base 各 127 个链接/媒体通过；浏览器检查桌面、320px 无横向溢出、三张图加载、手机端单列。

最新补充：用户提供旧网站“研究方向”卡片截图，要求把其信息放进新版。旧卡片中的子方向已在 `research.ts` 的 topics 中；现首页三条研究行也在简介与 Explore 链接之间显示这三项子方向（数据来自 `research.ts`）。“World models for robot learning” 改回旧站措辞 “World models for VLA training”。旧站方向名 “Embodied VLA”“Distributed LM Training” 暂未采用，仍为 Embodied Intelligence / Distributed Training，可待组内确认。中文名按英文化要求不加入。

最新结构调整：用户认为首页研究介绍 + Publications 已足够，删除独立的 Research Directions 页面（`research.astro`）。导航仍保留 “Research Directions” 五个栏目之一，但跳到首页 `#directions`；三条研究行加 `id`（agents/embodied/training），About us 内链指向这些锚点；每行链接改为 “See … papers”，打开 `publications/?topic=<id>` 筛选。原页面独有的 “Large models as decision-makers”（NetLLM、Trailblazer）移到首页研究行之后。原页面的长描述和 “Questions we explore” 已从 `research.ts` 删除（git 历史可找回）。现为 4 个内容页 + 404，`verify-links` 下限改为 5 页；两种 base 各 104 个链接/媒体通过。

最新：用户要求滚动时顶部导航一直显示。`.site-header` 改为 sticky（白底、底部细线、无阴影，z-index 20，跳转链接 z-index 30）；`--header-height`（桌面 76px，≤800px 为 100px）用于 `scroll-padding-top`，锚点不会被遮挡。手机端无 JS 时不固定（完整导航太高）。已在桌面和 375px 检查：滚动后导航固定在顶部，`#embodied`、`#seekvln` 锚点落在导航下方，手机菜单在固定导航内展开/关闭正常。

最新：用户认为首页底部 “Large models as decision-makers” 与 “Join our group / Build what comes next” 两段不需要，已删除；改为参照 HKU MMLab 的页脚：大号 MMLab @ SIGS 字标，四栏站点地图（About us / Research / Publications / Contact，粗体栏目名），底部版权 + 机构 + Back to top。NetLLM、Trailblazer 通过 Publications 和页脚 “Decision-making”（`publications/?topic=decision`）保留入口；Join us 在导航和页脚。≥800px 四栏，以下两栏。未加入机构 logo 行（没有核实过的 logo 文件）。

最新：用户要求页脚内容与顶部导航对应。页脚栏目现由同一个 `navigation` 列表生成（About us / Research Directions / Publications / Team / Join us，顺序名称一致），每栏列出对应页面的分区：About us（#about、#work）、三个研究方向锚点、Publications（全部、Decision-making 筛选）、Team（新增 `team/#advisor`、`#phd`、`#masters`，id 在 `site.ts` 的 team 数据中）、Join us（新增 `join/#apply`、`#contact`，以及两位联系人邮箱）。同时修复一个既有问题：`html { scroll-behavior: smooth }` 会导致从其他页面带 `#锚点` 打开时不跳转（已用最小测试页确认），改为仅 `html:focus-within` 时平滑滚动；`team/#masters`、`publications/#seekvln` 现在能正确落在导航下方。5 栏 ≥1100px，3 栏到 800px，以下 2 栏。

最新：按用户要求页脚改为三栏：About us（Our group、Team、Join us），Research Directions（三个方向，不变），Publications（只保留标题链接）。所有标题和条目都可点击，鼠标悬停变为蓝色（0.15s 过渡，无下划线），字标和 Back to top 同样。联系人邮箱不再放在页脚（Join us 页有）。Team/Join 页上的 #advisor、#phd、#masters、#apply、#contact 锚点保留，可用于分享链接。

1. 请用户查看当前正式实现，依据反馈继续精修。背景强度可在 `global.css` 的 `--lattice`、`--horizon-*` 和 `.home-stage::after` 的 transform 调整；方向行图片在 `DirectionArt.astro` 的 media 映射中替换。不要自行恢复巨大背景图或概念插图。
2. 补齐 GeoMIND 的正式 paper/project 链接，核对 JSAC 最终书目信息；必要时核对成员姓名与最新录用状态。不要编造链接或新增未确认成员。
3. 如进入发布准备，补充真实设备/跨浏览器、减少动态效果与读屏器检查。保持现有基础可访问性和无 JS 内容。
4. 可继续在 `meiyuanGroup` 分支开发；**用户确认后**才能合并 main 或发布。基线已 commit；后续每轮完成后也需 commit。本次未 push、merge 或部署。
5. 目标 URL 属于另一个 MMLab 仓库，部署流程尚未建立。当前个人仓库还有 Jekyll/个人主页，不可把仓库根站替换成 group 的 dist。

目标构建：

```sh
GROUP_SITE_URL=https://mmlab-sigs.github.io \
GROUP_BASE_PATH=/groups/agentic-and-embodied-large-model-training-group/ \
npm run build
```

把 `dist/` 的**内容**整合到目标站对应子目录；dist 不会自行带上 base 目录层级。保留其他组和站点内容。没有新增自动部署 workflow；先确认目标仓库发布机制和全站 404 处理。
