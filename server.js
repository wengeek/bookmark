var webpack = require('webpack');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var path = require('path');
var config = require('./webpack.config');
var prodConfig = require('./webpack.production.config');
var app = express();
var fs = require('fs');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var mongoConfig = require('./config/mongo');

var env = app.get('env');

var port = process.env.PORT || 3000;
var staticPath = path.join(__dirname, 'public');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'bookmark',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      db: 'bookmark'
    })
}));

//连接mongodb
function connect() {
  mongoose.connect(mongoConfig.uri, mongoConfig.options);
}

connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

//后端API路由
app.use('/api', require('./api'));

if ('production' === env) {
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
        //创建服务器
        app.use(express.static(staticPath));

        app.get('/*', function(req, res) {
          res.sendFile(path.join(staticPath, 'index.html'));
        });

        app.listen(port, function(err) {
          if (err) {
            console.log(err);
            return;
          }

          console.log('Listening at http://localhost:' + port);
        });
      });
    });

  });
} else {
  //调试环境
  var compiler = webpack(config);

  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, 
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  }));
  
  app.use(require("webpack-hot-middleware")(compiler));

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });  

  app.listen(port, function(err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Listening at http://localhost:' + port);
  });
}
