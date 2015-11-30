var rtn = require('./rtn');
/**
 * 返回响应
 */
function send(res, data, status,  msg) {
  res.status(200).json({
    rtn: status || rtn.SUCCESS,
    data: data,
    msg: msg
  })
};

/**
 * 返回错误
 */
function handleError(res, msg, status) {
  send(res, null, status || rtn.ERROR, msg);
};

module.exports = {
  send: send,
  handleError: handleError
};
