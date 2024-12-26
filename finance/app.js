// 使用示例
const yahooFinance = require("yahoo-finance2").default;

// interface HistoricalData {
//   date: Date; // 交易日期
//   open: number; // 开盘价
//   high: number; // 最高价
//   low: number; // 最低价
//   close: number; // 收盘价
//   volume: number; // 成交量
//   adjClose: number; // 调整后收盘价（考虑分红派息）
// }

async function getStockData() {
  try {
    // 获取实时报价
    // const quote = await yahooFinance.quote("000906.SS");
    // console.log(quote.regularMarketPrice);

    // 获取历史数据
    const historical = await yahooFinance.historical('000906.SS', {
      period1: '2024-12-01',
      period2: '2024-12-24'
    });
    console.log(historical);

    // 获取多只股票数据
    // const quotes = await yahooFinance.quote(['AAPL', 'MSFT', 'GOOG']);
    // console.log(quotes);
  } catch (err) {
    console.error(err);
  }
}
getStockData();

// 格式化关键数据
// const analysis = {
//   基本信息: {
//     股票代码: quote.symbol,
//     公司名称: quote.shortName,
//     当前价格: quote.regularMarketPrice,
//     涨跌幅: `${quote.regularMarketChangePercent.toFixed(2)}%`,
//     成交量: quote.regularMarketVolume.toLocaleString(),
//   },

//   估值指标: {
//     市值: `${(quote.marketCap / 1e9).toFixed(2)}B`,
//     市盈率: quote.peRatio?.toFixed(2) || "暂无",
//     股息率: quote.dividendYield
//       ? `${(quote.dividendYield * 100).toFixed(2)}%`
//       : "暂无",
//   },

//   技术指标: {
//     "52周最高": quote.fiftyTwoWeekHigh,
//     "52周最低": quote.fiftyTwoWeekLow,
//     "50日均线": quote.fiftyDayAverage,
//     "200日均线": quote.twoHundredDayAverage,
//   },
// };
