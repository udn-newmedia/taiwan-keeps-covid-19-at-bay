const contentGenerator = require('./contentGenerator.js')

// /* 內容文件 */
const monitorCode = contentGenerator('./contents/monitor.html');
const authorContent = contentGenerator('./contents/author.html');
const mainContent = contentGenerator('./contents/main_content.html');

/* 正式路徑 */
const pathRoot = process.env.NODE_ENV === 'production' ? '__online__' : './';
/* 測試路徑 */
// const pathRoot = process.env.NODE_ENV === 'production' ? '__test__' : 'http://localhost:8080/';

/* 作者 */
const author = 'Lin Hsiu-Tzu(林秀姿), Tsai Pei-Jung(蔡佩蓉), Hung Hsin-Tzu(洪欣慈), Hsieh Wen-Chun(謝汶均), Su Shih-Yao(蘇士堯), Yang Juo-Yu(楊若榆)';

module.exports = {
  publicPath: pathRoot,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'How Taiwan Is Keeping COVID-19 at Bay',
      description: 'While the rest of the world continues to experience many adverse impacts from the Novel Coronavirus (COVID-19) pandemic, Taiwan’s success during the fight against this viral infection has been notably recognized. What has Taiwan done to keep COVID-19 at bay?',
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