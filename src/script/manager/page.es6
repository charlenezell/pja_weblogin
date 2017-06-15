let v_tab = require('../views/tab.es6');
let v_login = require('../views/login.es6');
let v_loginName = require('../views/loginName.es6');
let v_qqlogin = require('../views/qqlogin.es6');
let v_quicklogin = require('../views/quicklogin.es6');
let v_thirdpartyloginbtns = require('../views/thirdpartyloginbtns.es6');
let v_register = require('../views/register.es6');
let v_fieldItem = require('../views/fieldItem01.es6');
let v_codeItem = require('../views/codeitem.es6');
let v_checkbox = require('../views/checkboxItem.es6');
let v_registerSuccess = require('../views/registerSuccess.es6');
let prefillItem = require('../views/prefillItem.es6');
let {
  st,
  ValidateItem,
  getActionByJudge
} = require('../util.es6');
let {
  doValidate
} = require('../validate.es6');
let da = require('../da.es6');
let env = require('../env.es6');

let root, ps = $({});
let option;
let gameConfig;
let vm = {};
window.ggg=ps;

function pageAlert(data) {
  let box=$(".type_page_container__box").find(".type_page_container__box__alert")
  if(box.length<=0){
    $(`<table class="type_page_container__box__alert"><tr><td class="type_page_container__box__alert__ctn">
      <div class="type_page_container__box__alert__txt">

      </div>
      </td></tr>
      </table>`).appendTo(".type_page_container__box");
    box=$(".type_page_container__box").find(".type_page_container__box__alert")
  }
  box.height($(".type_page_container__box").outerHeight()).find(".type_page_container__box__alert__txt").text(data);
  box.show();
  setTimeout(()=>{
    box.hide();
  },1000)
}

function goBackLoginSuccess(loginSuccessType) {
  if (option.gameName == "pja") {

  } else {
    st("loginSuccess", loginSuccessType).then(function () {
      // location.href = gameConfig.gameCallbackUrl;
      console.log("jump back success");
    });
  }
}

ps.on("cDispatch", function (e, data) {
  if (data.type == "changeView") {
    vm.state = data.action;
    vm.tabIndex = data.index;
    renderView();
  } else if (data.type == "loginSuccess") {
    goBackLoginSuccess(data.loginSuccessType);
  } else if (data.type == "changeValidState") {
    vm.isValid = data.valid;
  } else if (data.type == "registerSuccess") {
    window.globalRegisterSuccessDuoDuoId = data.duoduoId;
    window.globalRegisterSuccessPassword = data.password;
    renderRegisterSuccessView(data.duoduoId, data.password);
  } else if (data.type == "fieldItem01focus") {
    if (data.id == "realName" || data.id == "idCard") {
      prefillItem.changeState(data.id);
    }
  }
});

function injectGameJSONStyle(){
$('head').append(`
<style>
  #pageRoot{
    background-image: url(${__gameConfig.bgImgUrl});
  }
  .tabView__item__bg--login{
      background-image: url(${__gameConfig.tabloginImg});
  }
  .tabView__item--on .tabView__item__bg--login{
      background-image: url(${__gameConfig.tabloginImg_on});
  }
  .tabView__item__bg--loginname{
      background-image: url(${__gameConfig.tabloginNameImg});
  }
  .tabView__item--on .tabView__item__bg--loginname{
      background-image: url(${__gameConfig.tabloginNameImg_on});
  }
  .tabView__item__bg--register{
      background-image: url(${__gameConfig.tabregisterImg});
  }
  .tabView__item--on .tabView__item__bg--register{
      background-image: url(${__gameConfig.tabregisterImg_on});
  }
  .xExtendbg__head{
    background-image: url(${__gameConfig.boxTopImgUrl});
  }
  .xExtendbg__body{
   background-image: url(${__gameConfig.boxRepeatImgUrl});
  }
  .xExtendbg__foot{
   background-image: url(${__gameConfig.boxBottomImgUrl});
  }
  .loginBtn{
    background-image: url(${__gameConfig.btnloginImg});
  }
  .registerBtn{
    background-image: url(${__gameConfig.btnregister});
  }
  .registerSuccessView__loginbtn{
    background-image: url(${__gameConfig.btnloginnowImg});
  }
  .prefillItem,.forgetlink,.quickloginBtm__registerbtn,.quickloginBtm__loginbtn,.quickLoginItem__id{
    color:${__gameConfig.mainColor||"#666"};
  }
</style>
  `)
}

function injectGameCustomStyle(){

}

