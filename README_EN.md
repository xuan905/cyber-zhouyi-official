# Cyber Zhouyi Official

[繁體中文](./README.md) | **English**

> Turn the observation framework of the *I Ching* into a reusable AI Skill—so questions become visible and direction can return to everyday life.

[![Live Site](https://img.shields.io/badge/Live%20Site-GitHub%20Pages-8C6239?style=flat-square)](https://xuan905.github.io/cyber-zhouyi-official/)
[![ClawHub](https://img.shields.io/badge/ClawHub-zhouyi--site--skill-D4AF37?style=flat-square)](https://clawhub.ai/xuan905/skills/zhouyi-site-skill)
[![License](https://img.shields.io/badge/License-MIT%2D0-111111?style=flat-square)](https://opensource.org/license/mit-0)

Cyber Zhouyi is an official website and AI Skill ecosystem that combines the observation methods of the *I Ching* with contemporary digital design. It does not replace human judgment with divination. Instead, it organizes questions, divination, observation, and action guidance into a readable, interactive, and reusable reflection process for decision support.

## Public Resources

| Resource | Link |
| --- | --- |
| Official website | [xuan905.github.io/cyber-zhouyi-official](https://xuan905.github.io/cyber-zhouyi-official/) |
| GitHub repository | [github.com/xuan905/cyber-zhouyi-official](https://github.com/xuan905/cyber-zhouyi-official) |
| ClawHub Skill | [@xuan905/zhouyi-site-skill](https://clawhub.ai/xuan905/skills/zhouyi-site-skill) |
| AI_Skills showcase | [xuan905.github.io/AI_Skills](https://xuan905.github.io/AI_Skills/) |
| Divination page | [Start a divination](https://xuan905.github.io/cyber-zhouyi-official/#/divination) |
| Skill installation guide | [Read the guide](https://xuan905.github.io/cyber-zhouyi-official/#/guide) |

## Features

### Official Website

The website follows a Neo-Orientalism design direction. Paper textures, ink brushwork, aged wood brown, and geometric hexagram motifs are translated into an interface designed for contemporary digital reading. Visitors can learn about the Skill on the home page, then open the divination page to enter a question and receive a detailed interpretation.

The current website includes:

- A warm white, brown, and black daytime theme, plus a black and gold nighttime theme.
- Traditional Chinese, Simplified Chinese, and English interface languages.
- Three-coin, six-line divination with primary hexagram, changing lines, and relating hexagram output.
- Detailed, modern interpretations of all 64 hexagrams in three languages.
- Twenty frequently asked life questions for quick loading.
- Browser `localStorage` history with up to 20 saved divination results.
- High-resolution PNG sharing cards rendered with HTML5 Canvas.
- JSON result export for saving, sharing, and future integrations.
- A Hash Router and automated deployment workflow compatible with GitHub Pages.

### Reusable AI Skill

The Skill definition is available at [`skills/zhouyi-site-skill/SKILL.md`](./skills/zhouyi-site-skill/SKILL.md) and has been published on [ClawHub](https://clawhub.ai/xuan905/skills/zhouyi-site-skill). It documents a repeatable workflow for building the theme system, localization, 64-hexagram data model, divination flow, local history, and share-card export.

Typical use cases include:

1. Building a frontend project that combines East Asian cultural vocabulary with contemporary web aesthetics.
2. Turning a user question into structured observations and practical next-step guidance.
3. Creating a multilingual interface with day and night themes.
4. Saving divination results as local history, JSON, or social sharing images.
5. Validating, building, and deploying a static website through a repeatable workflow.

## Divination Flow

```text
Enter a specific question
        ↓
Toss three coins six times to form six lines
        ↓
Identify the primary hexagram, changing lines, and relating hexagram
        ↓
Read the hexagram, observation keywords, and detailed interpretation
        ↓
Turn the reflection into an actionable next step
        ↓
Save the history, export JSON, or create a sharing card
```

Questions work best when they are specific, focused, and connected to an action the user can take. For example, “How should I organize my study plan over the next three months?” is generally more useful for reflection than “What will happen to me in the future?”

## Technical Architecture

| Layer | Technology and responsibility |
| --- | --- |
| UI | React 19, TypeScript, Tailwind CSS 4, shadcn/ui |
| Build | Vite 7, pnpm, ESBuild |
| Routing | Wouter with a Hash Router for GitHub Pages sub-path deployment |
| State and storage | React Context and browser `localStorage` |
| Content | `client/src/data/zhouyi-content.json` stores the 64 hexagrams and quick questions |
| Divination core | `client/src/lib/zhouyi.ts` contains the three-coin model and hexagram data structures |
| Share cards | `client/src/lib/shareCard.ts` renders PNG images with HTML5 Canvas |
| Deployment | GitHub Actions publishes to GitHub Pages |

### Key Directories

```text
client/
  src/
    components/       Shared interface components and UI primitives
    contexts/          Theme and global state contexts
    data/              64-hexagram and quick-question JSON data
    lib/               Divination model, utilities, and share-card rendering
    pages/             Home, Divination, Guide, and other page components
    App.tsx            Hash Router and global page configuration
    index.css          Tailwind tokens and Neo-Orientalism visual system
skills/
  zhouyi-site-skill/
    SKILL.md           Reusable Cyber Zhouyi AI Skill
scripts/
  generate-zhouyi-content.mjs
  deploy-github-pages.sh
.github/workflows/
  deploy.yml           GitHub Pages deployment workflow
```

## Local Development

### Requirements

- Node.js 22 or a compatible modern Node.js release.
- pnpm 10 or a compatible version.
- Optional: GitHub CLI when pushing changes or managing GitHub resources.

### Install and Run

```bash
git clone https://github.com/xuan905/cyber-zhouyi-official.git
cd cyber-zhouyi-official
pnpm install
pnpm dev
```

Open the local URL printed by the development server. To test the GitHub Pages sub-path behavior locally, verify the home page, `#/divination`, and `#/guide` routes using the repository base path where applicable.

### Quality Checks and Production Build

```bash
pnpm check
pnpm build
```

`pnpm check` runs the TypeScript type checker. `pnpm build` builds the frontend assets and bundles the compatible production server output. When updating hexagram content, consult [`scripts/generate-zhouyi-content.mjs`](./scripts/generate-zhouyi-content.mjs) and rerun JSON validation, type checking, and the production build before committing.

## GitHub Pages Deployment

The project uses [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) for automated deployment. After a push to `main`, GitHub Actions builds `dist/public` and publishes it through the official GitHub Pages deployment flow. On the first setup, open **Settings → Pages** in the GitHub repository and select **GitHub Actions** as the publishing source.

If GitHub CLI or SSH authorization is already configured locally, run:

```bash
gh auth login
./scripts/deploy-github-pages.sh github main
```

The script runs checks, creates the production build, commits changes, and pushes them. If your Git remote has a different name, replace the first argument:

```bash
./scripts/deploy-github-pages.sh <remote> main
```

Never put a Personal Access Token in this README, `.env`, a Git remote URL, shell history, a GitHub Actions YAML file, or frontend environment variables. If a credential has ever been pasted into a chat, issue, commit, or public file, revoke it immediately and use a new secure authorization method. This project prioritizes `gh auth login` or SSH for deployment.

## Maintaining the Hexagram Content

The 64 hexagrams and 20 quick questions are stored in [`client/src/data/zhouyi-content.json`](./client/src/data/zhouyi-content.json). Each hexagram record contains names in three languages, classical wording, a modern interpretation, observation keywords, and action guidance. When editing the content, keep the Traditional Chinese, Simplified Chinese, and English structures aligned so that no language is missing required information.

The divination model and data lookups are centralized in [`client/src/lib/zhouyi.ts`](./client/src/lib/zhouyi.ts). If you change line ordering, changing-line rules, or binary hexagram mappings, also test the visual divination result, history loading, JSON export, and sharing-card output.

## Scope and Responsible Use

> Cyber Zhouyi is a reflection and decision-organization tool. It is not prophecy and does not provide medical, legal, financial, or investment advice.

Interpretations should be treated as material for organizing a question, recognizing a situation, and considering a next step. They should not replace professional advice, reliable information, or personal judgment. For health, legal, financial, investment, or other major life decisions, consult a qualified professional.

## License

The website source code is released under the [MIT License](https://opensource.org/license/mit). Published Skill versions follow ClawHub’s [MIT-0](https://opensource.org/license/mit-0) licensing terms. See [`skills/zhouyi-site-skill/SKILL.md`](./skills/zhouyi-site-skill/SKILL.md) and the relevant publishing platform for details.

## Related Links

- [Official website](https://xuan905.github.io/cyber-zhouyi-official/)
- [ClawHub Skill](https://clawhub.ai/xuan905/skills/zhouyi-site-skill)
- [AI_Skills showcase](https://xuan905.github.io/AI_Skills/)
- [GitHub Pages deployment guide](./DEPLOY_GITHUB_PAGES.md)
- [Skill definition](./skills/zhouyi-site-skill/SKILL.md)
