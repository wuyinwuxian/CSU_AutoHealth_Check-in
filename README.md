# 中南大学自动健康打卡云函数（支持微信推送）
**注意**：本项目采用腾讯云函数运行，无需购买服务器，门槛几乎为零

**声明**：项目仅用于学习交流，身体异常请如实打卡，身体不适请及时就医！！！


### 为什么采用云函数？
1. 无需购买服务器，对小白友好

2. 有免费额度，无需额外付费

3. 配置信息仅自己可见，不用担心泄露给第三方

4. 可定时，不用担心忘记打卡

## 获取Cookie

1. 打开浏览器，访问网站 https://wxxy.csu.edu.cn/ncov/wap/default/index , 按F12打开控制台

2. 最上面一排，选Network 

![picture](https://raw.githubusercontent.com/SuInk/PictureBed/main/picture/83e305943fc214399f7445be45ccf3ca1602332571.png)

3. 选网页的刷新按钮，会出现一大堆文件，然后点击index，右边会有HTTP请求的相关信息

4. 选择Headers，找到Cookie ，复制Cookie 

![picture](https://raw.githubusercontent.com/SuInk/PictureBed/main/picture/5015a47033025b5508bb514d1f2f33761602345465.jpeg)

5. UM_distinctid=; UUkey=; eai-sess=; BIGipServerpool_wxxy.csu.edu.cn=; Hm_lvt_48b682d4885d22a90111e46b972e3268=; Hm_lpvt_48b682d4885d22a90111e46b972e3268=  。改版了一共六个东西都复制好，直接在cookie上右键，选择复制值就行


## 获取pushplus的token
访问http://pushplus.hxtrip.com
选择一对一推送，复制token   这儿就是为了每天打卡后推送给你的手机微信，所以微信登陆下就行，注意：这儿的token不要把后面的空格复制进去了，因为我干了这样的蠢事

![picture](https://raw.githubusercontent.com/SuInk/PictureBed/main/picture/584f0922a3cfead1255d6065e80a2b231602334075.jpeg)



## 创建云函数
1. clone 此项目'git clone 项目地址',不太懂得可以参考[git 安装+开始第一个GitHub项目](https://blog.csdn.net/qq_43657442/article/details/118708480) 。如果都没听过git的，可以选择 Download Zip，然后解压到一个文件夹下即可

2. 访问https://cloud.tencent.com/product/scf ，点击管理控制台，初次登陆要你认证啥的，可能稍稍麻烦点，微信扫码一步步来就行

3. 然后再首页左角云产品哪儿点进去，搜索云函数，点击进去，这儿可能说要你授权巴拉巴拉，授权就行，琐碎一点，就快成功了，俺们坚持下，我当时瞎摸索了半天，原作者应该是用习惯了腾讯云得，所以很多东西对他来讲就是没必要讲，苦了我

4. 函数服务-新建-自定义创建-选事件函数-填写函数名称(csu-auto-sign)-选择运行环境（nodejs10.15）

5. 函数代码哪儿选择本地上传文件夹，选择我们刚刚克隆或者下载解压好得文件夹，上传。点击完成，其他的什么高级设置呀暂时不管

6. 然后他会自动跳转到配置页面，点击触发管理 - 创建触发器- 触发周期改一哈，改成自定义触发周期-写Cron表达式（秒	分钟	小时	日	月	星期	年）按空格分隔。我的就是（0 30 0 * * * *）代表每天00:30:00打卡-提交

7. 点击函数管理，函数代码，它默认打开index.js（第一次打开加载编辑器可能比较慢） ，把你自己得Cookie（就是上面得那六个东东）复制替换到第四行赋值给cookie变量，token（第二步获得得东西）也是复制你自己的替换

8. 然后一直往下拉最下面有一行蓝色得东西，点击自动安装依赖 从关闭-->打开，然后点击自动部署，也是从关闭-->打开。

9. 然后点击部署，然后测试这一流程建议早上没打卡得时候部署测试，如果没有意外得话，应该就能打上卡了，微信推送打卡成功，你也可以自己去打卡系统看一眼，最下面得提交按钮应该变灰色了

10. 有啥问题请联系qq: 2721288915, 当然我不一定会 同时感谢原作者 [SuInk](https://github.com/SuInk)

## 注意
 
 再次重申，项目仅用于学习交流，身体异常请如实打卡，身体不适请及时就医！！！莫要害人






