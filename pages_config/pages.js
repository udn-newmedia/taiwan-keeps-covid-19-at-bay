const contentGenerator = require('./contentGenerator.js')

// /* 內容文件 */
const monitorCode = contentGenerator('./contents/monitor.html');
const authorContent = contentGenerator('./contents/author.html');
const mainContent = contentGenerator('./contents/main_content.html');

/* 正式路徑 */
const pathRoot = process.env.NODE_ENV === 'production' ? 'https://udn.com/newmedia/taiwan-keeps-covid-19-at-bay/' : './';
/* 測試路徑 */
// const pathRoot = process.env.NODE_ENV === 'production' ? 'http://nmdap.udn.com.tw/newmedia/2020/taiwan-keeps-covid-19-at-bay/' : './';

/* 作者 */
const author = 'Lin Hsiu-Tzu(林秀姿), Tsai Pei-Jung(蔡佩蓉), Hung Hsin-Tzu(洪欣慈), Hsieh Wen-Chun(謝汶均), Su Shih-Yao(蘇士堯), Yang Juo-Yu(楊若榆), Chou Jung-Sheng(周融聖), New Media Center, Visual Design Center, Digital Center, Organized by United Daily News Group';

module.exports = {
  publicPath: pathRoot,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'How Taiwan Is Keeping COVID-19 at Bay',
      description: 'While the rest of the world continues to experience many adverse impacts from the novel coronavirus (COVID-19) pandemic, Taiwan has successfully been keeping COVID-19 at bay through its early and persistent intervention measures.The United Daily News has created an interactive timeline which summarizes the actions taken by the Taiwanese government to combat COVID-19.',
      keywords: 'COVID-19, Taiwan, Coronavirus, epidemic',
      author: author,
      datePublished: '2020-05-01 T12:00:00+08:00',
      dateModified: '2020-05-01 T12:00:00+08:00',
      MONITOR: monitorCode,
      CONTENT: mainContent + authorContent,
      pageUrl: pathRoot,
      publicPath: pathRoot,
    },
  }
}