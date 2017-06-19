/*
 *getSaveData 保存的数据，字符串，保存后为utf-8格式
 *getFileName 文件名，记得加后缀
 *saveSuc 保存成功后的回调
 */
let da = require("../da.es6");
window.getSaveData=()=>{
  return `多多号：${window.globalRegisterSuccessDuoDuoId}\r\n
密码：${window.globalRegisterSuccessPassword}\r\n
${window.__gameConfig.registerSuccessDescription||''}`;
}

window.getFileName=()=>{
  return `我的${window.__gameConfig.name||''}多多号-${window.globalRegisterSuccessDuoDuoId}.txt`;
}


module.exports={
  render: function(duoduoId,password) {
    return `
      <div class="registerSuccessView">
        <div class="registerSuccessView__t">注册成功</div>
        <div class="registerSuccessView__r">你的多多号:${duoduoId}</div>
        <div class="registerSuccessView__r">你的密码:${password}</div>
        <div class="registerSuccessView__loginbtn">马上登陆</div>
        <div class="registerSuccessView__b">
          <div class="registerSuccessView__desc">怕忘记多多号？保存账号信息到桌面吧~</div>
          <object id="saveFlash" type="application/x-shockwave-flash" data="http://account.100bt.com/game/auth/deploy/savefile.swf"><param name="wmode" value="transparent"><param name="movie" value="http://account.100bt.com/game/auth/deploy/savefile.swf"><param name="quality" value="high"><param name="menu" value="false"><param name="allowScriptAccess" value="always"></object>
        </div>
      </div>
    `
  },
  bind: function(root,{ps}) {
    root.find(".registerSuccessView__loginbtn").click(function(){
      //此处进入的原因是注册成功，而后端在注册成功已经实现了login，所以这里我只需要直接刷新回去游戏即可
      ps.trigger("cDispatch",{
        type:"loginSuccess"
      });
      // da.login(window.globalRegisterSuccessDuoDuoId,window.globalRegisterSuccessPassword, window.globalRegisterSuccessAutologin, window.__option.gameName,"").done(data => {
      //   if (data.resultCode.code == 0) {
      //     ps.trigger("cDispatch",{
      //       type:"loginSuccess"
      //     });
      //   }else{//失败都进入登陆界面
      //     ps.trigger("cDispatch", {
      //       action: "login",
      //       type: "changeView",
      //       index: env.actionToTabMap["login"],
      //       duoduoId:window.globalRegisterSuccessDuoDuoId//带duoduo号登陆
      //     })
      //   }
      // });
    });
  }
}
