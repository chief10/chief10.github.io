
const fs = require('fs');
const webpack = require('webpack');


module.exports = function () {
  const config = {
    entry: {},
    output: {
      filename: '[name].js',
      path: __dirname + '/assets/js'
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.csv$/,
          loader: 'csv-loader',
          options: {
            dynamicTyping: true,
            header: false,
            skipEmptyLines: true
          }
        }
      ]
    }
  };

  let graphNames = fs.readdirSync('./graphs');

  graphNames.forEach((graph) => {
    config.entry[graph] = `./graphs/${graph}/${graph}.js`
  });


  return config;
}
