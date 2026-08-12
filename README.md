# 賽博周易 Cyber Zhouyi Official

[繁體中文](./README.md) | [English](./README_EN.md)

> 把《易經》的觀察框架轉成可重複使用的 AI Skill，讓問題被看見，讓方向回到生活。

[![Live Site](https://img.shields.io/badge/Live%20Site-GitHub%20Pages-8C6239?style=flat-square)](https://xuan905.github.io/cyber-zhouyi-official/)
[![ClawHub](https://img.shields.io/badge/ClawHub-zhouyi--site--skill-D4AF37?style=flat-square)](https://clawhub.ai/xuan905/skills/zhouyi-site-skill)
[![License](https://img.shields.io/badge/License-MIT%2D0-111111?style=flat-square)](https://opensource.org/license/mit-0)

賽博周易（Cyber Zhouyi）是一個融合古老《易經》觀察方法與現代數位設計的官方網站及 AI Skill 生態系。專案不以占卜取代人的判斷，而是將提問、起卦、觀察與行動指引整理成一套可閱讀、可互動、可重複使用的決策反思流程。

## 公開入口

| 資源 | 連結 |
| --- | --- |
| 官方網站 | [xuan905.github.io/cyber-zhouyi-official](https://xuan905.github.io/cyber-zhouyi-official/) |
| GitHub 儲存庫 | [github.com/xuan905/cyber-zhouyi-official](https://github.com/xuan905/cyber-zhouyi-official) |
| ClawHub Skill | [@xuan905/zhouyi-site-skill](https://clawhub.ai/xuan905/skills/zhouyi-site-skill) |
| AI_Skills 展示頁 | [xuan905.github.io/AI_Skills](https://xuan905.github.io/AI_Skills/) |
| 起卦頁 | [立即起卦](https://xuan905.github.io/cyber-zhouyi-official/#/divination) |
| Skill 安裝指南 | [查看指南](https://xuan905.github.io/cyber-zhouyi-official/#/guide) |

## 專案特色

### 官方網站

網站採用 Neo-Orientalism 新東方美學，將宣紙肌理、墨色筆觸、古木棕與幾何卦象轉譯為具有數位閱讀感的介面。使用者可以在首頁理解 Skill 的定位，也可以從起卦分頁輸入問題並取得完整解析。

網站目前提供以下功能：

- 白棕黑日間主題與黑金夜間主題切換。
- 繁體中文、簡體中文與英文三語介面。
- 三枚硬幣六爻起卦，支援本卦、變爻與變卦呈現。
- 六十四卦三語系資料與現代化詳細解讀。
- 二十題生活常見問題快速載入。
- 瀏覽器 `localStorage` 歷史紀錄，最多保存二十筆結果。
- HTML5 Canvas 高解析度 PNG 分享卡片匯出。
- JSON 結果匯出，方便保存、分享與後續串接。
- GitHub Pages 相容的 Hash Router 與自動部署工作流。

### 可重複使用的 AI Skill

Skill 文件位於 [`skills/zhouyi-site-skill/SKILL.md`](./skills/zhouyi-site-skill/SKILL.md)，並已發布至 [ClawHub](https://clawhub.ai/xuan905/skills/zhouyi-site-skill)。它描述如何從專案初始化開始，逐步建立主題、多語系、六十四卦資料模型、起卦流程、歷史紀錄與分享卡片匯出功能。

Skill 的核心應用情境包括：

1. 建立融合東方文化語彙與現代網頁美學的前端專案。
2. 將提問轉成結構化的卦象觀察與行動指引。
3. 建立繁簡英多語系與日夜主題系統。
4. 將起卦結果保存為本機紀錄、JSON 或社群分享圖片。
5. 以可重複的工作流程驗證、建置並部署靜態網站。

## 起卦流程

```text
輸入一個具體問題
        ↓
三枚硬幣擲六次，形成六爻
        ↓
辨識本卦、變爻與變卦
        ↓
讀取卦象、觀察關鍵與詳細解析
        ↓
整理可執行的下一步
        ↓
選擇保存歷史、匯出 JSON 或產生分享卡片
```

建議問題應該具體、聚焦並與自身能採取的行動有關。例如，「我接下來三個月應如何安排目前的學習計畫？」通常比「我的未來會怎樣？」更適合用於反思與決策整理。

## 技術架構

| 層級 | 技術與責任 |
| --- | --- |
| UI | React 19、TypeScript、Tailwind CSS 4、shadcn/ui |
| 建置 | Vite 7、pnpm、ESBuild |
| 路由 | Wouter 搭配 Hash Router，支援 GitHub Pages 子路徑部署 |
| 狀態與儲存 | React Context、瀏覽器 `localStorage` |
| 資料 | `client/src/data/zhouyi-content.json` 保存六十四卦與快速問題資料 |
| 起卦核心 | `client/src/lib/zhouyi.ts` 負責三幣六爻與卦象資料模型 |
| 分享卡片 | `client/src/lib/shareCard.ts` 使用 HTML5 Canvas 產生 PNG |
| 部署 | GitHub Actions 發布至 GitHub Pages |

### 主要目錄

```text
client/
  src/
    components/       共用介面元件與 UI primitives
    contexts/          主題與全域狀態 Context
    data/              六十四卦與快速問題 JSON 資料
    lib/               起卦模型、工具函式與分享卡片
    pages/             Home、Divination、Guide 等頁面
    App.tsx            Hash Router 與全域頁面配置
    index.css          Tailwind tokens 與 Neo-Orientalism 視覺系統
skills/
  zhouyi-site-skill/
    SKILL.md           可重複使用的賽博周易 AI Skill
scripts/
  generate-zhouyi-content.mjs
  deploy-github-pages.sh
.github/workflows/
  deploy.yml           GitHub Pages 自動部署工作流
```

## 本機開發

### 環境需求

- Node.js 22 或相容的現代 Node.js 版本。
- pnpm 10 或相容版本。
- 可選：GitHub CLI，僅在需要推送或管理 GitHub 資源時使用。

### 安裝與啟動

```bash
git clone https://github.com/xuan905/cyber-zhouyi-official.git
cd cyber-zhouyi-official
pnpm install
pnpm dev
```

開發伺服器啟動後，請開啟終端機輸出的本機網址。若要在 GitHub Pages 子路徑情境下檢查路由，請使用完整的 repository base path 網址測試首頁、`#/divination` 與 `#/guide`。

### 品質檢查與生產建置

```bash
pnpm check
pnpm build
```

`pnpm check` 會執行 TypeScript 型別檢查；`pnpm build` 會建置前端資產並打包相容的 production server 輸出。修改六十四卦內容時，可參考 [`scripts/generate-zhouyi-content.mjs`](./scripts/generate-zhouyi-content.mjs) 的批次維護流程，並在提交前重新執行 JSON 完整性檢查、型別檢查與建置。

## GitHub Pages 部署

專案使用 [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) 自動部署。推送到 `main` 後，GitHub Actions 會建置 `dist/public`，再使用 GitHub Pages 官方部署流程發布。第一次設定時，請在 GitHub 儲存庫的 **Settings → Pages** 將發布來源設為 **GitHub Actions**。

若本機已透過 GitHub CLI 或 SSH 完成安全授權，可使用：

```bash
gh auth login
./scripts/deploy-github-pages.sh github main
```

腳本會依序執行檢查、生產建置、提交與推送。若使用的 remote 名稱不同，請替換第一個參數：

```bash
./scripts/deploy-github-pages.sh <remote> main
```

請勿把 Personal Access Token 寫入 README、`.env`、Git remote URL、Shell history、GitHub Actions YAML 或任何前端環境變數。若憑證曾經被貼到聊天、Issue、commit 或公開檔案，應立即撤銷並重新建立安全授權方式；本專案的部署流程優先使用 `gh auth login` 或 SSH。

## 維護六十四卦資料

六十四卦與二十題快速問題位於 [`client/src/data/zhouyi-content.json`](./client/src/data/zhouyi-content.json)。每個卦象資料包含三語系名稱、卦辭、現代解讀、觀察關鍵與行動指引。更新內容時，請保持繁中、簡中與英文欄位結構一致，避免其中一種語言缺少必要資訊。

起卦模型與資料查詢集中於 [`client/src/lib/zhouyi.ts`](./client/src/lib/zhouyi.ts)。若調整爻位順序、變爻規則或卦象二進制映射，應同步檢查起卦頁的視覺呈現、歷史紀錄載入、JSON 匯出與分享卡片結果。

## 使用邊界

> 賽博周易是反思與決策整理工具，不構成預言、醫療、法律、財務或投資建議。

使用者應將卦象解讀視為整理問題、辨識情勢與思考下一步的輔助素材，不應以它取代專業人士、可靠資料或自身判斷。涉及健康、法律、財務、投資與其他重大人生決策時，請向合格專業人士尋求適當意見。

## 授權

網站程式碼採用 [MIT License](https://opensource.org/license/mit)，Skill 發布版本依 ClawHub 規則採用 [MIT-0](https://opensource.org/license/mit-0)。詳情請參閱 [`skills/zhouyi-site-skill/SKILL.md`](./skills/zhouyi-site-skill/SKILL.md) 與各發布平台的授權資訊。

## 相關連結

- [官方網站](https://xuan905.github.io/cyber-zhouyi-official/)
- [ClawHub Skill](https://clawhub.ai/xuan905/skills/zhouyi-site-skill)
- [AI_Skills 展示頁](https://xuan905.github.io/AI_Skills/)
- [GitHub Pages 部署說明](./DEPLOY_GITHUB_PAGES.md)
- [Skill 文件](./skills/zhouyi-site-skill/SKILL.md)
