var webpack = require('webpack');
var path = require('path');
var prodConfig = require('./webpack.production.config');
var fs = require('fs');

var staticPath = path.join(__dirname, 'public');

console.log('Webpack now compiles.');
//启动webpack编译
webpack(prodConfig, function(err, stats) {
  if (err) {
    console.log(err);
    return;
  }

  var assets = stats.toJson().assets.reverse(), key, asset, jsScripts = '', cssLinks = '';
  for (key in assets) {
    asset = assets[key];
    if (asset.name.endsWith('.css')) {
      cssLinks += '<link rel="stylesheet" href="/' + asset.name + '">';
    }
    if (asset.name.endsWith('.js')) {
      jsScripts += '<script src="/' + asset.name + '"></script>';
    }      
  }

  console.log('Compiling the html.');
  //修改模板文件
  fs.readFile(path.join(__dirname, 'index.html'), function(err, data) {
    if (err) {
      console.log(err);
      return;
    }

    var indexTemp = data.toString(), indexCompiled;
  
    indexCompiled = indexTemp.replace(/<!--cssstart-->[\s\S]+<!--cssend-->/m, cssLinks);
    indexCompiled = indexCompiled.replace(/<!--jsstart-->[\s\S]+<!--jsend-->/m, jsScripts);      

    //写入文件
    fs.writeFile(path.join(staticPath, 'index.html'), indexCompiled, {encoding: 'utf8'}, function(err) {
      if (err) {
        console.log('Compiled failed. Please try later.');
        return;
      }

      console.log('Compiled Success.');
    });
  });

});
