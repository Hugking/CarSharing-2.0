let signedParam = (param) => {
  const md5 = require('./md5')
  param.app_id = 2124926955
  let app_key = "kIaa1wgEB9s5GQ3H"
  // param.app_id = 2111312439
  // let app_key = 'w2NDul0yGsGkf34G'
  // 签名
  let querystring =
    Object.keys(param)
    .filter(function(key) {
      return (
        param[key] !== undefined
      )
    })
    .sort()
    .map(function(key) {
      return key + '=' + encodeURIComponent(param[key])
    })
    .join('&') +
    '&app_key=' +
    app_key
  // console.log(querystring)
  let sign = md5(querystring).toUpperCase()
  param.sign = sign
  return param
}
module.exports = {
  signedParam
};