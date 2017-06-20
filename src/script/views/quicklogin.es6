let {
  getHistoryList,
  st
} = require("../util.es6");
let env = require('../env.es6');
let da = require("../da.es6");
module.exports = {
  render: function () {
    return `
    <div class="quickLoginItemList">
        ${$.map(getHistoryList().slice(0,3),v=>{

          return `
            <span class="quickLoginItem quickLoginItem--${v.gameId}" data-token="${v.token}" data-duoduoid="${v.duoduoId}">
              <span class="quickLoginItem__img"></span>
              <span class="quickLoginItem__id">${v.duoduoId}</span>
              <span class="quickLoginItem__game">在玩${v.gameName}</span>
            </span>
          `
        }).join('')}
        </div>
        <div class="quickloginBtm">
          <span class="quickloginBtm__registerbtn">注册新账号</span>|<span class="quickloginBtm__loginbtn">其他账号登陆</span>
        </div>
        `
  },
  bind: function (root, {
    ps
  }) {
    root.find(".quickLoginItem").click(function () {
      let {
        token,
        duoduoid
      } = $(this).data();
      if(!token){
        ps.trigger("cDispatch", {
          action: "login",
          type: "changeView",
          index: env.actionToTabMap["login"],
          duoduoId:duoduoid//带duoduo号登陆
        })
      }else{
        st("startQuickLogin",duoduoid);
        ps.trigger("cDispatch",{
          type:"commonAlert",
          content:"正在尝试登陆请稍后..."
        });
        da.loginToken(duoduoid, token, window.__option.gameName).then(data => {
          if (data.resultCode.code == 0) {
            st("quickLoginSuccess")
            ps.trigger("cDispatch", {
              type: "loginSuccess"
            });
          }else{
            st("quickLoginFail",data.resultCode.detail);
            /*if(data.resultCode.code==-14){*///失败都跳出到登陆界面
              ps.trigger("cDispatch", {
                action: "login",
                type: "changeView",
                index: env.actionToTabMap["login"],
                duoduoId:duoduoid//带duoduo号登陆
              })
            /*}*//*else{
              ps.trigger("cDispatch", {
                type: "commonAlert",
                content:data.resultCode.detail
              })
            }*/
          }
        });
      }

    });
    root.find(".quickloginBtm__registerbtn").click(function () {
      ps.trigger("cDispatch", {
        action: "register",
        type: "changeView",
        index: env.actionToTabMap["register"]
      })
    })
    root.find(".quickloginBtm__loginbtn").click(function () {
      ps.trigger("cDispatch", {
        action: "login",
        type: "changeView",
        index: env.actionToTabMap["login"]
      })
    })
  }
}
