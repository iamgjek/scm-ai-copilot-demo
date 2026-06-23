# 原始生成 Prompt

> 逆向還原自 `scm-ai-copilot-demo` 程式碼結構與功能。此 Prompt 可用於 Cursor / Agent 重建同等級的售前 Demo。

---

## Prompt 全文

```markdown
# 任務：建立「智能協同生產監控平台 AI Copilot」售前 Demo

## 背景
我們是供應鏈軟體／製造協同平台廠商，需要在客戶拜訪或展會中展示 AI Copilot 能力。
目標客戶是品牌方／OEM，他們委外多家供應商生產，需要即時掌握良率、交期、材料與製程變更風險。

## 產品名稱
智能協同生產監控平台 AI Copilot

## 技術要求
- React 19 + TypeScript + Vite
- 純前端，無後端 API
- AI 回覆使用 Mock（關鍵字匹配），不需接 LLM
- 所有資料寫死在 mockData.ts / reportData.ts
- 介面語言：繁體中文
- 可直接 `npm run dev` 執行

## 主畫面布局（三欄式 Dashboard）
1. **左欄 — 供應商風險卡片**
   - 顯示 5 家供應商
   - 每張卡片含：風險等級（High/Medium/Low）、良率 vs 目標、產量達成率、交期狀態、AI 摘要

2. **中欄 — AI Copilot 對話**
   - 歡迎訊息說明可問的主題
   - 5 個快捷問題按鈕
   - 對話輸入框
   - AI 回覆附「資料來源」連結，可點擊跳轉報表

3. **右欄 — AI Insight 營運分析**
   - KPI：平均良率、高風險數、交期延遲數、變更事件數
   - 優先處理建議（靜態文案）
   - 變更觀察摘要

## AI Mock 邏輯（關鍵字觸發）
- 「生產效率」→ 整體產量達成率 + 低於計畫供應商
- 「供應商 / 問題 / 風險」→ 高/中風險供應商清單與原因
- 「良率」→ 低於目標的供應商與缺陷描述
- 「交期」→ 延遲 PO 與天數
- 「材料 / BOM / 製程」→ 變更事件摘要
- 其他 → 引導使用快捷問題

## 可下鑽的 6 份報表（從 AI 回覆的 Source Links 進入）
每份報表共用 ReportLayout：返回按鈕、供應商篩選下拉、KPI 卡片、表格（良率報表加簡易長條圖）

1. 良率趨勢報表 — 來源 MES
2. 交期異常報表 — 來源 PO/採購
3. 材料異動報表 — 來源 BOM vs 實際投料
4. 製程參數報表 — 來源製程變更紀錄
5. 檢驗人員異動報表 — 來源檢驗站交接
6. 供應商風險明細 — 五維風險分數 + AI 原因 + 建議處置

## Mock 資料設計
- 5 家供應商：ABC Electronics（高風險）、DEF Manufacturing（中）、GHI Precision（低）、JKL Assembly（中）、MNO Technology（低）
- 高風險案例需串聯：良率連降 + 交期延遲 + BOM 品牌不一致 + 製程參數超限 + 檢驗員異動
- 資料區間：2026/06/10 – 2026/06/17
- 使用真實製造術語：SMT、AOI、回焊、MLCC、8D、PO 等

## UI/UX 要求
- 企業 B2B 風格，主色 #0b2f5b（深藍）
- 三欄 grid，max-width 1680px，100vh 不捲動主框架
- Topbar 標示「Pre-Sales Demo」「Mock Data」「無後端串接」
- 風險 badge 用紅/黃/綠色階
- 支援繁體中文字型（Noto Sans TC、PingFang TC）

## 檔案結構
src/
  App.tsx — 路由式 view 切換
  components/ — ChatPanel, SupplierCard, InsightPanel, ReportLayout, 6 份 Report, SourceLinks
  data/ — mockData.ts, reportData.ts
  utils/ — aiMock.ts
  App.css — 全部樣式

## 驗收標準
- 點快捷問題可得到合理 AI 回覆
- 點「資料來源」可進入對應報表並篩選供應商
- 報表可返回 Dashboard
- 左欄卡片、右欄 Insight 與 AI 回覆數字一致（同源 mockData）
```

---

## 程式碼對照

| Prompt 要求 | 實作位置 |
|-------------|----------|
| 三欄 Dashboard | `src/App.tsx` |
| Mock AI 關鍵字 | `src/utils/aiMock.ts` |
| 供應商資料 | `src/data/mockData.ts` |
| 報表資料 | `src/data/reportData.ts` |
| 6 份報表 | `src/components/*Report.tsx`, `SupplierRiskDetail.tsx` |
| 樣式規範 | `src/App.css` |
