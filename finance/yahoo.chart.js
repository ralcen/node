/**
 * https://github.com/gadicc/node-yahoo-finance2/blob/devel/docs/modules/chart.md
 */
const yahooFinance = require('yahoo-finance2').default;


async function fetchData(ticker, startDate, endDate) {
    return await yahooFinance.chart(ticker, {
        period1: new Date(startDate),
        period2: new Date(endDate),
        interval: '1d',
    });
}


async function main(ticker, startDate, endDate) {
    try {
        console.log('正在获取数据...');
        const data = await fetchData(ticker, startDate, endDate);

        console.log('数据获取成功:', data);
        

        console.log('正在生成 Excel 文件...');
        // exportToExcel(data, `${ticker}_${startDate}_${endDate}_Data.xlsx`);

        // console.log('正在分析数据...');
      
    } catch (error) {
        console.error('发生错误:', error);
    }
}

main('000906.SS', '2024-12-01', '2024-12-27');