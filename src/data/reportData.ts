export type ReportView =
  | 'dashboard'
  | 'yieldReport'
  | 'deliveryReport'
  | 'materialReport'
  | 'processReport'
  | 'inspectorReport'
  | 'supplierRiskDetail';

export interface ReportSource {
  label: string;
  view: Exclude<ReportView, 'dashboard'>;
}

export const reportSources = {
  yield: { label: '良率趨勢報表', view: 'yieldReport' },
  delivery: { label: '交期異常報表', view: 'deliveryReport' },
  material: { label: '材料異動報表', view: 'materialReport' },
  process: { label: '製程參數報表', view: 'processReport' },
  inspector: { label: '檢驗人員異動報表', view: 'inspectorReport' },
  risk: { label: '供應商風險明細', view: 'supplierRiskDetail' },
} satisfies Record<string, ReportSource>;

export const yieldTrendData = [
  { date: '6/10', supplierId: 'SUP-001', supplierName: 'ABC Electronics', yieldRate: 96.1, targetYield: 96, productionQty: 1680, ngQty: 66, majorDefect: 'AOI 誤判率上升' },
  { date: '6/11', supplierId: 'SUP-001', supplierName: 'ABC Electronics', yieldRate: 95.2, targetYield: 96, productionQty: 1600, ngQty: 77, majorDefect: 'SMT 焊點偏移' },
  { date: '6/12', supplierId: 'SUP-001', supplierName: 'ABC Electronics', yieldRate: 94.1, targetYield: 96, productionQty: 1500, ngQty: 89, majorDefect: '回焊溫度偏高' },
  { date: '6/13', supplierId: 'SUP-001', supplierName: 'ABC Electronics', yieldRate: 93.4, targetYield: 96, productionQty: 1420, ngQty: 94, majorDefect: '焊點空洞' },
  { date: '6/14', supplierId: 'SUP-001', supplierName: 'ABC Electronics', yieldRate: 92.8, targetYield: 96, productionQty: 1240, ngQty: 89, majorDefect: '替代料批次差異' },
  { date: '6/15', supplierId: 'SUP-001', supplierName: 'ABC Electronics', yieldRate: 92.3, targetYield: 96, productionQty: 760, ngQty: 59, majorDefect: 'AOI 誤判率上升' },
  { date: '6/10', supplierId: 'SUP-002', supplierName: 'DEF Manufacturing', yieldRate: 95.1, targetYield: 95, productionQty: 2200, ngQty: 108, majorDefect: '尺寸抽驗波動' },
  { date: '6/11', supplierId: 'SUP-002', supplierName: 'DEF Manufacturing', yieldRate: 94.8, targetYield: 95, productionQty: 2050, ngQty: 107, majorDefect: '治具校正逾期' },
  { date: '6/12', supplierId: 'SUP-004', supplierName: 'JKL Assembly', yieldRate: 93.1, targetYield: 95.5, productionQty: 1800, ngQty: 124, majorDefect: '功能測試重測率偏高' },
  { date: '6/13', supplierId: 'SUP-005', supplierName: 'MNO Technology', yieldRate: 96.7, targetYield: 96, productionQty: 3100, ngQty: 102, majorDefect: '外觀刮傷' },
];

export const deliveryReportData = [
  { poNo: 'PO-240610-001', supplierId: 'SUP-001', supplierName: 'ABC Electronics', itemName: 'Main Control PCB', orderQty: 10000, requiredDate: '2026/06/12', promisedDate: '2026/06/14', actualDate: '2026/06/17', delayDays: 5, status: 'Delayed' },
  { poNo: 'PO-240611-008', supplierId: 'SUP-002', supplierName: 'DEF Manufacturing', itemName: 'CNC Housing', orderQty: 13000, requiredDate: '2026/06/15', promisedDate: '2026/06/15', actualDate: '2026/06/16', delayDays: 1, status: 'Partial Delay' },
  { poNo: 'PO-240612-016', supplierId: 'SUP-004', supplierName: 'JKL Assembly', itemName: 'Final Assembly Kit', orderQty: 11000, requiredDate: '2026/06/18', promisedDate: '2026/06/18', actualDate: '-', delayDays: 0, status: 'On Track' },
];

export const materialChangeData = [
  { supplierId: 'SUP-001', supplierName: 'ABC Electronics', itemNo: 'CAP-104-16V', materialName: 'MLCC Capacitor', bomBrand: 'Murata', actualBrand: 'TDK', lotNo: 'TDK-L0624-A17', changeDate: '2026/06/14', approvalStatus: 'Pending', riskNote: 'BOM 指定品牌與實際使用品牌不一致，需確認電性與可靠度驗證。' },
  { supplierId: 'SUP-004', supplierName: 'JKL Assembly', itemNo: 'SCR-M2-05', materialName: 'Assembly Screw', bomBrand: 'YFS', actualBrand: 'YFS', lotNo: 'YFS-240615', changeDate: '2026/06/15', approvalStatus: 'Approved', riskNote: '同品牌批次切換，低風險。' },
  { supplierId: 'SUP-005', supplierName: 'MNO Technology', itemNo: 'PKG-FOAM-02', materialName: 'Packaging Foam', bomBrand: 'Local Foam A', actualBrand: 'Local Foam B', lotNo: 'LF-B-0613', changeDate: '2026/06/13', approvalStatus: 'Approved', riskNote: '包材規格更新，需觀察外觀刮傷率。' },
];

