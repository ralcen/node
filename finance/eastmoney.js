/**
 * 国内数据查询示例：获取股票指数近十年指定月份的涨跌情况
 */

const axios = require('axios');
const moment = require('moment');

async function getStockIndexData(stockCode, month) {
    try {
        // 构造 secid 参数
        const secid = `1.${stockCode}`; // 假设股票代码前缀为 "1."

        const response = await axios.get('http://push2his.eastmoney.com/api/qt/stock/kline/get', {
            params: {
                secid,              // 股票代码
                fields1: 'f1,f2,f3,f4,f5,f6',
                fields2: 'f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61',
                klt: '101',         // 日K线
                fqt: '1',           // 前复权
                beg: '20140101',    // 开始日期
                end: '20240101',    // 结束日期
                lmt: '1000000',     // 最大条数
                _: Date.now()
            },
            headers: {
                'Referer': 'http://quote.eastmoney.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.data || !response.data.data || !response.data.data.klines) {
            throw new Error('数据格式错误');
        }

        const klineData = response.data.data.klines;
        const monthlyPerformance = {};

        klineData.forEach(line => {
            const [dateStr, open, close, high, low, volume] = line.split(',');
            const date = moment(dateStr, 'YYYY-MM-DD');

            // 根据传入月份筛选数据
            if (date.month() === month) {
                const year = date.year();

                if (!monthlyPerformance[year]) {
                    monthlyPerformance[year] = {
                        firstDay: null,
                        lastDay: null,
                        tradingDays: 0,
                        highestPrice: -Infinity,
                        lowestPrice: Infinity,
                        totalVolume: 0
                    };
                }

                monthlyPerformance[year].tradingDays++;
                monthlyPerformance[year].highestPrice = Math.max(monthlyPerformance[year].highestPrice, parseFloat(high));
                monthlyPerformance[year].lowestPrice = Math.min(monthlyPerformance[year].lowestPrice, parseFloat(low));
                monthlyPerformance[year].totalVolume += parseFloat(volume);

                if (!monthlyPerformance[year].firstDay || date.isBefore(moment(monthlyPerformance[year].firstDay.date))) {
                    monthlyPerformance[year].firstDay = {
                        date: dateStr,
                        close: parseFloat(close)
                    };
                }

                if (!monthlyPerformance[year].lastDay || date.isAfter(moment(monthlyPerformance[year].lastDay.date))) {
                    monthlyPerformance[year].lastDay = {
                        date: dateStr,
                        close: parseFloat(close)
                    };
                }
            }
        });

        console.log('\n股票近十年指定月份涨跌情况分析：');
        console.log('年份\t涨跌幅\t振幅\t\t交易天数');
        console.log('------------------------------------------------');

        Object.entries(monthlyPerformance)
            .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
            .slice(0, 10)
            .forEach(([year, data]) => {
                if (data.firstDay && data.lastDay) {
                    const change = ((data.lastDay.close - data.firstDay.close) / data.firstDay.close * 100).toFixed(2);
                    const amplitude = ((data.highestPrice - data.lowestPrice) / data.firstDay.close * 100).toFixed(2);
                    console.log(`${year}\t${change}%\t${amplitude}%\t${data.tradingDays}天`);
                }
            });

        const lastTenYears = Object.entries(monthlyPerformance)
            .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
            .slice(0, 10);

        const stats = lastTenYears.reduce((acc, [year, data]) => {
            const change = ((data.lastDay.close - data.firstDay.close) / data.firstDay.close * 100);
            acc.positiveYears += change > 0 ? 1 : 0;
            acc.totalChange += change;
            return acc;
        }, { positiveYears: 0, totalChange: 0 });

        console.log('\n统计信息：');
        console.log(`上涨年数：${stats.positiveYears}年`);
        console.log(`下跌年数：${10 - stats.positiveYears}年`);
        console.log(`平均涨跌幅：${(stats.totalChange / 10).toFixed(2)}%`);

    } catch (error) {
        console.error('数据获取失败：', error.message);
        if (error.response) {
            console.error('错误详情：', error.response.data);
        }
    }
}

// 示例调用
// getStockIndexData('000001', 0); // 查询上证指数1月数据
getStockIndexData('000906', 0); // 查询中证800指数1月数据
