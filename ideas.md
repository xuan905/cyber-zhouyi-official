# 賽博周易 (Cyber Zhouyi) 官方介紹與 Skill 網站設計規格

## 三種視覺風格構想 (Aesthetic Directions)
1. **玄門道韻 (Taoist Minimalism)** (Probability: 0.08)
   - 簡約的水墨意境與留白，強調東方傳統美學的沉靜與內斂。
2. **賽博太極 (Cyber I-Ching)** (Probability: 0.07)
   - 結合高科技霓虹與古老卦象，營造未來主義的數位算卦體驗。
3. **典雅易道 (Classic Zhouyi & Scholar)** (Probability: 0.09, **已選定**)
   - 白天採用白、溫潤棕與沉穩黑配色（如宣紙、古木與墨寶），夜晚採用純黑背景搭配精緻金色線條與發光卦象，兼具現代科技感與深厚東方人文氣息。

## 核心設計原則 (Chosen Approach: 典雅易道)
- **設計運動 (Design Movement)**: Neo-Orientalism (新東方美學) 結合 Modern Glassmorphism。
- **色彩哲學 (Color Philosophy)**: 
  - 白天主題 (Light Theme)：以米白色 / 純白背景 (`#FBF9F5`) 搭配沉穩墨黑 (`#1A1A1A`) 與古木棕 (`#8C6239`)，營造書卷氣息與高雅質感。
  - 黑夜主題 (Dark Theme)：以極夜黑 (`#0B0C10`) 為底，輔以尊貴流光金 (`#D4AF37` / `#F39C12`) 與細膩銀線，勾勒出宇宙星象與太極陰陽的深邃感。
- **排版結構 (Layout Paradigm)**: 非對稱式導航、精緻卡片式佈局、互動式卦象演練。
- **標誌元素 (Signature Elements)**: 八卦太極旋轉動畫、互動式金錢卦擲幣模擬、64卦二進制對照卡片。
- **多語系支援 (Localization)**: 完整內建繁體中文 (zh-TW)、簡體中文 (zh-CN) 與英文 (en) 切換。
- **整合能力 (Integration)**: 提供 GitHub 授權資訊與 ClawHub API Key 串接說明，展現 Skill 官方定位。

## Style Decisions

- 每個主要畫面至少出現一個賽博周易系統標記：六爻線、太極圓、三幣起卦象徵或 64 卦索引，並以細墨線／金線呈現。
- 核心面板採用半透明宣紙儀器語彙：溫潤紙色、精準 metadata、低調 backdrop blur 與細邊框，避免普通 SaaS 白卡。
- 所有文案維持「整理問題、觀看變化、找到下一步」的冷靜反思語氣，不使用宿命式預言或泛用 SaaS 宣傳語。
- 首頁與起卦頁都必須使用同一組六爻／圓環／金線語彙；首頁負責建立世界觀，起卦頁負責將世界觀轉成儀式化操作。
