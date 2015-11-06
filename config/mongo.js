/**
 * mongod配置文件
 */
module.exports = {
  uri: 'mongodb://localhost/bookmark',
  options: {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  }
};
