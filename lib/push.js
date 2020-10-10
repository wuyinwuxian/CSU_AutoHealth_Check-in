var axios = require('axios')
const PUSH_URL = `http://pushplus.hxtrip.com/send`
async function push(title,content,token) {
  res = await axios.get(PUSH_URL+`?token=${token}&title=${title}&content=${content}&template=html`)
  //console.log(res.data.msg)
  if (res.data.msg == '请求成功') {
    console.log('微信推送成功')
  } else {
    console.log('微信推送失败')
  }
}
module.exports = push