/*入口*/
function init(_gameConfig, _option) {

  injectGameJSONStyle();
  injectGameCustomStyle();

  $("html").addClass("managertype__page");
  gameConfig = _gameConfig
  option = _option;

  let _root=$(option.root || "body");

  _root.append(`<table class="type_page_container"><tr><td class="type_page_container__td">
  <div class="type_page_container__box">

  </div>
    </td></tr></table>`);
  if (option.gameName != "pja") { //百田网不需要游戏名登录
    $(".type_page_container__td",_root).prepend(`
      <div class="relativeGame">
        <div class="relativeGame__l">
          <a target="_blank" href="http://aobi.100bt.com/" class="relativeGameItem relativeGameItem--aobi"></a>
          <a target="_blank" href="http://aola.100bt.com/" class="relativeGameItem relativeGameItem--aola"></a>
          <a target="_blank" href="http://lds.100bt.com/" class="relativeGameItem relativeGameItem--lds"></a>
          <a target="_blank" href="http://aoya.100bt.com/" class="relativeGameItem relativeGameItem--aoya"></a>
          <a target="_blank" href="http://aoqi.100bt.com/" class="relativeGameItem relativeGameItem--aoqi"></a>
          <a target="_blank" href="http://aoyi.100bt.com/" class="relativeGameItem relativeGameItem--aoyi"></a>
        </div>
        <div class="relativeGame__r">
          <div class="relativeGameItem relativeGameItem--pja"></div>
        </div>
      </div>
      `)
  }
  root = $(".type_page_container__box");
  //可以直接初始化对应的界面，不传action时候为智能判断模式
  let curAction = option.action || getActionByJudge();
  ps.trigger("cDispatch", {
    action: curAction,
    type: "changeView",
    index: env.actionToTabMap[curAction]
  })
}

function renderView() {
  if (vm.state == "register") {
    st("intoRegister");
    renderRegisterView();
  } else if (vm.state == "login") {
    st("intoLogin");
    renderLoginView();
  } else if (vm.state == "loginname") {
    st("intoLoginName");
    renderLoginNameView();
  } else if (vm.state == "quicklogin") {
    st("intoQuickLogin");
    renderQuickLoginView();
  } else if (vm.state == "qqlogin") {
    st("intoQQLogin");
    renderQQLoginView();
  }
}

