var axios = require('axios')
var cheerio = require('cheerio')
var qs  = require('qs')
var push = require('./push')
var date = new Date()
    date.setHours(date.getHours() + 8)
var year = date.getFullYear()
var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1):date.getMonth() + 1
var day = date.getDate() < 10 ? "0" + date.getDate():date.getDate()
var dateStr = year + "" + month + "" + day
var created = Math.round(new Date() / 1000)


const INDEX_URL = 'https://wxxy.csu.edu.cn/ncov/wap/default/index'
const SAVE_URL = 'https://wxxy.csu.edu.cn/ncov/wap/default/save'
const LOGIN_URL = 'http://ca.its.csu.edu.cn/home/login/215'



async function sign(cookie,token) {

const header = {
   headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    'Cookie' : cookie ,
    }
}

//尝试登录
res = await axios.get(INDEX_URL, header)

// console.log(res.data)
const $ = cheerio.load(res.data)
if ($("title").text() == '健康打卡'){
    console.log('登录成功')

    //正则获取昨日打卡信息
    regex = new RegExp("oldInfo: (.*),");
    old_info = regex.exec(res.data)[1]
    regex2 = new RegExp("hasFlag: \'(.*)\'");
    hasFlag = regex2.exec(res.data)[1]
    regex3 = new RegExp("def = ([\\s\\S]*?);");
    def = regex3.exec(res.data)[1]
    var jsonstr =JSON.parse(def)

    jsonstr.ismoved = "0"
    createdTemp = jsonstr.created
    jsonstr.created = created
    jsonstr.date = dateStr
    jsonstr.address = JSON.parse(jsonstr.geo_api_info).formattedAddress
    jsonstr.province = JSON.parse(jsonstr.geo_api_info).addressComponent.province
    jsonstr.city = JSON.parse(jsonstr.geo_api_info).addressComponent.city
    jsonstr.area = JSON.parse(jsonstr.geo_api_info).addressComponent.province + " "+JSON.parse(jsonstr.geo_api_info).addressComponent.city + " "+JSON.parse(jsonstr.geo_api_info).addressComponent.district


    console.log(jsonstr)

    console.log(dateStr)


    //判断昨日是否打卡成功
    if(hasFlag){
        console.log('你已经打过卡了')
        title ='健康打卡成功'
        content =`你已经打过卡了，无需自动打卡\r打卡时间：${jsonstr.date}\r打卡位置：${jsonstr.area}\r精确位置：${jsonstr.address}\r时间戳：${createdTemp}`
        push(encodeURI(title),encodeURI(content),token)

        }else{
        console.log('今日未打卡，打卡中')
        axios.post(SAVE_URL,qs.stringify(jsonstr),header)
        .then(res=>{
        console.log('res=>',res.data); 

        if (res.data.e == "0"){
            
        console.log('打卡成功')
        title = '健康打卡成功'
        content =`云函数已为你自动打卡\r打卡日期：${jsonstr.date}\r打卡位置：${jsonstr.area}\r精确位置：${jsonstr.address}\r时间戳：${created}`   
        push(encodeURI(title),encodeURI(content),token)
        }else{

        console.log('打卡失败')
        title = '健康打卡失败'
        content =`自动打卡失败，请尝试手动打卡\r返回参数：${res.data.m}`  
        push(encodeURI(title),encodeURI(content),token)

        }        
    })
        

    }

}else{
    console.log('登录失败')
    title = '健康打卡失败'
    content = '登陆失败，有可能是cookie失效了'
}

}
module.exports = sign
