const path = require('path');
const fs  = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));

module.exports = {
    entry: [
      './src/index.js'
    ],
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          
          test: /\.less$/,
          exclude: /node_modules/,
          use: [
            {loader: "style-loader"},
            {loader: "css-loader"},
            {loader: "less-loader",
              options: {
                modifyVars: themeVariables
              }
            }
          ],
          options: {
            presets: [
              '@babel/preset-react'
            ],
            plugins: [
                ['import', { libraryName: "antd", style: true }]
            ]
          }
        }
      ]
    }
  }
  