import { suppliers } from '../data/mockData';
import { reportSources, type ReportSource } from '../data/reportData';

const formatPercent = (value: number) => `${value.toFixed(1)}%`;

export interface AiMockResponse {
  text: string;
  sources: ReportSource[];
}

export function getAiMockResponse(question: string): AiMockResponse {
  const normalizedQuestion = question.trim();
  const highRiskSuppliers = suppliers.filter((supplier) => supplier.riskLevel === 'High');
  const mediumRiskSuppliers = suppliers.filter((supplier) => supplier.riskLevel === 'Medium');
  const yieldIssues = suppliers.filter((supplier) => supplier.yieldRate < supplier.targetYield);
  const deliveryIssues = suppliers.filter((supplier) => supplier.delayDays > 0);
  const changeIssues = suppliers.filter(
    (supplier) => supplier.materialChanges.length > 0 || supplier.processChanges.length > 0,
  );

  if (normalizedQuestion.includes('生產效率')) {
    const totalProduction = suppliers.reduce((sum, supplier) => sum + supplier.productionQuantity, 0);
    const totalPlanned = suppliers.reduce((sum, supplier) => sum + supplier.plannedQuantity, 0);
    const efficiency = (totalProduction / totalPlanned) * 100;
    const underPlan = suppliers
      .filter((supplier) => supplier.productionQuantity < supplier.plannedQuantity)
      .map((supplier) => supplier.name)
      .join('、');

    return {
      text: `今日整體生產效率為 ${formatPercent(efficiency)}，實際產量 ${totalProduction.toLocaleString()} 件，計畫產量 ${totalPlanned.toLocaleString()} 件。低於計畫的供應商包含 ${underPlan || '無'}，建議優先確認 ABC Electronics 與 JKL Assembly 的產能缺口。`,
      sources: [reportSources.yield, reportSources.delivery, reportSources.risk],
    };
  }

  if (
    normalizedQuestion.includes('供應商') ||
    normalizedQuestion.includes('問題') ||
    normalizedQuestion.includes('風險')
  ) {
    const highRiskNames = highRiskSuppliers.map((supplier) => supplier.name).join('、');
    const mediumRiskNames = mediumRiskSuppliers.map((supplier) => supplier.name).join('、');

    return {
      text: `目前高風險供應商為 ${highRiskNames}，主要原因是良率低於目標、交期延遲與材料/製程變更同時發生。中風險供應商包含 ${mediumRiskNames}，建議持續追蹤良率趨勢、產量達成率與異常項目是否擴大。`,
      sources: [reportSources.yield, reportSources.delivery, reportSources.material, reportSources.process, reportSources.risk],
    };
  }

  if (normalizedQuestion.includes('良率')) {
    const issueSummary = yieldIssues
      .map((supplier) => `${supplier.name} 目前 ${formatPercent(supplier.yieldRate)}，目標 ${formatPercent(supplier.targetYield)}`)
      .join('；');

    return {
      text: `良率異常供應商共有 ${yieldIssues.length} 家：${issueSummary}。其中 ABC Electronics 差距最大，並伴隨 SMT 焊點偏移與 AOI 誤判率上升，建議先檢查製程參數與替代料批次。`,
      sources: [reportSources.yield, reportSources.process, reportSources.material, reportSources.risk],
    };
  }

  if (normalizedQuestion.includes('交期')) {
    const deliverySummary = deliveryIssues
      .map((supplier) => `${supplier.name} 延遲 ${supplier.delayDays} 天`)
      .join('；');

    return {
      text: `目前交期風險集中在 ${deliverySummary}。ABC Electronics 延遲天數最高，建議確認缺料、重工與出貨排程；DEF Manufacturing 為部分延遲，可先要求補交計畫。`,
      sources: [reportSources.delivery, reportSources.risk],
    };
  }

  if (
    normalizedQuestion.includes('材料') ||
    normalizedQuestion.toUpperCase().includes('BOM') ||
    normalizedQuestion.includes('製程')
  ) {
    const changeSummary = changeIssues
      .map((supplier) => {
        const changes = [...supplier.materialChanges, ...supplier.processChanges].join('、');
        return `${supplier.name}：${changes}`;
      })
      .join('；');

    return {
      text: `材料或製程變更供應商包含 ${changeIssues.length} 家。${changeSummary}。建議針對 ABC Electronics 與 JKL Assembly 進行變更審核，確認是否影響良率、交期與檢驗標準。`,
      sources: [reportSources.material, reportSources.process, reportSources.inspector, reportSources.risk],
    };
  }

  return {
    text: '我可以協助分析生產效率、供應商風險、良率異常、交期延遲，以及材料與製程變更。請輸入想查詢的主題，或使用上方快捷問題開始 Demo。',
    sources: [],
  };
}
