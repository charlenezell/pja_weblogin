module.exports = {
  render: function () {
    return `
          <div class="qqloginRow">无需注册第三方登陆:<span class="qqloginBtn" title="qq登陆"></span></div>
        `
  },
  bind: function (root, {
    ps
  }) {
    window.qqloginCallback = function () {
      ps.trigger("cDispatch", {
        type: "loginSuccess",
        loginSuccessType: "qqlogin"
      });
    }
    root.find(".qqloginBtn").on("click", function (e) {
      e.preventDefault();
      ps.trigger("cDispatch", {
        action: "qqlogin",
        type: "changeView"
      })
      // let url = $(this).attr("href");
      // var w = open(
      //   url,
      //   "newwindow",
      //   "height=600, width=800, top=200, left=300, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"
      // );
      // window.__qqloginSuccess = function(data) {
      //   w.close();
      //   if (data.loginSuccess) {
      //     ps.trigger("cDispatch", {
      //       type: "loginSuccess",
      //       loginSuccessType: "qq"
      //     });
      //   } else {

      //   }
      // }
      return false;
    });
  }
}