function renderTabView() {

  let menuList = [{
    name: "游戏名登录",
    action: "loginname"
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
  return `
  <div class="xExtendbg__head">
  ${v_tab.render({
    list: menuList,
    index: vm.tabIndex
  })}
  </div>
  `
}

/*EventBinding*/

function bindTab() {
  v_tab.bind(root, {
    ps
  });
}

function bind3rdpartyLoginBtn() {
  v_thirdpartyloginbtns.bind(root, {
    ps
  });
}



function bindInputEvent() {
  v_fieldItem.bind(root, {
    ps,
    doValidate
  })
  v_codeItem.bind(root, {
    ps,
    doValidate
  })
}

function bindRegisterView() {
  bindTab();
  bind3rdpartyLoginBtn();
  bindInputEvent();
  prefillItem.bind(root);
  v_checkbox.bind(root);
  let form = root.find("form");
  form.submit(function (e) {
    $(".fieldItem01__input input ,.codeItem__input input").blur();
    e.preventDefault();
    if (vm.isValid) {
      let postData = {};
      $.each(form.serializeArray(), (k, v) => {
        postData[v.name] = v.value;
      });
      if (postData.serviceProtocoCheck == "false") {
        pageAlert("请同意用户服务协议");
        return false;
      }
      if (postData.promiseCheck == "false") {
        pageAlert("请同意拒绝沉迷承诺书");
        return false;
      }
      da.register(postData.password, postData.autologin, postData.name, postData.id, postData.code).done((data) => {
        if (data.code == 0) {
          ps.trigger("cDispatch", {
            type: "registerSuccess",
            duoduoId: data.duoduoId,
            password: data.password
          })
        }
      });

    }
  });
}

function bindqqloginView() {
  bindTab();
}

function bindLoginView() {
  bindTab();
  bind3rdpartyLoginBtn();
  bindInputEvent();
  v_checkbox.bind(root);
  let form = root.find("form");
  form.submit(function (e) {
    $(".fieldItem01__input input ,.codeItem__input input").blur();
    e.preventDefault();
    if (vm.isValid) {
      let postData = {};
      $.each(form.serializeArray(), (k, v) => {
        postData[v.name] = v.value;
      });
      da.login(postData.duoduoid, postData.password, postData.autologin, window.__option.gameName, postData.code).done(data => {
        if (data.code == 0) {
          ps.trigger("cDispatch", {
            type: "loginSuccess",
            loginSuccessType: "login"
          });
        }else if(data.code==-1){
          $("#validCode").show().find("input").blur();
          $("#validCode").find("img").click();
        }
      });
    }
  });
}

function bindQuickLoginView() {
  v_quicklogin.bind(root, {
    ps
  });
}

function bindLoginNameView() {
  bindTab();
  bind3rdpartyLoginBtn();
  bindInputEvent();
  v_checkbox.bind(root);
  let form = root.find("form");
  form.submit(function (e) {
    $(".fieldItem01__input input ,.codeItem__input input").blur();
    e.preventDefault();
    if (vm.isValid) {
      let postData = {};
      $.each(form.serializeArray(), (k, v) => {
        postData[v.name] = v.value;
      });
      da.checkGameName(gameConfig.checkgameNameRequest, postData.gameName).done(function (data) {
        if (data.returnCode != 0) {
          pageAlert(data.returnDetail);
        } else {
          da.login(data.duoduoId, postData.password, postData.autologin, window.__option.gameName, postData.code).done(data => {
            if (data.code == 0) {
              ps.trigger("cDispatch", {
                type: "loginSuccess",
                loginSuccessType: "loginName"
              });
            }
          });;
        }
      });
    }
  });
}

/*PanelRender*/

function renderRegisterView() {
  da.checkRealNameNeeded().then(data => {
    root.html(`
      ${renderTabView()}
      <div class="xExtendbg__body">
      <div class="type_page_container__content">
      ${v_register.render({qqUrl:gameConfig.qqbtnUrl,ps,needRealName:data.need})}
      </div>
      </div>
      <div class="xExtendbg__foot"></div>
    `)
  })
  bindRegisterView();
}


function renderLoginView() {
  // da.checkCodeNeeded().then(data => {
    root.html(`
    ${renderTabView()}
    <div class="xExtendbg__body">
    <div class="type_page_container__content">
    ${v_login.render({qqUrl:gameConfig.qqbtnUrl,forgetUrl:gameConfig.forgetUrl,needCode:true,ps})}
    </div>
    </div>
    <div class="xExtendbg__foot"></div>
  `)
    bindLoginView();
  // });
}

function renderLoginNameView() {
  // da.checkCodeNeeded().then(data => {
    root.html(`
      ${renderTabView()}
      <div class="xExtendbg__body">
      <div class="type_page_container__content">
      ${v_loginName.render({qqUrl:gameConfig.qqbtnUrl,forgetUrl:gameConfig.forgetUrl,needCode:true,ps})}
      </div>
      </div>
      <div class="xExtendbg__foot"></div>
    `)
    bindLoginNameView();
  // });
}

function renderQQLoginView() {
  root.html(`
   ${renderTabView()}
   <div class="xExtendbg__body">
   <iframe class="oauthQQFrame" src="https://graph.qq.com/oauth/show?which=Login&display=pc&client_id=101361466&redirect_uri=http%3A%2F%2Faccount.9aoduo.com%2Fqq%2Fqqlogincallback.action%3Fop%3Dcallback%2526referer%253Dhttp%253A%252F%252Fmy.100bt.com%252Fuc%252FqqCallback.html%25253FgId%25253D999%252526refer%25253Dhttp%25253A%25252F%25252Faola.100bt.com%25252Fshuafa%25252F0list_yabilianji.html&response_type=code&state=deecf136d1d4ee581a2128ad164ba81a&scope=get_user_info"></iframe>
   </div>
   <div class="xExtendbg__foot"></div>
   `);
  bindqqloginView();
}

function renderQuickLoginView() {
  root.html(`
    <div class="xExtendbg__head">
      <div class="quickLoginHeader">使用已有账号快速进入${__gameConfig.name}</div>
    </div>
    <div class="xExtendbg__body">
    ${v_quicklogin.render()}
    </div>
    <div class="xExtendbg__foot"></div>

  `)
  bindQuickLoginView();
}


function renderRegisterSuccessView(duoduoId, password) { //先做注册页面回来再集成注册成功
  root.html(`
    ${renderTabView()}
    <div class="xExtendbg__body">
    <div class="type_page_container__content">
      ${v_registerSuccess.render(duoduoId,password)}
    </div>
    </div>
    <div class="xExtendbg__foot"></div>
  `);
   bindTab();
  v_registerSuccess.bind(root,{ps});
}


module.exports = {
  init
}
