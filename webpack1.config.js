const path = require('path');
const fs  = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));

module.exports = {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel', 
        query: {
            modifyVars: themeVariables,
          plugins: [
            ['import', { libraryName: "antd", style: true }]
          ]
        }
      },
    ]
  }