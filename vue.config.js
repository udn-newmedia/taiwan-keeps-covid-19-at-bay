const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}

const pagesConfig = require('./pages_config/pages.js');
const publicPath = pagesConfig.publicPath;
const pages = pagesConfig.pages;

module.exports = {
  publicPath,
  productionSourceMap: false,
  pages,
  chainWebpack: config => {
    config.module.rules.delete('eslint');
    config.resolve.alias
      .set('~', resolve('src/assets'))
  }
}