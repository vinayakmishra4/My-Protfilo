<a id="readme-top"></a>

<div align="center">

<img src="assets/banner.svg" alt="Vinayak Mishra: data science and machine learning portfolio" width="100%">

<br>

**A fast, dependency-free portfolio with a live k-means plot in the hero.**

<br>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Dependencies](https://img.shields.io/badge/dependencies-none-139a74?style=flat-square)
![Layout](https://img.shields.io/badge/layout-responsive-1f4fd8?style=flat-square)
![Theme](https://img.shields.io/badge/theme-light%20%2B%20dark-e0457b?style=flat-square)

<br>

[Features](#-features) · [Quick start](#-quick-start) · [Make it yours](#-make-it-yours) · [Deploy](#-deploy)

**Live site:** _add your link here after you deploy_

</div>

<br>

## ✨ Features

| | Feature | What you get |
|:-:|---|---|
| 📊 | **Live hero plot** | A k-means clustering animation plays on load, with a "Run again" button for fresh data. |
| 📂 | **Project rows** | Title, short description, tools and a code link for each project. Copy one block to add another. |
| 👤 | **About and contact** | A short bio with a details list, plus email, GitHub and LinkedIn links. |
| 🌗 | **Light and dark themes** | Follows the visitor's system setting. The theme button remembers their choice. |
| 📱 | **Mobile friendly** | The nav collapses into a menu on screens narrower than 720px. |
| ♿ | **Accessible defaults** | Visible keyboard focus, labeled controls and reduced-motion support. |
| ⚡ | **Zero dependencies** | Three files, no build step, nothing to install. |

## 📁 Project structure

```
.
├── assets/
│   └── banner.svg   banner image for this README
├── index.html       page content and structure
├── style.css        layout, colors and typography
├── script.js        theme toggle, menu, active nav link, k-means plot
└── README.md
```

Keep `index.html`, `style.css` and `script.js` in the same folder, since the page loads the other two by name.

## 🚀 Quick start

Open `index.html` in your browser. Or serve the folder with Python:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>. Use `python3` instead of `python` if your system needs it.

> [!NOTE]
> Fonts load from Google Fonts, so you need an internet connection to see them. Offline, the site falls back to Helvetica or Arial for headings and Georgia for body text.

## 🎨 Make it yours

> [!IMPORTANT]
> Before you publish, replace the placeholder email and links (`your-email@example.com` and `your-username`) in `index.html`.

| I want to… | Where |
|---|---|
| Add my email and links | `index.html`: search for `your-email@example.com` and `your-username`. The email appears in the hero button and the contact section. |
| Point projects at my repos | `index.html`: the links inside each `<article class="project">` |
| Rewrite the copy | `index.html`: the headline, intro, About text and details list |
| Add a project | Copy one `<article class="project">` inside `#projects` and edit it |
| Add a section | Give the new `<section>` an `id` and add a matching link to `#nav`. The active-link highlight picks it up automatically |
| Change colors | `style.css`: the variables at the top. Each holds a light and a dark value, in that order, inside `light-dark()` |
| Match the plot colors | `script.js`: the `PAL` object. The canvas can't read CSS variables, so if you change `--accent`, update the first color in each `groups` list |
| Swap fonts | The Google Fonts `<link>` in `index.html`, plus `--display` and `--body` in `style.css` |
| Add a screenshot | Save it as `screenshot.png` and add `![Preview](screenshot.png)` under the banner |

<details>
<summary>🧠 <b>How the plot works</b></summary>

<br>

The hero plot runs k-means with k = 3 on 90 random points:

1. Every point joins the group of its nearest center.
2. Each center moves to the middle of its group.
3. Steps 1 and 2 repeat until no point changes group.

Each of the three centers starts inside a different cluster of points, so the demo always settles cleanly. For visitors who prefer reduced motion, the plot shows the finished result right away.

</details>

<details>
<summary>🧩 <b>Browser support</b></summary>

<br>

The color themes use the CSS `light-dark()` function, which needs Chrome or Edge 123+, Firefox 120+, or Safari 17.5+. Older browsers won't apply the color theme.

</details>

## 🌐 Deploy

Any static host works. For **GitHub Pages**:

1. Push these files to a GitHub repository.
2. Open **Settings → Pages**.
3. Choose to deploy from the `main` branch, then save.

Netlify, Cloudflare Pages and Vercel also accept the folder as it is.

## 🙌 Credits

Fonts are [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) and [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4), served by Google Fonts under the SIL Open Font License.

<br>

<div align="center">

Built by **Vinayak Mishra**

<a href="#readme-top">Back to top</a>

</div>