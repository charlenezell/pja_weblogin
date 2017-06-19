var loginconfig={
  "name":"奥雅之光",//快速登陆有入口
  "dataAppId":"123123123",//数据统计后台需要的Appid,
  "serverName":"奥雅",
  "serverGameId":"4",
  //可变高度宽度的弹窗的上中下图片
  "boxTopImgUrl":"http://localhost:3000/game/auth/aoya/bk/box_t.png",
  "boxBottomImgUrl":"http://localhost:3000/game/auth/aoya/bk/box_b.png",
  "boxRepeatImgUrl":"http://localhost:3000/game/auth/aoya/bk/box_g.png",
  //背景图会居中显示
  "bgImgUrl":"http://localhost:3000/game/auth/aoya/bk/bg.png",
  //三个tab按钮的两帧状态图片
  "tabloginImg":"http://localhost:3000/game/auth/aoya/bk/login.jpg",
  "tabloginImg_on":"http://localhost:3000/game/auth/aoya/bk/login_h.jpg",
  "tabloginNameImg":"http://localhost:3000/game/auth/aoya/bk/loginname.jpg",
  "tabloginNameImg_on":"http://localhost:3000/game/auth/aoya/bk/loginname_h.jpg",
  "tabregisterImg":"http://localhost:3000/game/auth/aoya/bk/register.jpg",
  "tabregisterImg_on":"http://localhost:3000/game/auth/aoya/bk/register_h.jpg",
  //三个主要按钮的图片
  "btnloginImg":"http://localhost:3000/game/auth/aoya/bk/login.png",
  "btnloginnowImg":"http://localhost:3000/game/auth/aoya/bk/loginnow.png",
  "btnregister":"http://localhost:3000/game/auth/aoya/bk/register.png",
  //自定义样式文件比如奥义的宣传图要做特殊形式这个需要项目组自己修改样式，这个不在支撑那边做特殊实现
  "customStyleUrl":"http://localhost:3000/game/auth/aoya/bk/css.css",

  //主要颜色(一些特殊位置会用到这个颜色值比如忘记密码的链接)
  "mainColor":"#9966cc",
  //下面不填会用设计好的默认值
  // "thirdpartyLoginRowBorderColor":"red",
  // "inputLabelColor":"red",
  // "inputDefaultBorderColor":"green",
  // "inputDefaultBGColor":"#f90",
  // "inputDefaultFontColor":"blue",
  // "inputErrorBorderColor":"blue",
  // "inputErrorBGColor":"#0ff",
  // "inputErrorFontColor":"red",
  //上面不填会用设计好的默认值
  //忘记密码的url
  "forgetUrl":"http://account.9aoduo.com/getbackpwd/getBackPwd.action?action=toinput",
  //检查游戏名的url(返回格式和传参的格式依约定并支持jsonp即可)
  "checkgameNameRequest":"http://login.aoya.100bt.com/userQuery.jsonp",
  //注册成功写文件保存多多奥的文件的描述信息可自定义
  "registerSuccessDescription":"奥雅官网：aoya.100bt.com",
  //服务协议链接
  "serviceProtocoUrl":"http://aola.100bt.com/play/website/tos6.html",
  //承诺书链接
  "promiseUrl":"http://aola.100bt.com/play/website/tos9.html",
  //这里是页面上部的左侧的相关游戏推荐列表，链接图片顺序都是游戏自己定下，最多是支持六个，特殊的样式则游戏自己在customStyleUrl里面实现，如附件css所示
  "relativeGameList":[
    {
      "link":"http://aoya.100bt.com",
      "img":"http://localhost:3000/game/auth/aoya/bk/aoya.png",
      "name":"aoya"
    },
    {
      "link":"http://aobi.100bt.com",
      "img":"http://localhost:3000/game/auth/aoya/bk/aobi.png",
      "name":"aobi"
    },
    {
      "link":"http://aola.100bt.com",
      "img":"http://localhost:3000/game/auth/aoya/bk/aola.png",
      "name":"aola"
    },
    {
      "link":"http://aoqi.100bt.com",
      "img":"http://localhost:3000/game/auth/aoya/bk/aoqi.png",
      "name":"aoqi"
    },
    {
      "link":"http://lds.100bt.com",
      "img":"http://localhost:3000/game/auth/aoya/bk/lds.png",
      "name":"lds"
    },
     {
      "link":"http://aoyi.100bt.com",
      "img":"http://localhost:3000/game/auth/aoya/bk/aoyi.png",
      "name":"aoyi"
    }
  ]
}
