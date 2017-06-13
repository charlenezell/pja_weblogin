import v_tab from '../views/tab.es6';
import v_login from '../views/login.es6';
import v_loginName from '../views/loginName.es6';
import v_qqlogin from '../views/qqlogin.es6';
import v_quicklogin from '../views/quicklogin.es6';
import v_register from '../views/register.es6';
import {
  st,
  ValidateItem
} from '../util.es6';
import da from '../da.es6';

let root, ps = $({});
let option;
let gameConfig;
let vm = {};


function goBackLoginSuccess(loginSuccessType) {
  if (option.gameName == "pja") {

  } else {
    st("loginSuccess", loginSuccessType).then(function() {
      location.href = gameConfig.gameUrl;
    });
  }
}

ps.on("cDispatch", function(e, data) {
  if (data.type == "changeView") {
    vm.state = data.action;
    vm.tabIndex = data.index;
    renderView();
  } else if (data.type == "loginSuccess") {
    goBackLoginSuccess(data.loginSuccessType);
  }
});


/*入口*/
function init(_gameConfig, _option) {
  $("html").addClass("managertype__page")
  let actionToTabMap = {
    "register": 2,
    "login": 1,
    "loginName": 0
  };

  gameConfig = _gameConfig
  option = _option;
  $(option.root || "body").append(`<table class="type_page_container"><tr><td class="type_page_container__td">
  <div class="type_page_container__box"></div>
    </td></tr></table>`);
  root = $(".type_page_container__box");
  ps.trigger("cDispatch", {
    action: option.action,
    type: "changeView",
    index: actionToTabMap[option.action]
  })
}

function renderView() {
  if (vm.state == "register") {
    renderRegisterView();
  } else if (vm.state == "login") {
    renderLoginView();
  } else if (vm.state == "loginName") {
    renderLoginNameView();
  } else if (vm.state == "quicklogin") {
    renderQuickLoginView();
  } else if (vm.state == "loginSuccess") {
    renderLoginSuccessView();
  }
}

function renderTabView() {

  let menuList = [{
    name: "游戏名登录",
    action: "loginName"
  }, {
    name: "普通登录",
    action: "login"
  }, {
    name: "快速注册",
    action: "register"
  }];
  if (option.gameName == "pja") { //百田网不需要游戏名登录
    menubar.shift();
  }
  return v_tab.render({
    list: menuList,
    index: vm.tabIndex
  })
}

/*EventBinding*/

function bindTab() {
  root.find(".tabView").on("click", ".tabView__item", function() {
    let {
      action
    } = $(this).data();
    ps.trigger("cDispatch", {
      type: "changeView",
      action,
      index: $(this).index()
    });
  })
}

function bindQQLoginBtn() {
  root.find(".qqloginBtn").on("click", function(e) {
    e.preventDefault();
    let url = $(this).attr("href");
    var w = open(
      url,
      "newwindow",
      "height=600, width=800, top=200, left=300, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"
    );
    window.__qqloginSuccess = function(data) {
      w.close();
      if (data.loginSuccess) {
        ps.trigger("cDispatch", {
          type: "loginSuccess",
          loginSuccessType: "qq"
        });
      } else {

      }
    }
    return false;
  });
}

function doValidate(data, rule) {

  let ruleMap = {
    l_gameName: function(data) {
      return new ValidateItem(data, "游戏名").notEmpty();
    },
    l_password: function(data) {
      return new ValidateItem(data, "密码").max(16).min(6);
    },
    l_duoduoid: function(data) {
      return new ValidateItem(data, "多多号").isNumber();
    }
  }

  return ruleMap[rule](data);
}

function bindInputEvent() {
  $(".fieldItem01__input input", root).on("blur", function() {
    let v = $(this).val();
    let {
      validaterule
    } = $(this).data();
    let rst = doValidate(v, validaterule);
    if (!rst.status) {
      $(this).closest(".fieldItem01__input").addClass("fieldItem01__input--error");
      $(this).val(rst.detail);
      vm.isValid = false;
    }
  }).on("focus", function() {
    vm.isValid = true;
    if ($(this).closest(".fieldItem01__input").hasClass("fieldItem01__input--error")) {
      $(this).val("")
    }
    $(this).closest(".fieldItem01__input").removeClass("fieldItem01__input--error");
  })
}

function bindRegisterView() {
  bindTab();
  bindQQLoginBtn();
  bindInputEvent();
}

function bindLoginView() {
  bindTab();
  bindQQLoginBtn();
  bindInputEvent();
  root.find(".autologinCheckbox").click(function() {
    $(this).toggleClass("autologinCheckbox--on");
    let state = "false";
    if ($(this).hasClass("autologinCheckbox--on")) {
      state = "true"
    }
    $(this).siblings("input[name=autologin]").val(state)
  })
  let form = root.find("form");
  form.submit(function(e) {
    $(".fieldItem01__input input").blur();
    e.preventDefault();
    if (vm.isValid) {
      let postData = {};
      $.each(form.serializeArray(), (k, v) => {
        postData[v.name] = v.value;
      });
      da.checkGameName(gameConfig.checkgameNameRequest, postData.gameName).done(function(data) {
        if (data.returnCode != 0) {
          alert(data.returnDetail);
        } else {
          da.login(data.duoduoId, postData.password, postData.autologin);
        }
      });
    }
  });
}

function bindQuickLoginView() {

}

function bindLoginNameView() {
  bindTab();
  bindQQLoginBtn();
  bindInputEvent();
  root.find(".autologinCheckbox").click(function() {
    $(this).toggleClass("autologinCheckbox--on");
    let state = "false";
    if ($(this).hasClass("autologinCheckbox--on")) {
      state = "true"
    }
    $(this).siblings("input[name=autologin]").val(state)
  })
  let form = root.find("form");
  form.submit(function(e) {
    $(".fieldItem01__input input").blur();
    e.preventDefault();
    if (vm.isValid) {
      let postData = {};
      $.each(form.serializeArray(), (k, v) => {
        postData[v.name] = v.value;
      });
      da.checkGameName(gameConfig.checkgameNameRequest, postData.gameName).done(function(data) {
        if (data.returnCode != 0) {
          alert(data.returnDetail);
        } else {
          da.login(data.duoduoId, postData.password, postData.autologin);
        }
      });
    }
  });
}

/*PanelRender*/
function renderRegisterView() {
  root.html(`
    ${renderTabView()}
    ${v_register.render({qqUrl:gameConfig.qqbtnUrl})}
  `)
  bindRegisterView();
}


function renderLoginView() {
  root.html(`
    ${renderTabView()}
    ${v_login.render({qqUrl:gameConfig.qqbtnUrl,forgetUrl:gameConfig.forgetUrl})}
  `)
  bindLoginView();
}

function renderLoginNameView() {
  root.html(`
    ${renderTabView()}
    ${v_loginName.render({qqUrl:gameConfig.qqbtnUrl,forgetUrl:gameConfig.forgetUrl})}
  `)
  bindLoginNameView();
}


function renderQuickLoginView() {
  root.html(`
    ${renderTabView()}
    ${v_quicklogin.render()}
  `)
  bindQuickLoginView();
}


function renderLoginSuccessView() {

}


export default {
  init
}
