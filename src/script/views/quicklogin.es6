let {
  getHistoryList
} = require("../util.es6");
let env = require('../env.es6');
let da = require("../da.es6");
module.exports = {
  render: function () {
    return `
        ${$.map(getHistoryList(),v=>{
          return `
            <div class="quickLoginItem" data-token="${v.token}" data-duoduoid="${v.duoduoId}"><img src="" alt="" />${v.duoduoId}</div>
          `
        }).join('')}
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
      da.loginToken(duoduoid, token, window.__option.gameName).then(data => {
        if (data.code == 0) {
          ps.trigger("cDispatch", {
            type: "loginSuccess",
            loginSuccessType: "quickLogin"
          });
        }
      });
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