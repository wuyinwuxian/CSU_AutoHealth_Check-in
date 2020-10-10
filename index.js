var sign = require('./lib/sign')

exports.main_handler = async () => {
    cookie ='eai-sess=c8uc3hg3bcpj1xxxxxx823usxx; UUkey=a3e2782afb89d9dc92xxxxxxc312efxx; BIGipServerpool_wxxy.csu.edu.cn=xxx; Hm_lvt_48b682d4885d22a90111e46b972xxxxx=xxx,xxx,xxx,xxx; Hm_lpvt_48b682d4885d22a90111e46b9xxxxxx8=xxx' //获取到的Cookie,可能会失效
    
    token='b33767552b3e43xxxxxa78d59f672xxx' //pushplus的token

    sign(cookie,token)
};
