---
name: scm-ai-copilot-demo
description: 建立供應鏈生產監控 AI Copilot 售前 Demo。適用於 OEM/品牌方多供應商委外監控、良率交期風險問答、報表下鑽展示。純前端 Mock，不接 LLM。
---

# SCM AI Copilot Demo Builder

## 使用時機

- 客戶需要「供應鏈 + AI Copilot」可互動 Demo
- 展會、售前拜訪、PoC 第一階段（視覺與流程驗證）
- 領域涵蓋：委外製造、供應商風險、MES/ERP 資料整合敘事

## 核心交付物

1. 三欄 Dashboard（供應商卡片 | AI 對話 | 營運 Insight）
2. 關鍵字 Mock AI（5 類意圖 + fallback）
3. 6 份可下鑽報表（共用 ReportLayout）
4. 一致性的 Mock 資料層（suppliers 為 single source of truth）

## 領域模型

### Supplier

```typescript
interface Supplier {
  id: string;
  name: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  yieldRate: number;
  targetYield: number;
  deliveryStatus: string;
  delayDays: number;
  abnormalItems: string[];
  productionQuantity: number;
  plannedQuantity: number;
  processChanges: string[];
  materialChanges: string[];
  inspectorChanges: string[];
  aiSummary: string;
}
```

### 風險評分維度（supplierRiskDetailData）

- `yieldRiskScore` — 良率風險
- `deliveryRiskScore` — 交期風險
- `materialRiskScore` — 材料風險
- `processRiskScore` — 製程風險
- `inspectorRiskScore` — 檢驗風險
- `totalRiskScore` — 加權總分
- `aiReason` — AI 歸因說明
- `suggestedAction` — 建議處置

### ReportView 路由

```
dashboard
  |-- yieldReport
  |-- deliveryReport
  |-- materialReport
  |-- processReport
  |-- inspectorReport
  |-- supplierRiskDetail
```

## Mock AI 規則

| 關鍵字 | 意圖 | 關聯報表 |
|--------|------|----------|
| 生產效率 | 產量達成 | 良率、交期、風險 |
| 供應商 / 問題 / 風險 | 風險總覽 | 全部 |
| 良率 | 良率異常 | 良率、製程、材料、風險 |
| 交期 | 延遲 PO | 交期、風險 |
| 材料 / BOM / 製程 | 變更事件 | 材料、製程、檢驗、風險 |
| 其他 | fallback | 無 |

實作：`src/utils/aiMock.ts` → `getAiMockResponse(question)`

## UI 規範

- **語言**：zh-Hant
- **布局**：grid 三欄 `minmax(300px,390px) | 1fr | minmax(300px,380px)`
- **色彩**：`#0b2f5b` 標題、`#f4f6f9` 背景、白底 panel + 輕 shadow
- **字型**：Inter + Noto Sans TC / PingFang TC / Microsoft JhengHei
- **狀態標示**：topbar 必須顯示 Demo / Mock 狀態，避免客戶誤以為已上線

## 快捷問題（預設）

1. 今日生產效率如何？
2. 哪些供應商可能有問題？
3. 本週風險最高的供應商是誰？
4. 有哪些良率異常？
5. 哪些供應商有材料或製程變更？

## 資料一致性檢查清單

- [ ] `aiMock` 計算的 highRisk / yieldIssues 與 `suppliers` 篩選一致
- [ ] `InsightPanel` KPI 與 `suppliers` 同源計算
- [ ] 報表 `supplierId` 篩選與 mockData id 對應
- [ ] ABC Electronics 為完整高風險故事線（良率↓ + 延遲 + Murata→TDK + 回焊溫度）

## 高風險故事線（ABC Electronics）

供應商 `SUP-001` 需串聯以下異常，作為 Demo 主線：

| 維度 | 異常內容 |
|------|----------|
| 良率 | 91.8%，目標 96%，連續 6 天下降 |
| 交期 | 延遲 3–5 天，PO-240610-001 |
| 材料 | BOM 指定 Murata，實際使用 TDK MLCC |
| 製程 | SMT 回焊溫度 252°C，標準 245°C |
| 檢驗 | 夜班檢驗員異動，AOI 判定標準需確認 |
| 風險分數 | 總分 87，建議召開品質會議、提交 8D |

## 刻意不做（Demo 邊界）

- 不接真實 LLM / RAG
- 不做登入、權限、多租戶
- 不做即時推送、WebSocket
- 不做圖表函式庫（良率用 CSS bar 即可）
- 不做行動版優化

## 延伸路線（PoC → 產品）

| 階段 | 變更 |
|------|------|
| PoC | `aiMock.ts` → LLM + Tool Calling（查 MES/ERP API） |
| MVP | `reportData.ts` → 後端聚合服務 |
| 產品 | 風險分數 → 可解釋 ML 模型 + 客戶 incident 校準 |
| 企業版 | Source Links → 深連結 + 權限控管 + 審計 log |

## 技術棧

- React 19 + TypeScript 5.8 + Vite 8
- 無額外 UI 函式庫
- 樣式集中在 `src/App.css`

## 啟動方式

```bash
npm install
npm run dev
npm run build   # 靜態輸出至 dist/
```
