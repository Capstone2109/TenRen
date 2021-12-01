const path = require('path');
const fs  = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));


module.exports = {
    rules: [
      {
        rules: [
            
            {
              test: /\.less$/,
              use: [
                {loader: "style-loader"},
                {loader: "css-loader"},
                {loader: 'babel-loader'},
                {loader: "less-loader",
                  options: {
                    modifyVars: themeVariables
                  }
                }
              ]
            }
          ],

        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/,
        options: {
            presets: [
                '@babel/preset-react'
              ],
          plugins: [
            ['import', { libraryName: "antd", style: true }]
          ]
        },
      },
      
    ]
}