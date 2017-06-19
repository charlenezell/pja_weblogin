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

function goBackLoginSuccess() {
  // 登陆成功后的出口
  if (option.gameName == "pja") {

  } else {
    setTimeout(()=>{
      // console.log("jump back success");
      location.href=document.referrer;//直接跳回原来的页面
    },1500);
  }
}

ps.on("cDispatch", function (e, data) {
  // 事件的调度
  if (data.type == "changeView") {
    vm.state = data.action;
    vm.tabIndex = data.index;
    vm.duoduoId=data.duoduoId||"";
    renderView();
  } else if (data.type == "loginSuccess") {
    goBackLoginSuccess();
  } else if (data.type == "changeValidState") {
    vm.isValid = data.valid;
  } else if (data.type == "registerSuccess") {
    window.globalRegisterSuccessDuoDuoId = data.duoduoId;
    window.globalRegisterSuccessPassword = data.password;
    window.globalRegisterSuccessAutologin = data.autoLogin;
    renderRegisterSuccessView(data.duoduoId, data.password);
  } else if (data.type == "fieldItem01focus") {
    if (data.id == "realName" || data.id == "idCard") {
      prefillItem.changeState(data.id);
    }
  }else if(data.type=="commonAlert"){
    pageAlert(data.content);
  }
});
// function getImgFromConfig(data,key){
//   let g={};
//   $.each(data.relativeGameList,(k,v)=>{
//     g[v.name]=v
//   });
//   return g[key]||{};
// }
function injectGameJSONStyle(){
  //游戏json配置的页面注入样式，仅写入必要的样式
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
  .codeItem__label, .fieldItem01__label{
    ${__gameConfig.inputLabelColor?`color:${__gameConfig.inputLabelColor};`:''}
  }
  .codeItem__input input, .fieldItem01__input input{
    ${__gameConfig.inputDefaultBorderColor?`border-color:${__gameConfig.inputDefaultBorderColor};`:''}
    ${__gameConfig.inputDefaultBGColor?`background-color:${__gameConfig.inputDefaultBGColor};`:''}
    ${__gameConfig.inputDefaultFontColor?`color:${__gameConfig.inputDefaultFontColor};`:''}
  }
  .codeItem__input--error input, .fieldItem01__input--error input{
   ${__gameConfig.inputErrorBorderColor?`border-color:${__gameConfig.inputErrorBorderColor};`:''}
   ${__gameConfig.inputErrorBGColor?`background-color:${__gameConfig.inputErrorBGColor};`:''}
   ${__gameConfig.inputErrorFontColor?`color:${__gameConfig.inputErrorFontColor};`:''}
  }
  .qqloginRow {
    ${__gameConfig.thirdpartyLoginRowBorderColor?`border-color:${__gameConfig.thirdpartyLoginRowBorderColor};`:''}
  }
</style>
  `)
}

function injectGameCustomStyle(){
  if(__gameConfig.customStyleUrl){
    $(`<link rel="stylesheet" href="${__gameConfig.customStyleUrl}" />`).appendTo("head");
  }
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
          ${$.map(__gameConfig.relativeGameList,v=>{
            return `
            <a target="_blank" href="${v.link}" class="relativeGameItem relativeGameItem--${v.name}"><img src="${v.img}" alt="" /></a>
            `
          }).join("")}
        </div>
        <div class="relativeGame__r">
          <a  target="_blank" href="http://www.100bt.com/" class="relativeGameItem relativeGameItem--pja"></a>
        </div>
      </div>
      `)
  }
  root = $(".type_page_container__box");
  //可以直接初始化对应的界面，不传action时候为智能判断模式
  let curAction = option.action || getActionByJudge()||"register";
  ps.trigger("cDispatch", {
    action: curAction,
    type: "changeView",
    index: env.actionToTabMap[curAction],
    duoduoId:option.data.duoduoId
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
  $(".type_page_container__box").removeClass("type_page_container__box--move");
  setTimeout(function(){
    $(".type_page_container__box").addClass("type_page_container__box--move");
  },0);
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

/*相应tab的事件绑定操作，主要是胶合所有控件的绑定事件，一些view的通用事件响应会在自己内部实现*/

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
      st("startRegister")
      da.register(postData.password, postData.autologin, postData.name, postData.id, postData.code).done((data) => {
        if (data.resultCode.code == 0) {
          st("registerSuccess","返回了多多号");//todo
          ps.trigger("cDispatch", {
            type: "registerSuccess",
            duoduoId: data.value.duoduoId,
            password: postData.password,
            autologin:postData.autoLogin
          })
        }else{
          st("registerFail",data.resultCode.detail);//todo
          pageAlert(data.resultCode.detail);
          if(data.resultCode.code==-11){
            $("#validCode").find("input").val("");
            $("#validCode").find("img").click();
          }
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
      st("startlogin",postData.duoduoId);
      da.login(postData.duoduoid, postData.password, postData.autologin, window.__option.gameName, postData.code).done(data => {
        if (data.resultCode.code == 0) {
          st("loginSuccess");
          ps.trigger("cDispatch", {
            type: "loginSuccess"
          });
        }else{
          pageAlert(data.resultCode.detail);
          st("loginFail",data.resultCode.detail);//todo
          if(data.resultCode.code==-12){
            $("#login_duoduoid,#login_password").val("");
          }
          if(data.value.needCaptcha){
            $("#validCode").show().find("input");
            $("#validCode").find("img").click();
            if(data.resultCode.code==-11){
              $("#validCode").show().find("input").val("");
              $("#validCode").find("img").click();
            }
          }else{
            $("#validCode").hide().find("input");
          }
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
        if (data.code != 0) {
          pageAlert(data.detail);
          st("loginNameFail",data.detail);
        } else {
          st("startloginName",data.duoduoId);
          da.login(data.duoduoId, postData.password, postData.autologin, window.__option.gameName, postData.code).done(data => {
            if (data.resultCode.code == 0) {
              st("loginNameSuccess")
              ps.trigger("cDispatch", {
                type: "loginSuccess"
              });
            }else{
              st("loginNameFail",data.resultCode.detail);//todo
              pageAlert(data.resultCode.detail);
              if(data.value.needCaptcha){
                $("#validCode").show().find("input");
                $("#validCode").find("img").click();
                if(data.resultCode.code==-11){
                  $("#validCode").show().find("input").val("");
                  $("#validCode").find("img").click();
                }
              }else{
                $("#validCode").hide().find("input");
              }
            }
          });;
        }
      });
    }
  });
}


// 渲染tab内容方法（和上面的事件绑定对应使用）


function renderRegisterView() {
  da.checkRealNameNeeded().then(data => {
    root.html(`
      ${renderTabView()}
      <div class="xExtendbg__body">
      <div class="type_page_container__content">
      ${v_register.render({qqUrl:gameConfig.qqbtnUrl,ps,needRealName:(data.resultCode.code==0&&data.value.needIdCard?true:false)})}
      </div>
      </div>
      <div class="xExtendbg__foot"></div>
    `);
    bindRegisterView();
  }).fail(function(){
    pageAlert("暂时不能打开注册页面，请稍后再试");
  })

}


function renderLoginView() {
  // da.checkCodeNeeded().then(data => {
    root.html(`
    ${renderTabView()}
    <div class="xExtendbg__body">
    <div class="type_page_container__content">
    ${v_login.render({qqUrl:gameConfig.qqbtnUrl,forgetUrl:gameConfig.forgetUrl,needCode:false,ps,duoduoId:vm.duoduoId})}
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
      ${v_loginName.render({qqUrl:gameConfig.qqbtnUrl,forgetUrl:gameConfig.forgetUrl,needCode:false,ps})}
      </div>
      </div>
      <div class="xExtendbg__foot"></div>
    `)
    bindLoginNameView();
  // });
}


function renderQQLoginView() {
    // <iframe class="oauthQQFrame" src="/game/auth/redirect.html?duoduoId=123123123&isNewUser=true"></iframe>
  root.html(`
   ${renderTabView()}
   <div class="xExtendbg__body">
   <iframe class="oauthQQFrame" src="${env.backendHost}/game/auth/commonqqlogin.action?gameId=${__gameConfig.serverGameId}&gameName=${__gameConfig.serverName}"></iframe>
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


function renderRegisterSuccessView(duoduoId, password) {
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
