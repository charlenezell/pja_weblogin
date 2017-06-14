let v_tab =require('../views/tab.es6');
let v_login =require('../views/login.es6');
let v_loginName =require('../views/loginName.es6');
let v_qqlogin =require('../views/qqlogin.es6');
let v_quicklogin =require('../views/quicklogin.es6');
let v_qqloginbtn =require('../views/qqloginbtn.es6');
let v_register =require('../views/register.es6');
let v_fieldItem =require('../views/fieldItem01.es6');
let v_codeItem =require('../views/codeitem.es6');
let v_checkbox =require('../views/checkboxItem.es6');
let v_registerSuccess =require('../views/registerSuccess.es6');
let prefillItem =require('../views/prefillItem.es6');
let {
  st,
  ValidateItem,
  getActionByJudge
} = require('../util.es6');
let  {doValidate} =require ('../validate.es6');
let  da =require ('../da.es6');
let  env =require ('../env.es6');

let root, ps = $({});
let option;
let gameConfig;
let vm = {};


function pageAlert(data){
  alert(data);
}

function goBackLoginSuccess(loginSuccessType) {
  if (option.gameName == "pja") {

  } else {
    st("loginSuccess", loginSuccessType).then(function() {
      location.href = gameConfig.gameCallbackUrl;
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
  }else if (data.type=="changeValidState"){
    vm.isValid=data.valid;
  }else if(data.type=="registerSuccess"){
    window.globalRegisterSuccessDuoDuoId=data.duoduoId;
    window.globalRegisterSuccessPassword=data.password;
    renderRegisterSuccessView(data.duoduoId,data.password);
  }else if(data.type=="fieldItem01focus"){
    if(data.id=="realName"||data.id=="idCard"){
      prefillItem.changeState(data.id);
    }
  }
});


/*入口*/
function init(_gameConfig, _option) {

  $("html").addClass("managertype__page");
  gameConfig = _gameConfig
  option = _option;
  $(option.root || "body").append(`<table class="type_page_container"><tr><td class="type_page_container__td">
  <div class="type_page_container__box"></div>
    </td></tr></table>`);
  root = $(".type_page_container__box");
  //可以直接初始化对应的界面，不传action时候为智能判断模式
  let curAction=option.action||getActionByJudge();
  ps.trigger("cDispatch", {
    action: curAction,
    type: "changeView",
    index: env.actionToTabMap[curAction]
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
  } else if (vm.state=="qqlogin"){
    renderQQLoginView();
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
  v_tab.bind(root,{ps});
}

function bindQQLoginBtn() {
  v_qqloginbtn.bind(root,{ps});
}



function bindInputEvent() {
  v_fieldItem.bind(root,{ps,doValidate})
  v_codeItem.bind(root,{ps,doValidate})
}

function bindRegisterView() {
  bindTab();
  bindQQLoginBtn();
  bindInputEvent();
  prefillItem.bind(root);
  v_checkbox.bind(root);
  let form = root.find("form");
  form.submit(function(e) {
    $(".fieldItem01__input input ,.codeItem__input input").blur();
    e.preventDefault();
    if (vm.isValid) {
      let postData = {};
      $.each(form.serializeArray(), (k, v) => {
        postData[v.name] = v.value;
      });
      if(postData.serviceProtocoCheck=="false"){
        pageAlert("请同意用户服务协议");
        return false;
      }
      if(postData.promiseCheck=="false"){
        pageAlert("请同意拒绝沉迷承诺书");
        return false;
      }
        da.register(postData.password, postData.autologin, postData.name,postData.id,postData.code).done((data)=>{
             if(data.code==0){
              ps.trigger("cDispatch",{
                type:"registerSuccess",
                duoduoId:data.duoduoId,
                password:data.password
              })
             }
        });

    }
  });
}
function bindqqloginView(){
  bindTab();
}
function bindLoginView() {
  bindTab();
  bindQQLoginBtn();
  bindInputEvent();
  v_checkbox.bind(root);
  let form = root.find("form");
  form.submit(function(e) {
    $(".fieldItem01__input input ,.codeItem__input input").blur();
    e.preventDefault();
    if (vm.isValid) {
      let postData = {};
      $.each(form.serializeArray(), (k, v) => {
        postData[v.name] = v.value;
      });
      da.login(postData.duoduoid, postData.password, postData.autologin,window.__option.gameName,postData.code);
    }
  });
}

function bindQuickLoginView() {
  v_quicklogin.bind(root,{ps});
}

function bindLoginNameView() {
  bindTab();
  bindQQLoginBtn();
  bindInputEvent();
  v_checkbox.bind(root);
  let form = root.find("form");
  form.submit(function(e) {
    $(".fieldItem01__input input ,.codeItem__input input").blur();
    e.preventDefault();
    if (vm.isValid) {
      let postData = {};
      $.each(form.serializeArray(), (k, v) => {
        postData[v.name] = v.value;
      });
      da.checkGameName(gameConfig.checkgameNameRequest, postData.gameName).done(function(data) {
        if (data.returnCode != 0) {
          pageAlert(data.returnDetail);
        } else {
          da.login(data.duoduoId, postData.password, postData.autologin,window.__option.gameName,postData.code);
        }
      });
    }
  });
}

/*PanelRender*/
function renderRegisterView() {
  da.checkRealNameNeeded().then(data=>{
    root.html(`
      ${renderTabView()}
      ${v_register.render({qqUrl:gameConfig.qqbtnUrl,ps,needRealName:data.need})}
    `)
  })
  bindRegisterView();
}


function renderLoginView() {
  da.checkCodeNeeded().then(data=>{
  root.html(`
    ${renderTabView()}
    <div class="type_page_container__content">
    ${v_login.render({qqUrl:gameConfig.qqbtnUrl,forgetUrl:gameConfig.forgetUrl,needCode:data.need,ps})}
    </div>
  `)
  bindLoginView();
  });
}

function renderLoginNameView() {
  da.checkCodeNeeded().then(data=>{
    root.html(`
      ${renderTabView()}
      <div class="type_page_container__content">
      ${v_loginName.render({qqUrl:gameConfig.qqbtnUrl,forgetUrl:gameConfig.forgetUrl,needCode:data.need,ps})}
      </div>
    `)
    bindLoginNameView();
  });
}

function renderQQLoginView(){
  root.html(`
   ${renderTabView()}
   <div class="type_page_container__content">
   <iframe class="oauthQQFrame" src="https://graph.qq.com/oauth/show?which=Login&display=pc&client_id=101361466&redirect_uri=http%3A%2F%2Faccount.9aoduo.com%2Fqq%2Fqqlogincallback.action%3Fop%3Dcallback%2526referer%253Dhttp%253A%252F%252Fmy.100bt.com%252Fuc%252FqqCallback.html%25253FgId%25253D999%252526refer%25253Dhttp%25253A%25252F%25252Faola.100bt.com%25252Fshuafa%25252F0list_yabilianji.html&response_type=code&state=deecf136d1d4ee581a2128ad164ba81a&scope=get_user_info"></iframe>
   </div>
   `);
  bindqqloginView();
}

function renderQuickLoginView() {
  root.html(`
    ${v_quicklogin.render()}
  `)
  bindQuickLoginView();
}


function renderRegisterSuccessView(duoduoId,password) {//先做注册页面回来再集成注册成功
  root.html(`
    ${renderTabView()}
    <div class="type_page_container__content">
      ${v_registerSuccess.render(duoduoId,password)}
    </div>
  `)
}


module.exports={init}
