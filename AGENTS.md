# AGENTS.md — 给 AI agent 的项目说明

这是 Tongyang Xu（徐烔炀）的个人学术主页。任何 AI agent 在修改本仓库前请先读完本文件；面向人的操作说明见 `README.md`。

## 1. 项目概况

- 线上地址：https://tongyangxu12.github.io/ ，仓库 `tongyangxu12/tongyangxu12.github.io`，分支 `master`，GitHub Pages 直接托管仓库根目录。
- **纯静态站：HTML + CSS + 原生 JS，没有框架、没有构建步骤、没有依赖。** 不要引入 npm、打包工具或静态站生成器，除非用户明确要求。
- `.nojekyll` 让 GitHub Pages 跳过 Jekyll，所以 `_config.yml` **不起作用**（历史遗留），不要据此把项目当成 Jekyll 项目。
- 网站内容用**英文**；用户和 agent 交流用**中文**。

## 2. 文件地图

| 文件 | 作用 |
|---|---|
| `index.html` | 主页全部内容（各板块上方有 `TEMPLATE` 注释） |
| `assets/css/style.css` | 全部样式；`:root` 为浅色主题变量，`[data-theme="dark"]` 为深色主题变量 |
| `assets/js/main.js` | 深色模式切换（存 localStorage）、导航高亮、主页最新 3 篇博客、底部 Last updated |
| `blog/index.html` | 博客列表页 + 文章页（`blog/?post=slug`），内置简易 Markdown 渲染器 |
| `blog/posts/index.json` | 博客目录（新的在最前）；`blog/posts/*.md` 为正文 |
| `images/profile.jpg` | 左栏头像 |
| `images/Cover.jpg` | 浏览器标签页图标原图；`favicon-32.png` / `favicon-192.png` 由它以两人脸部为中心裁成正方形生成 |
| `images/papers/*.png` | 论文缩略图 |
| `papers/*.pdf` | 论文录用稿（[PDF] 链接指向这里） |
| `files/徐烔炀-CV.pdf` | CV（中文，含手机号，用户已确认可以公开） |

## 3. 设计（用户已定稿，不要擅自改风格）

- 组合方式：al-folio 风格顶栏 + minimal-light 风格左栏 + AcadHomepage 风格 News / Publications。
- 顶栏：左侧 `<b>Tongyang</b> Xu`；右侧导航**首字母大写**：About · News · Publications · Education · Internships · Awards · Blog，加深色模式按钮。
- 左栏：112px 圆角头像、英文名、中文名、`M.S. Student` / 学院 / 学校、邮箱、Google Scholar、GitHub、CV。**不公开微信。**
- 正文板块顺序：About（无标题，三段）→ News → Publications → Education → Internships → Honors and Awards → Blog。
- 章节标题：Source Serif 4 衬线粗体，**纯文字，不加 emoji，不加下划线**。正文字体 Roboto，主题色 `--accent: #1f5fbf`。
- Research Interests 板块是用户**主动删除**的（研究兴趣已写在 About 第二段），不要加回来。
- Services 板块暂时隐藏（在 `index.html` 里以注释保留）；用户有审稿经历后再启用，并在顶栏加 `Services` 链接。
- 页面底部**只有** `Last updated: YYYY.MM`（只到月份），没有 copyright。
- 浏览器标签页标题：主页 `Tongyang Xu`；博客页 `Blog | Tongyang Xu`。

## 4. 内容格式规则

**News**（新的在最上面，日期只到月份）：
```html
<li><em>2026.10</em>: 🎉 Our paper "Full Paper Title" is accepted by <b>TDSC'2026</b>!</li>
<li><em>2026.06</em>: I joined <b>Company</b> as a research intern.</li>
```

