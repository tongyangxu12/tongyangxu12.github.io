# Tongyang Xu — Personal Academic Homepage

Source of [tongyangxu12.github.io](https://tongyangxu12.github.io/), served by GitHub Pages.
Plain HTML + CSS + JavaScript — no framework and no build step (`.nojekyll` tells GitHub Pages to serve the files as they are).

## 结构

```
├── index.html               # 主页：顶栏 + 左栏个人信息 + About / News / Publications / Internships / Awards / Blog
├── assets/
│   ├── css/style.css        # 全部样式（顶部 :root 是浅色主题变量，[data-theme="dark"] 是深色主题变量）
│   └── js/main.js           # 深色模式切换、导航高亮、主页最新博客列表、“Last updated” 日期
├── blog/
│   ├── index.html           # 博客列表页 + 文章页（blog/?post=slug）
│   └── posts/
│       ├── index.json       # 博客目录（新的放最前面）
│       └── *.md             # 博客正文（Markdown）
├── images/
│   ├── profile.jpg          # 头像
│   ├── Cover.jpg            # 浏览器标签页图标的原图
│   ├── favicon-32.png       # 标签页图标（由 Cover.jpg 裁成正方形生成）
│   ├── favicon-192.png      # 高清图标 / 手机桌面图标
│   └── papers/              # 论文缩略图（论文框架图截图）
├── papers/                  # 论文录用稿 PDF（[PDF] 链接指向这里）
└── files/                   # CV 等文件
```

## 怎么更新内容

所有内容都在 `index.html` 里，每个板块上方都有一段 `TEMPLATE` 注释，照着复制一条改内容即可。

| 想做的事 | 改哪里 |
|---|---|
| 改个人信息、链接 | `index.html` 里 `<aside class="profile">`（`blog/index.html` 里也有一份，记得一起改） |
| 加 News | `#news` 里加一条 `<li><em>YYYY.MM</em>: ...</li>`，新的放最上面 |
| 加论文 | `#publications` 里按模板加一个 `.pub-item`；缩略图放 `images/papers/`，PDF 放 `papers/` |
| 加实习 / 奖项 | `#internships` / `#awards` 里加 `<li>` |
| 打开 Services 板块 | 删掉 `#services` 外面的注释，并在顶栏加上 `<a href="#services">Services</a>` |
| 改主题色 | `assets/css/style.css` 顶部的 `--accent`（深色主题在 `[data-theme="dark"]` 里） |

### 论文等级标签规则（每篇只标一个）

- CCF、JCR 只有一个 → 标有的那个
- 两个都有 → 标级别高的（CCF-A ≈ JCR Q1，CCF-B ≈ Q2，CCF-C ≈ Q3）
- 同一档 → 优先标 CCF
- CCF 用 `class="pub-rank rank-ccf"`，JCR 用 `class="pub-rank rank-jcr"`

链接顺序：`[PDF]`、`[Code]`，再加 `[DOI]`（没有 DOI 时用 `[arXiv]`）。

### 写博客

1. 在 `blog/posts/` 新建 `my-post.md`（第一行 `# 标题`，页面会自动用目录里的标题，不会重复显示）。
2. 在 `blog/posts/index.json` 最前面加一条：

```json
{
  "slug": "my-post",
  "title": "文章标题",
  "date": "2026-11-02",
  "excerpt": "一句话摘要"
}
```

`slug` 要和文件名（去掉 `.md`）一致。如果文章发在 CSDN / 知乎等平台，加一个 `"url": "https://..."` 字段即可，不需要 `.md` 文件。

主页 Blog 板块会自动显示最新 3 篇。

### "Last updated" 日期

页面底部显示到月份（如 `2026.11`），会自动读取**推送到 GitHub 上**的最近一次提交时间，所以本地预览时显示的是上一次推送的月份，推送后就会变成最新的。如果读取失败，就显示 HTML 里写的月份（`index.html` 和 `blog/index.html` 底部的 `<span id="last-updated">`），每次更新时顺手改一下即可。

## 本地预览

博客列表需要通过网页服务器打开（直接双击 `index.html` 时浏览器会拦截读取 `index.json`）：

```bash
python -m http.server 8000
# 然后打开 http://localhost:8000
```

## 发布

```bash
git add -A
git commit -m "Update homepage"
git push origin master
```

推送后等 1–2 分钟，刷新 https://tongyangxu12.github.io/ 即可看到更新。
