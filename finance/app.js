/**
 * https://github.com/gadicc/node-yahoo-finance2/blob/devel/docs/modules/historical.md
 */
const axios = require('axios');

const apiKey = 'NMV2USXWPO1JME4S'; // 替换为你的API密钥
const symbol = 'NDX'; // 纳斯达克指数
const date = '2024-12-26';

const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`;

axios.get(url)
  .then(response => {
    const data = response.data;
    const dailyData = data['Time Series (Daily)'];
    const dateData = dailyData[date];
    const close = dateData['4. close'];
    const volume = dateData['5. volume'];
    
    console.log(`收盘价: ${close}`);
    console.log(`成交量: ${volume}`);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
