import {
  getOpenTickets,
  getReviewTickets,
  getCriticalTickets,
  getMTTR,
  getPieChartData,
  getReopenPercentage,
  getErrorTrend,
  getRecetTickets,
  getUnstableModules,
} from "@/rechartsData/getDashboardData";

export async function getReportData() {
  const [
    openTickets,
    reviewTickets,
    criticalTickets,
    mttr,
    pieChartData,
    reopenPercentage,
    errorTrend,
    recentTickets,
    unstableModules,
  ] = await Promise.all([
    getOpenTickets(),
    getReviewTickets(),
    getCriticalTickets(),
    getMTTR(),
    getPieChartData(),
    getReopenPercentage(),
    getErrorTrend(),
    getRecetTickets(),
    getUnstableModules(),
  ]);

  return {
    openTickets,
    reviewTickets,
    criticalTickets,
    mttr,
    pieChartData,
    reopenPercentage,
    errorTrend,
    recentTickets,
    unstableModules,
  };
}
