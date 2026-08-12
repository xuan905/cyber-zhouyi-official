# ClawHub 發布驗證紀錄

## 2026-08-12

透過 ClawHub 的 GitHub Import from GitHub 流程，已選取 `zhouyi-site-skill` 並完成一次發布提交。ClawHub 回報「1 skill imported and ready to share」，產生網址 `https://clawhub.ai/xuan905/zhouyi-site-skill`。

公開頁面目前顯示 `Skill hidden`，並顯示 `Current version: None` 與沒有可讀的 `SKILL.md`。因此該次提交不能視為可公開安裝的完成版本。

在 Skill settings 可見 `New Version`，其發布頁要求重新上傳資料夾並確認 MIT-0。已嘗試透過瀏覽器的資料夾上傳欄位上傳 `skills/zhouyi-site-skill/SKILL.md`，但頁面仍顯示「Complete MIT-0 acceptance, files, and SKILL.md to publish」；檢查 DOM 後發現 `#upload-files` 的 `files.length` 仍為 0，代表瀏覽器上傳尚未真正注入該欄位。

後續將上傳欄位暫時調整為一般檔案模式後，成功注入 `SKILL.md`，ClawHub 顯示 `Skill folder selected · 1 files · 2.4 KB`。完成 MIT-0 確認、版本變更說明與發布後，ClawHub Dashboard 顯示 `zhouyi-site-skill` 為 `Visible`，安全檢查執行中。

公開頁面已恢復可讀狀態：`https://clawhub.ai/xuan905/skills/zhouyi-site-skill`。頁面目前能顯示完整 `SKILL.md`，包含 Neo-Orientalism、雙主題、多語系、六十四卦模型、本機歷史紀錄與 Canvas 分享卡片等內容；頁面顯示 Security audit `Pass`、License `MIT-0`，並提供安裝指令 `openclaw skills install @xuan905/zhouyi-site-skill`。重新整理並以文字方式交叉驗證後，公開頁已標示 Current version `v0.1.1`，Last updated `just now`，因此發布與版本建立均已完成。