**Publications**（新的在最前，完整模板见 `index.html` 注释）：
- 缩略图：从论文中截取**框架图 / overview 图**，约 1000px 宽 PNG，放 `images/papers/`；显示在 2:1 白底框里，左上角标签写 `ABBR YEAR`（如 `TDSC 2026`）。
- 标题链接到 DOI。作者写全名，本人 `<b>Tongyang Xu</b>`，共同一作标 `#`，通讯作者标 `*`（与作者名之间无空格）。
- 期刊/会议行加粗，格式为 `Full Venue Name YEAR (ABBR YEAR)`，括号部分包在 `<span class="nowrap">` 里。
- **等级标签每篇只标一个**：CCF、JCR 只有一个就标那个；两个都有标级别高的（CCF-A ≈ JCR Q1，CCF-B ≈ Q2，CCF-C ≈ Q3）；同一档优先 CCF。CCF 用 `pub-rank rank-ccf`，JCR 用 `pub-rank rank-jcr`。分区以最新 JCR 为准，拿不准时先问用户。
- 链接：`[PDF] [Code] [DOI]`；没有 DOI 时用 `[arXiv]`。**不写一句话简介。**
- **PDF 只放作者录用稿（accepted manuscript，作者自己的 LaTeX 版）**。不要放从 IEEE Xplore / ScienceDirect 下载的出版社排版版本（页脚有 "Authorized licensed use…" 或期刊页眉的那种），出版社不允许公开转载。

**Education**：`<li><em>YYYY.MM - YYYY.MM</em>, School, University, Degree.</li>`（Degree 写 `Master` / `Bachelor`；未毕业也写预计毕业年月，不加 "Expected"）

**Internships**：`<li><em>YYYY.MM - YYYY.MM</em>, Position, Department, Company, China.</li>`

**Honors and Awards**：`<li><em>YYYY.MM</em>, Award Name, Awarding Institution.</li>`

**Blog**：
1. 新建 `blog/posts/<slug>.md`（第一行 `# 标题`，渲染时会自动隐藏与目录标题相同的这一行）。
2. 在 `blog/posts/index.json` **最前面**加 `{"slug", "title", "date": "YYYY-MM-DD", "excerpt"}`；`slug` 与文件名一致；注意 JSON 逗号，格式错误会导致博客列表整体加载失败。
3. 外部平台（CSDN、知乎等）的文章：只在 `index.json` 加一条并带 `"url"`，不需要 `.md`。不要放飞书链接（私人文档，访客打不开）。
4. 文章配图放 `blog/images/`，正文里写 `![说明](images/xxx.png)`。
5. 渲染器支持：标题、段落、粗体、斜体、行内代码、代码块、链接、图片、无序/有序列表、引用、分隔线。**不支持表格、数学公式、嵌套列表**；需要时改 `blog/index.html` 里的 `renderMarkdown`。

## 5. 改动时必须同步的地方

- 左栏个人信息和顶栏导航**在 `index.html` 和 `blog/index.html` 里各有一份**，改一处必须同步另一处（博客页链接用 `../` 前缀）。
- 新增/删除主页板块时，同步顶栏导航链接。
- 两个页面底部 `<span id="last-updated">` 里的静态月份是兜底值，每次更新时改成当前月份（`YYYY.MM`）。JS 会读取 GitHub 上**最近一次已推送提交**的月份覆盖它，所以本地预览显示的是上次推送的月份，属正常。
- 结构有变化时更新 `README.md` 和本文件。

## 6. 已确认的个人信息（不要写错）

- 姓名：Tongyang Xu / 徐烔炀；身份 `M.S. Student`。
- 硕士：School of Cyber Science and Engineering, Southeast University, Nanjing，2024.09 - 2027.06；导师 Associate Professor Ju Jia（https://cyber.seu.edu.cn/jj/list.htm）。
- 本科：**B.S.**（理学学士，不是 B.E.）in Data Science and Big Data Technology，College of Computer and Control Engineering, Northeast Forestry University，2020.09 - 2024.06。
- 研究方向：AI for Software Engineering (AI4SE), LLM Agents, Software Security。
- 联系方式：xuty1218@163.com；Google Scholar https://scholar.google.com/citations?user=2Sh96roAAAAJ ；GitHub https://github.com/tongyangxu12 。

## 7. 验证与发布

- 本地预览：在仓库根目录运行 `python -m http.server 8000`，打开 http://localhost:8000 。直接双击 `index.html` 时博客列表无法加载（浏览器拦截 fetch）。
- 改完后至少检查：桌面宽度、手机宽度（约 390px，左栏会叠到正文上方）、深色模式、博客列表页和文章页。
- 提交信息用英文祈使句（如 `Add news: ...`、`Fix ...`）。**只有用户要求时才提交或推送。**
- 推送由用户在自己电脑上运行 `git push origin master`。偶尔会出现 `Connection was reset` 之类的报错，但其实已经推送成功；用 `git status` / `git fetch` 或 `git ls-remote` 核对远程 `master` 的提交号。
- Google Fonts 以非阻塞方式加载，国内无法访问时自动回退系统字体，不影响页面显示。
