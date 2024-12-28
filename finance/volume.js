const yahooFinance = require('yahoo-finance2').default;
const ExcelJS = require('exceljs');
const moment = require('moment');

// {
//     "const": "1d",
//     "type": "string"
//   },
//   {
//     "const": "1wk",
//     "type": "string"
//   },
//   {
//     "const": "1mo",
//     "type": "string"
//   }

  

async function fetchData(ticker, startDate, endDate) {
    return await yahooFinance.historical(ticker, {
        period1: new Date(startDate),
        period2: new Date(endDate),
        interval: '1d',
    });
}

function exportToExcel(data, fileName) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    worksheet.columns = [
        { header: '日期', key: 'date', width: 15 },
        { header: '成交量(万)', key: 'volume', width: 20 },
        { header: '收盘价', key: 'close', width: 15 },
        { header: '最高价', key: 'high', width: 15 },
        { header: '最低价', key: 'low', width: 15 },
    ];

    data.forEach(record => {
        worksheet.addRow({
            date: moment(record.date).format('YYYY-MM-DD'),
            volume: Number((record.volume / 10000).toFixed(2)),
            close: record.close,
            high: record.high,
            low: record.low,
        });
    });

    workbook.xlsx.writeFile(fileName)
        .then(() => console.log(`Excel 文件已创建: ${fileName}`))
        .catch(err => console.error('保存 Excel 文件时出错:', err));
}

// function analyzeData(data) {
//     const latestPrice = data[data.length - 1].close;
//     const firstPrice = data[0].close;
//     const priceChange = ((latestPrice - firstPrice) / firstPrice) * 100;

//     const avgVolume = data.reduce((sum, record) => sum + record.volume, 0) / data.length / 1e8;
//     const volatility = data.reduce((sum, record) => sum + ((record.high - record.low) / record.low), 0) / data.length * 100;

//     return { priceChange, avgVolume, volatility };
// }

// function printAnalysis(result) {
//     console.log('\n数据分析结果:');
//     console.log(`期间价格变化: ${result.priceChange.toFixed(2)}%`);
//     console.log(`月均成交量: ${result.avgVolume.toFixed(2)}万`);
//     console.log(`月均波动率: ${result.volatility.toFixed(2)}%`);

//     console.log('\n投资建议:');
//     console.log(result.priceChange > 0 ? '- 指数呈上涨趋势' : '- 指数呈下跌趋势');
//     console.log(result.volatility > 15 ? '- 高波动性，需风险管理' : '- 波动性中等，适合长期持有');
// }

async function main(ticker, startDate, endDate) {
    try {
        console.log('正在获取数据...');
        const data = await fetchData(ticker, startDate, endDate);

        console.log('正在生成 Excel 文件...');
        exportToExcel(data, `${ticker}_${startDate}_${endDate}_Data.xlsx`);

        // console.log('正在分析数据...');
        // const analysisResult = analyzeData(data);
        // printAnalysis(analysisResult);
    } catch (error) {
        console.error('发生错误:', error);
    }
}

// 示例调用
// main('^IXIC', '2019-01-01', '2024-12-27');
main('000001.SS', '2019-01-01', '2024-12-27');
