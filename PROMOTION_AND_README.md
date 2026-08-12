# 賽博周易 (Cyber Zhouyi) — 專案宣傳文案與 README 指南

本檔案包含適用於 ClawHub 上架、GitHub 倉庫介紹以及專案首頁的吸睛文案、宣傳標語與完整 README 規格。

---

## 一、 宣傳標語 (Taglines)

1. **中文標語**：
   - 「把問題放進卦象，把方向帶回生活。」
   - 「融合古老易經智慧與現代數位美學的反思決策工具。」
   - 「預測之外，還有觀看變化的另一種方式。」

2. **英文標語 (English Taglines)**:
   - "Put the question inside the pattern. Bring the direction back to life."
   - "A reflective I Ching decision-support skill fusing classical change logic with modern digital aesthetics."
   - "Beyond prediction: a quiet, traceable way to watch change."

---

## 二、 ClawHub 簡介文案 (ClawHub Marketplace Description)

**Cyber Zhouyi** 是一個專為現代知識工作者與決策者打造的高質感 AI 代理 Skill 與開源網頁應用。它不談盲目迷信，而是將《易經》六十四卦的變化哲學轉化為冷靜、可追溯的自我對話框架。

### 核心亮點 (Key Features)
- **新東方美學 (Neo-Orientalism)**：日間採用白棕墨黑的溫潤書卷氣息，夜間呈現黑金流光的極致奢華。
- **三語系無縫切換**：完整內建繁體中文 (`zh-TW`)、簡體中文 (`zh-CN`) 與英文 (`en`)。
- **三幣六爻模擬引擎**：前端完整實作傳統金錢卦機率模型，動態產出本卦、變爻與變卦。
- **本機歷史紀錄**：自動在瀏覽器儲存最多 20 筆起卦軌跡，支援一鍵載入與清除，隱私滴水不漏。
- **Canvas 分享卡片圖片匯出**：一鍵產生 1200×1500 高畫質 PNG 宣紙質感卡片，隨時分享思考軌跡。

---

## 三、 GitHub 專案 README.md

```markdown
# ☯️ 賽博周易 (Cyber Zhouyi)

> Put the question inside the pattern. Bring the direction back to life.

[![Cyber Zhouyi Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)]()
[![React 19 & Tailwind 4](https://img.shields.io/badge/stack-React%2019%20%2B%20Tailwind%204-informational)]()

**Cyber Zhouyi** 是一個結合東方古典《易經》決策哲學與現代前端工藝的開源專案。它旨在提供一個安靜、沒有干擾的反思空間，協助使用者在面對事業轉職、團隊衝突或人生十字路口時，將混亂的處境拆解為位置、關係、轉折與可執行的下一步。

---

## 🌟 核心特色 (Core Features)

- **雙主題設計 (Dual Themes)**
  - **日間主題 (Light)**：米白宣紙基調、墨黑大字與古木棕色彩，散發現代文人雅士的沉靜氣質。
  - **夜間主題 (Dark)**：極夜黑背景搭配精緻金色線條與星象幾何，營造深邃的數位太極氛圍。
- **三語系國際化 (Trilingual Support)**
  - 完整支援 **繁體中文 (zh-TW)**、**簡體中文 (zh-CN)** 與 **英文 (en)**，語言狀態即時連動。
- **數位金錢卦引擎 (Digital Coin Casting)**
  - 瀏覽器端完全自主模擬傳統三幣起卦法，精確判定老陰、少陽、少陰、老陽與變爻位置。
- **本機歷史紀錄 (Reading History)**
  - 自動將近期的起卦問句與解讀結果存入 `localStorage`（最多 20 筆），資料完全不出瀏覽器。
- **高品質分享卡片匯出 (Canvas Share Card)**
  - 一鍵將複雜的卦象與今日指引渲染為 1200×1500 宣紙質感 PNG 圖片，隨時下載與朋友分享。

---

## 📦 快速開始 (Quick Start)

### 1. 安裝與依賴
確保您的環境已安裝 Node.js 與 pnpm，然後執行：

```bash
git clone https://github.com/your-username/cyber-zhouyi-official.git
cd cyber-zhouyi-official
pnpm install
```

### 2. 啟動本機開發伺服器
```bash
pnpm dev
```
開啟瀏覽器訪問 `http://localhost:3000` 即可預覽。

### 3. 生產打包
```bash
pnpm build
```

---

## 🚀 部署至 GitHub Pages (Deploy to GitHub Pages)

本專案為純前端靜態應用（Static Frontend），可直接透過 GitHub Actions 自動部署至 GitHub Pages：

1. 在 GitHub 建立一個新的倉庫（Repository）。
2. 將程式碼推送到 `main` 分支。
3. 前往倉庫的 **Settings > Pages**，在 **Build and deployment** 的 Source 選擇 **GitHub Actions**。
4. 推送更新後，GitHub Actions 將自動完成建置與發布。

---

## 📜 授權條款 (License)

本專案採用 [MIT License](LICENSE)。
```
