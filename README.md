# 中南大学自动健康打卡云函数（支持微信推送）
**注意**：本项目采用腾讯云函数运行，无需购买服务器，门槛几乎为零

**声明**：身体异常请如实打卡，身体不适请及时就医！！！


### 为什么采用云函数？
1. 无需购买服务器，对小白友好
2. 有免费额度，无需额外付费
3. 配置信息仅自己可见，不用担心泄露给第三方
4. 可定时，不用担心忘记打卡

## 获取Cookie
1. 打开浏览器，按F12打开控制台
2. 选Network
![picture](https://raw.githubusercontent.com/SuInk/PictureBed/main/picture/83e305943fc214399f7445be45ccf3ca1602332571.png)
3. 访问网站https://wxxy.csu.edu.cn/ncov/wap/default/index
4. 在控制台选择Headers，复制Cookie
![picture](https://raw.githubusercontent.com/SuInk/PictureBed/main/picture/5015a47033025b5508bb514d1f2f33761602345465.jpeg)

## 获取pushplus的token
访问http://pushplus.hxtrip.com
选择一对一推送，复制token
![picture](https://raw.githubusercontent.com/SuInk/PictureBed/main/picture/584f0922a3cfead1255d6065e80a2b231602334075.jpeg)
## 创建云函数
1. 下载此项目，选择Download Zip
![picture](https://raw.githubusercontent.com/SuInk/PictureBed/main/picture/b41e3bcef62c672ff035ef0e728e9cce1602332572.png)
2. 下载完成后，用360压缩解压文件，请确保index.js在文件夹根目录
3. 访问https://cloud.tencent.com/product/scf，点击管理控制台
![picture](https://raw.githubusercontent.com/SuInk/PictureBed/main/picture/0968c6b7ce60fdd42f1270c08e442be91602332574.png)
4. 函数服务-新建云函数，填写函数名称(csu-auto-sign)，选择nodejs10.15、空白函数，点击下一步
![picture](https://raw.githubusercontent.com/SuInk/PictureBed/main/picture/90180b6eb56ae6dab32338a303df026a1602332576.png)
5. 选择本地上传文件夹，上传方式选在线安装依赖，点击完成
6. 点击函数代码，把Cookie复制到index.js中
![picture](https://raw.githubusercontent.com/SuInk/PictureBed/main/picture/3831b7390459192d6ad7c4759df7a4461602332582.png)
7. 创建触发器
![picture](https://raw.githubusercontent.com/SuInk/PictureBed/main/picture/5ad5a48509af0a403a6bb27528a9e9811602345463.png)
下图代表7点05自动触发
![picture](https://raw.githubusercontent.com/SuInk/PictureBed/main/picture/dcefc6dbca0fc9084064ac0e0e0b2c451602345460.png)



