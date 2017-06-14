/*
 *getSaveData 保存的数据，字符串，保存后为utf-8格式
 *getFileName 文件名，记得加后缀
 *saveSuc 保存成功后的回调
 */
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
        <div class="registerSuccess__t">注册成功</div>
        <div class="registerSuccessView__r">你的多多号:</div>
        <div class="registerSuccessView__r">你的密码:</div>
        <div class="registerSuccessView__loginbtn">马上登陆</div>
        <div class="registerSuccessView__b">
          <div class="registerSuccessView__desc">怕忘记多多号？保存账号信息到桌面吧~</div>
          <object id="saveFlash" type="application/x-shockwave-flash" data="http://account.9aoduo.com/appid/savefile.swf"><param name="wmode" value="transparent"><param name="movie" value="/appid/savefile.swf"><param name="quality" value="high"><param name="menu" value="false"><param name="allowScriptAccess" value="always"></object>
        </div>
      </div>
    `
  },
  bind: function(root,{ps}) {
    root.find(".registerSuccessView__loginbtn").click(function(){
      ps.trigger("cDispatch",{
        type:"loginSuccess",
        loginSuccessType:"register"
      })
    });
  }
}
