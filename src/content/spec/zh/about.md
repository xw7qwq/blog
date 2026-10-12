# 关于

:::note[关于本页]
本页由 AI 撰写：根据我的项目、仓库和网站配置整理成文。
:::

我是 [Lucius7](https://github.com/theLucius7)，喜欢算法、PT 站点和自托管。这个博客用来记题目复盘、工具改造，以及维护个人服务时踩过的坑，方便以后回头看。今年的比赛成绩、刷题数据和开源贡献整理在 [2026 年阶段记录](/zh/posts/2026-september-lab-notes/)里。

## 技术方向

主要做**后端开发、接口适配和自动化**，用 Python、Go 和 JavaScript / TypeScript，也会改前端、对接 API。部署用 Linux、Docker Compose、Caddy 和 systemd。

功能能跑起来之外，我比较在意三件事：状态是否一致，失败后怎么恢复，一次修改怎么验证。

我做的东西大多从自己的需要出发：搭算法训练环境，用 OpenCD，维护邮件和数据看板，把重复操作和不顺手的地方做成工具。

## 项目

下面这些项目大多基于开源软件，按自己的需要改造，介绍的是我维护和改动的部分。

### DMOJ：算法训练与评测

用 DMOJ 搭了自己的算法训练环境：

- 导入赛事题库，适配不同来源的 checker；
- 实现同进度排名（按相同的比赛用时比较）和受限附件访问；
- 接入 Windows 的特判程序，用到了 Wine、Unix socket 和独立容器。

### 邮件：Bulwark / Stalwart

为多域名邮件定制了归档规则、文件夹维护和 Passkey 登录。涉及 JMAP、Sieve、WebAuthn 和 TypeScript，也要处理凭据撤销、状态变化和请求失败的情况。

### FitBaus：数据同步与展示

在现有的 Fitbit 看板上加了缓存、日 / 周 / 月汇总、定时同步、中文界面，以及 JSON API 和 SVG 输出。需要处理重复同步、缓存失效和管理操作的权限边界。

### NeXus：网络服务门户

基于 EZ-Theme、Xboard 等开源项目改的个人网络服务门户，包括 Vue 页面、Go 写的同源中间层、流量统计和客户端配置兼容。前端做了按需加载、合并进行中的重复读取请求，并处理登录状态变化之后才返回的异步响应。

### PT 工具：OpenCD、PT Tools 与 qBittorrent

我在用 OpenCD。围绕日常做种和资源管理，改了 PT Tools 和 qBittorrent 的配套流程：

- 在后台刷新账户信息，不依赖浏览器；
- 添加任务前重新检查实际大小和剩余容量；
- 用 Python 守护进程检查任务是否完成、文件是否还在、tracker 是否已确认。

这些改动主要在处理并发任务、状态同步和异常。关键的判断逻辑单独拆出来，用 mock API 写测试。

## 关于这个网站

### 组成

本站源码和配套项目放在 [xw7qwq](https://github.com/xw7qwq) 组织下：

| 项目 | 作用 | 和本站的关系 |
| --- | --- | --- |
| [nfuwari](https://github.com/xw7qwq/nfuwari) | 基于 Astro / Fuwari 的博客 | 保存文章、生成页面，接入下面介绍的公开 API |
| [MacFlare](https://github.com/xw7qwq/macflare) | 采集并发布 Mac 的应用与音乐状态 | 为顶部导航提供应用图标和歌曲封面 |
| [OJFlare](https://github.com/xw7qwq/ojflare) | 汇总多平台提交、比赛进度与 Rating | 为左侧最近提交和本页的 AC 贡献图提供数据 |
| [CodeFlare](https://github.com/xw7qwq/codeflare) | 整理算法源码、模板与提交归档 | 提供独立的代码检索和源码阅读页面，供题解和复盘引用 |
| [.github](https://github.com/xw7qwq/.github) | 组织介绍、贡献指南与协作约定 | 统一各仓库的维护方式 |

### 发布流程

**Markdown → Astro 构建 → GitHub Pages → 阿里云 ESA → 浏览器**

文章以 Markdown 存在 nfuwari 里，中英文分开写。先在本地用草稿预览，提交到 GitHub 后通过检查、合入 `main`，再由 GitHub Actions 构建发布。

Astro 生成静态页面，Fuwari 是主题，KaTeX 渲染公式，Pagefind 在构建时生成搜索索引。GitHub Pages 托管构建结果，阿里云 ESA 为 `blog.lucius7.cn` 提供边缘分发和 HTTPS。写作和部署的细节见仓库里的[写作指南](https://github.com/xw7qwq/nfuwari/blob/main/docs/WRITING.md)和[部署指南](https://github.com/xw7qwq/nfuwari/blob/main/docs/DEPLOYMENT.md)。

### 中英文切换

**语言由网址前缀决定，默认中文。** 不按浏览器语言或 IP 自动选择，也不记住上次的选择。

| 访问地址 | 打开的内容 |
| --- | --- |
| `blog.lucius7.cn/` | 固定跳转到中文首页 `/zh/` |
| [/zh/](/zh/) | 中文界面、中文文章与中文搜索结果 |
| [/en/](/en/) | 英文界面、英文文章与英文搜索结果 |

顶部的「中文 / EN」按钮：

- **首页、关于、归档**：切到另一种语言的对应页面，例如 `/zh/about/` 切换到 `/en/about/`。
- **文章页**：有已发布的译文就打开译文，没有就进入目标语言的首页。中英文文章分别撰写。
- **分页与筛选**：切换后回到目标语言的首页或归档页，不保留页码、分类和标签筛选。

切换语言会完整加载目标页面，菜单、侧栏和搜索一起更新。不带语言前缀的根网址总是进入中文，想直接进英文可以收藏 [/en/](/en/)。旧的 `/about/` 和 `/archive/` 入口分别跳到中文的关于页和归档页。

### 页面上的动态数据

**MacFlare：应用与音乐。** Mac 上的原生采集程序记录当前应用和 Apple Music 状态，认证后上传到 Cloudflare Worker，存进 Workers KV。博客在浏览器里读取公开的 [`/api/now`](https://macflare.lucius7.dev/api/now) 和 [`/api/icons`](https://macflare.lucius7.dev/api/icons)，在标题旁显示应用图标，放歌时显示歌曲封面；悬停、聚焦或点击图标可以看到名称。显示的是最近一次公开的状态快照，过期或接口不可用时隐藏。API 和接入文档见 [MacFlare](https://macflare.lucius7.dev/)。

**OJFlare：最近提交与 AC 贡献图。** OJFlare 的同步任务从 Codeforces、AtCoder、QOJ 和牛客整理练习记录，生成公开的 [`dashboard.json`](https://ojflare.lucius7.dev/data/dashboard.json)。博客用它显示两处内容：

- **左侧最近提交**：按提交时间显示最近三条 Codeforces / AtCoder 的 AC 记录，点击直达原平台的提交页。同一题的多次 AC 会分别显示。
- **本页下方的 AC 贡献图**：按 UTC+8 统计已收集记录中每天首次 AC 的题数。同一题只算最早通过的那天，可以按年份和平台筛选。

两处共用一次数据请求，页面可见时定期刷新；数据有多新取决于 OJFlare 的同步和发布，实现见它的 [API 文档](https://github.com/xw7qwq/ojflare/blob/main/docs/API.md)。这些公开接口都在页面加载后才读取，所以文章的构建和阅读不依赖接口当时是否在线。

**CodeFlare：源码归档。** [CodeFlare](https://codeflare.lucius7.dev/) 按平台和目录展示代码，支持搜索和在线阅读。归档工具会借助 OJFlare 的题目、比赛和 AC 元数据来整理，再从能获取的来源补充提交信息和源码。仓库里也有模板、没写完的代码和没通过的尝试，所以文件数量不等于过题数。博客里的题解分析由我撰写，通过链接引用这里的代码；本站直接接入的数据 API 只有 MacFlare 和 OJFlare。

## 联系我

欢迎通过 [GitHub](https://github.com/theLucius7)、[B 站](https://space.bilibili.com/1814052279)、[X](https://x.com/theLucius7) 或邮件 [i@lucius7.dev](mailto:i@lucius7.dev) 联系我。网站和项目的问题，也可以提交到对应仓库的 Issues。
