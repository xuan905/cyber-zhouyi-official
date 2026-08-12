# 無 Token 暴露的 GitHub Pages 部署

本專案採用兩段式流程：本機只使用 GitHub CLI 的登入狀態或 SSH 金鑰進行推送；GitHub Pages 則由 GitHub Actions 使用 `pages: write` 與 OIDC 權限發布。Token 不會寫入程式碼、remote URL、命令列參數或工作流檔案。

## 一次性設定

先在本機安裝並登入 GitHub CLI：

```bash
gh auth login
```

登入時請選擇 GitHub.com、HTTPS 或 SSH，並依 GitHub CLI 的互動提示完成瀏覽器授權。不要把 Personal Access Token 貼入終端機命令列或提交到儲存庫。

接著在專案目錄設定使用 SSH 的遠端倉庫：

```bash
git remote add origin git@github.com:OWNER/REPOSITORY.git
```

如果 `origin` 已存在，請先確認它指向正確倉庫：

```bash
git remote -v
```

## 推送與自動發布

執行下列腳本即可完成型別檢查、生產建置、提交與推送：

```bash
./scripts/deploy-github-pages.sh
```

腳本也接受自訂 remote 與分支：

```bash
./scripts/deploy-github-pages.sh origin main
```

推送完成後，`.github/workflows/deploy.yml` 會自動建置 `dist/public`，再使用 GitHub Pages 官方部署動作發布。專案型 Pages 網址會使用 Vite 的 repository base path；若倉庫名稱是 `OWNER.github.io`，則會使用根路徑。

## GitHub 設定

第一次使用時，前往儲存庫的 **Settings → Pages**，將發布來源設定為 **GitHub Actions**。之後每次推送到 `main` 都會重新建置與發布。若 Actions 尚未啟動，亦可在 Actions 頁面手動執行 `Deploy to GitHub Pages` 工作流。

## 安全檢查

不要將 Token 放在 `.env`、Git remote URL、shell history、workflow YAML、README 或任何前端環境變數中。若曾經把 Token 貼到聊天、Issue、commit、終端機紀錄或公開檔案，請立即在 GitHub 撤銷它，再改用 `gh auth login` 或 SSH 金鑰。
