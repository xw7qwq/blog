# About

:::note[About this page]
This page was written by AI, based on my projects, repositories, and site configuration.
:::

I'm [Lucius7](https://github.com/theLucius7). I enjoy algorithms, private trackers, and self-hosting. This blog collects problem write-ups, tool customizations, and lessons from running my own services, so I can come back to them later. My 2026 competition results, practice data, and open-source contributions are summarized in a [progress record (in Chinese)](/zh/posts/2026-september-lab-notes/).

## Technical focus

I mainly work on **backend development, API integration, and automation**, using Python, Go, and JavaScript / TypeScript. I also change frontends and connect APIs, and deploy with Linux, Docker Compose, Caddy, and systemd.

Beyond getting features to work, I care about three things: whether state stays consistent, how to recover from failures, and how to verify a change.

Most of what I build starts from my own needs: an algorithm practice environment, OpenCD, email, data dashboards, and small tools for repetitive or awkward tasks.

## Projects

Most of these projects build on open-source software, run on my own VPS, and are adapted to my needs. The descriptions cover the parts I maintain and change.

### DMOJ: algorithm practice and judging

My algorithm practice environment runs on [DMOJ](https://github.com/DMOJ/site). The deployment includes the site, background workers, the bridge, judges, a database, and a cache, plus a PDF service and an adapter service for HDU special judges.

- Import contest problem sets and adapt checkers from different sources. Migrating a problem means aligning I/O conventions, checker behavior, the compiler environment, and scoring rules;
- Change contest scoring, ranking visibility, and the submission page, and add rankings at equal elapsed contest time and restricted attachment access;
- Integrate HDU special judges; running Windows special judges uses Wine, Unix sockets, and a separate container.

### Email: Stalwart / Bulwark

Stalwart runs the mail server and [Bulwark Webmail](https://github.com/bulwarkmail/webmail) the web client. For mail across multiple domains, I customized filing rules, per-domain folders, and Passkey login, working with JMAP, Sieve, WebAuthn, and TypeScript.

These changes cover the interface, authentication, and protocol together: how folders in the interface map to the server, how login state carries over to later requests, and what happens when credentials are revoked, state changes, or a request fails.

### FitBaus: data synchronization and presentation

On top of an existing Fitbit dashboard, I added caching, daily / weekly / monthly summaries, scheduled synchronization, a Chinese interface, and read-only JSON API and SVG output. The work involves overlapping sync jobs, cache invalidation, and access control for administrative actions.

### NeXus: network service portal

A personal network service portal built from open-source projects including EZ-Theme and Xboard. It consists of a Vue frontend, a same-origin middle layer written in Go, and an existing backend. The middle layer maps browser actions to backend APIs, and the frontend shows features according to what the APIs actually support. I also added traffic statistics and client configuration compatibility.

On the frontend, I added lazy loading, shared in-flight read requests, and handling for asynchronous responses that arrive after login state changes. The API compatibility changes were contributed back to EZ-Theme.

### Private tracker tools: OpenCD, PT Tools, and qBittorrent

I use OpenCD. For everyday seeding and resource management, I changed the workflows around PT Tools and qBittorrent:

- Refresh account information in the background, without a browser;
- Recheck the actual size and free capacity before adding a task;
- Use a Python guard to check whether tasks have finished, files still exist, and trackers have acknowledged them.

The changes mostly deal with concurrent tasks, state synchronization, and failures. Key decisions are separated into logic tested against mock APIs.

## About this site

### Components

The site's source and supporting projects live in the [xw7qwq](https://github.com/xw7qwq) organization:

| Project | Purpose | Role on this site |
| --- | --- | --- |
| [blog](https://github.com/xw7qwq/blog) | An Astro / Fuwari blog | Stores articles, builds pages, and integrates the public APIs described below |
| [MacFlare](https://github.com/xw7qwq/macflare) | Publishes Mac application and music activity | Supplies the app icon and track artwork in the top navigation |
| [OJFlare](https://github.com/xw7qwq/oj) | Collects submissions, contest progress, and ratings | Supplies recent submissions and this page's AC contribution calendar |
| [CodeFlare](https://github.com/xw7qwq/solutions) | Archives solutions, templates, and submission records | Provides a separate searchable source browser that write-ups link to |
| [.github](https://github.com/xw7qwq/.github) | Organization profile and shared guidelines | Documents how the repositories are maintained |

### Publishing

**Markdown → Astro build → GitHub Pages → Alibaba Cloud ESA → your browser**

Articles are Markdown files in the blog repository, with Chinese and English written separately. I preview drafts locally, push to GitHub, and merge into `main` after checks pass. GitHub Actions then builds and publishes the site.

Astro generates static pages, Fuwari provides the theme, KaTeX renders math, and Pagefind builds the search index at build time. GitHub Pages hosts the output, and Alibaba Cloud ESA provides edge delivery and HTTPS for `blog.lucius7.cn`. See the repository's [writing guide](https://github.com/xw7qwq/blog/blob/main/docs/WRITING.md) and [deployment guide](https://github.com/xw7qwq/blog/blob/main/docs/DEPLOYMENT.md) for details.

### Chinese and English

**The URL prefix sets the language, and Chinese is the default.** The site does not pick a language from your browser or IP address, and it does not remember your last choice.

| Address | What opens |
| --- | --- |
| `blog.lucius7.cn/` | Always redirects to the Chinese home page, `/zh/` |
| [/zh/](/zh/) | Chinese interface, articles, and search results |
| [/en/](/en/) | English interface, articles, and search results |

The **中文 / EN** buttons in the top navigation:

- **Home, About, and archive:** open the same page in the other language. For example, `/zh/about/` switches to `/en/about/`.
- **Articles:** open the published translation if there is one; otherwise, open the target language's home page. Articles and translations are written separately.
- **Pagination and filters:** return to the target language's home or archive page, without keeping page numbers, categories, or tag filters.

A language switch fully loads the destination page, so menus, sidebars, and search update together. The root URL always opens Chinese; bookmark [/en/](/en/) to go straight to English. The legacy `/about/` and `/archive/` entry points redirect to the Chinese About and archive pages.

### Live data on the page

**MacFlare: apps and music.** A native collector on my Mac records the current app and Apple Music activity and sends authenticated updates to a Cloudflare Worker, which stores them in Workers KV. Your browser reads the public [`/api/now`](https://macflare.lucius7.dev/api/now) and [`/api/icons`](https://macflare.lucius7.dev/api/icons) endpoints to show an app icon beside the site title, plus track artwork while music is playing. Hover, focus, or tap an icon to see its name. These are the most recently published snapshots; they disappear when the state expires or the API is unavailable. API and integration docs are at [MacFlare](https://macflare.lucius7.dev/).

**OJFlare: recent submissions and AC contributions.** OJFlare sync jobs collect solving records from Codeforces, AtCoder, QOJ, and Nowcoder and publish [`dashboard.json`](https://ojflare.lucius7.dev/data/dashboard.json). The blog uses it in two places:

- **Recent submissions in the sidebar:** the latest three accepted Codeforces / AtCoder submissions by submission time, linking to the original submission pages. Repeat ACs on the same problem appear separately.
- **The AC contribution calendar below this page:** the number of problems first accepted each day in UTC+8, based on the collected history. Each problem counts only on its earliest AC date. You can filter by year and platform.

Both share one data request and refresh periodically while the page is visible. Freshness depends on OJFlare's sync and publishing; see its [API documentation](https://github.com/xw7qwq/oj/blob/main/docs/API.md). These public APIs are read only after the page loads, so building and reading articles does not depend on them being online.

**CodeFlare: source archive.** [CodeFlare](https://codeflare.lucius7.dev/) shows code by platform and directory, with search and an online reader. Its archive tools use OJFlare's problem, contest, and AC metadata to organize imports, then fill in submission records and source code from available sources. The archive also holds templates, unfinished code, and failed attempts, so its file count is not a solved-problem count. I write the blog's solution analyses myself and link to the code here; the only data APIs this site integrates directly are MacFlare and OJFlare.

## Get in touch

You can reach me on [GitHub](https://github.com/theLucius7), [Bilibili](https://space.bilibili.com/1814052279), or [X](https://x.com/theLucius7), or by email at [i@lucius7.dev](mailto:i@lucius7.dev). For site or project issues, please open an issue in the relevant repository.
