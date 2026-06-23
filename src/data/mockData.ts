export type RiskLevel = 'High' | 'Medium' | 'Low';

export interface Supplier {
  id: string;
  name: string;
  riskLevel: RiskLevel;
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

export const suppliers: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'ABC Electronics',
    riskLevel: 'High',
    yieldRate: 91.8,
    targetYield: 96,
    deliveryStatus: '延遲',
    delayDays: 3,
    abnormalItems: ['SMT 焊點偏移', 'AOI 誤判率上升', '包材批號不一致'],
    productionQuantity: 8200,
    plannedQuantity: 10000,
    processChanges: ['回焊爐溫曲線調整', '新增二次目檢站點'],
    materialChanges: ['電容替代料導入', 'PCB 供應批次變更'],
    inspectorChanges: ['夜班檢驗員異動 2 人'],
    aiSummary: '良率低於目標且交期延遲，近期又有材料與製程變更，建議列為優先追蹤供應商。',
  },
  {
    id: 'SUP-002',
    name: 'DEF Manufacturing',
    riskLevel: 'Medium',
    yieldRate: 94.5,
    targetYield: 95,
    deliveryStatus: '部分延遲',
    delayDays: 1,
    abnormalItems: ['治具校正逾期', '尺寸抽驗波動'],
    productionQuantity: 12400,
    plannedQuantity: 13000,
    processChanges: ['CNC 刀具壽命參數更新'],
    materialChanges: [],
    inspectorChanges: ['新增白班代理檢驗員'],
    aiSummary: '產量接近計畫但良率略低，製程參數剛調整，建議觀察後續兩日趨勢。',
  },
  {
    id: 'SUP-003',
    name: 'GHI Precision',
    riskLevel: 'Low',
    yieldRate: 98.2,
    targetYield: 96,
    deliveryStatus: '準時',
    delayDays: 0,
    abnormalItems: [],
    productionQuantity: 15600,
    plannedQuantity: 15000,
    processChanges: [],
    materialChanges: [],
    inspectorChanges: [],
    aiSummary: '生產進度與良率皆優於目標，短期風險低，可維持例行監控。',
  },
  {
    id: 'SUP-004',
    name: 'JKL Assembly',
    riskLevel: 'Medium',
    yieldRate: 93.1,
    targetYield: 95.5,
    deliveryStatus: '準時',
    delayDays: 0,
    abnormalItems: ['組裝扭力偏差', '功能測試重測率偏高'],
    productionQuantity: 9700,
    plannedQuantity: 11000,
    processChanges: ['組裝線節拍重新平衡', '測試程式版本更新'],
    materialChanges: ['螺絲供應商批次切換'],
    inspectorChanges: [],
    aiSummary: '交期目前可控，但良率與產量均低於計畫，需確認組裝線節拍與測試程式更新影響。',
  },
  {
    id: 'SUP-005',
    name: 'MNO Technology',
    riskLevel: 'Low',
    yieldRate: 96.7,
    targetYield: 96,
    deliveryStatus: '準時',
    delayDays: 0,
    abnormalItems: ['外觀刮傷輕微增加'],
    productionQuantity: 18500,
    plannedQuantity: 18000,
    processChanges: [],
    materialChanges: ['包裝泡棉規格更新'],
    inspectorChanges: ['抽驗比例由 5% 提高至 8%'],
    aiSummary: '整體表現穩定，雖有包材變更與外觀輕微異常，但尚未造成交付風險。',
  },
];

export const quickQuestions = [
  '今日生產效率如何？',
  '哪些供應商可能有問題？',
  '本週風險最高的供應商是誰？',
  '有哪些良率異常？',
  '哪些供應商有材料或製程變更？',
];