export const processParameterData = [
  { supplierId: 'SUP-001', supplierName: 'ABC Electronics', processName: 'SMT Reflow', machineNo: 'RF-03', parameterName: 'Temperature', standardValue: '245°C', actualValue: '252°C', changedAt: '2026/06/14 22:10', changedBy: 'Line Leader A', approvalStatus: 'Pending' },
  { supplierId: 'SUP-002', supplierName: 'DEF Manufacturing', processName: 'CNC Milling', machineNo: 'CNC-12', parameterName: 'Tool Life', standardValue: '180 min', actualValue: '150 min', changedAt: '2026/06/15 09:20', changedBy: 'Process Engineer B', approvalStatus: 'Approved' },
  { supplierId: 'SUP-004', supplierName: 'JKL Assembly', processName: 'Function Test', machineNo: 'FT-08', parameterName: 'Test Program Version', standardValue: 'v3.2.1', actualValue: 'v3.3.0', changedAt: '2026/06/16 13:40', changedBy: 'Test Engineer C', approvalStatus: 'Pending' },
];

export const inspectorChangeData = [
  { supplierId: 'SUP-001', supplierName: 'ABC Electronics', inspectionStation: 'AOI Review', previousInspector: 'Chen Wei', currentInspector: 'Lin Yu', changedDate: '2026/06/15', handoverStatus: 'Confirmed', riskNote: '夜班檢驗員異動，需確認判定標準一致。' },
  { supplierId: 'SUP-002', supplierName: 'DEF Manufacturing', inspectionStation: 'Dimension Check', previousInspector: 'Huang Min', currentInspector: 'Wu Ting', changedDate: '2026/06/16', handoverStatus: 'Not Confirmed', riskNote: '代理檢驗員尚未完成交接確認，尺寸抽驗波動需追蹤。' },
  { supplierId: 'SUP-005', supplierName: 'MNO Technology', inspectionStation: 'Appearance Check', previousInspector: 'Tsai Ning', currentInspector: 'Tsai Ning', changedDate: '2026/06/14', handoverStatus: 'Confirmed', riskNote: '抽驗比例提高，無人員異動。' },
];

export const supplierRiskDetailData = [
  { supplierId: 'SUP-001', supplierName: 'ABC Electronics', totalRiskScore: 87, yieldRiskScore: 35, deliveryRiskScore: 25, materialRiskScore: 17, processRiskScore: 7, inspectorRiskScore: 3, aiReason: '良率連續下降、PO 延遲 5 天，且 BOM 指定 Murata 但實際使用 TDK，同時 SMT 回焊溫度高於標準。', suggestedAction: '立即召開供應商品質會議，要求提交 8D、材料替代驗證與製程參數簽核紀錄。' },
  { supplierId: 'SUP-002', supplierName: 'DEF Manufacturing', totalRiskScore: 58, yieldRiskScore: 17, deliveryRiskScore: 10, materialRiskScore: 4, processRiskScore: 9, inspectorRiskScore: 18, aiReason: '部分交期延遲且檢驗人員交接未確認，可能造成尺寸判定標準不一致。', suggestedAction: '要求補交計畫，並完成檢驗交接確認與治具校正。' },
  { supplierId: 'SUP-004', supplierName: 'JKL Assembly', totalRiskScore: 62, yieldRiskScore: 24, deliveryRiskScore: 3, materialRiskScore: 8, processRiskScore: 22, inspectorRiskScore: 5, aiReason: '測試程式版本更新後重測率偏高，產量與良率低於計畫。', suggestedAction: '回溯測試程式版本差異，確認組裝線節拍與扭力參數。' },
  { supplierId: 'SUP-003', supplierName: 'GHI Precision', totalRiskScore: 18, yieldRiskScore: 3, deliveryRiskScore: 0, materialRiskScore: 2, processRiskScore: 4, inspectorRiskScore: 9, aiReason: '良率與交期穩定，無重大異常。', suggestedAction: '維持例行監控。' },
  { supplierId: 'SUP-005', supplierName: 'MNO Technology', totalRiskScore: 27, yieldRiskScore: 6, deliveryRiskScore: 0, materialRiskScore: 9, processRiskScore: 2, inspectorRiskScore: 10, aiReason: '包材規格更新且外觀刮傷輕微增加，但良率仍達標。', suggestedAction: '追蹤外觀 NG 趨勢與包材變更成效。' },
];
