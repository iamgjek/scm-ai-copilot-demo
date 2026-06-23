# 智能協同生產監控平台 AI Copilot

售前互動 Demo：以 AI Copilot 對話搭配供應商風險總覽與六份可下鑽報表，展示品牌方／OEM 委外製造監控場景。

> **Pre-Sales Demo** · Mock Data · 無後端串接 · 關鍵字 Mock AI（未接 LLM）

## 功能概覽

- **三欄 Dashboard**：供應商風險卡片｜AI Copilot 對話｜營運 Insight
- **Mock AI 問答**：生產效率、供應商風險、良率、交期、材料／製程變更
- **報表下鑽**：AI 回覆附資料來源連結，可進入 6 份詳細報表
- **5 家供應商假資料**：含完整高風險故事線（ABC Electronics）

## 技術棧

- React 19 + TypeScript 5.8
- Vite 8
- 純前端，資料寫死於 `src/data/`

## 快速開始

```bash
npm install
npm run dev
```

開發伺服器啟動後，在瀏覽器開啟終端機顯示的本地網址（通常為 `http://localhost:5173`）。

### 建置與預覽

```bash
npm run build
npm run preview
```

`vite.config.ts` 設定 `base: './'`，建置後的 `dist/` 可部署至靜態主機或以子路徑提供服務。

## Demo 操作建議

1. 點快捷問題「今日生產效率如何？」或「本週風險最高的供應商是誰？」
2. 在 AI 回覆中點擊「資料來源」連結（如良率趨勢報表、供應商風險明細）
3. 在報表頁切換供應商篩選，點「返回 AI Copilot」回到主畫面
4. 對照左欄供應商卡片與右欄 Insight KPI

完整腳本見 [`docs/PRD.md`](docs/PRD.md#7-demo-腳本5-分鐘）。

## 專案結構

```
scm-ai-copilot-demo/
├── docs/                 # 產品設計文件
│   ├── PRD.md
│   ├── MARKET.md
│   ├── SKILL.md
│   └── PROMPT.md
├── src/
│   ├── App.tsx           # 主畫面與報表路由
│   ├── components/       # UI 元件與 6 份報表
│   ├── data/             # mockData.ts、reportData.ts
│   └── utils/aiMock.ts   # 關鍵字 Mock AI
├── index.html
├── package.json
└── vite.config.ts
```

## 產品文件

| 文件 | 說明 |
|------|------|
| [docs/PRD.md](docs/PRD.md) | 產品需求、功能規格、Demo 腳本 |
| [docs/MARKET.md](docs/MARKET.md) | 市場分析、競品、商業模式 |
| [docs/SKILL.md](docs/SKILL.md) | Agent Skill（領域模型與開發規範） |
| [docs/PROMPT.md](docs/PROMPT.md) | 重建此 Demo 的原始 Prompt |

## 限制說明

本專案為售前原型，刻意不包含：

- 真實 LLM / RAG / 後端 API
- 登入、權限、多租戶
- 即時資料推送

PoC／產品化路線見 [`docs/SKILL.md`](docs/SKILL.md#延伸路線poc--產品）。

## License

Private — 內部售前展示用途。
