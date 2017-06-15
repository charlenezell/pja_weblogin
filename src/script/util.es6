/**
 * 下面验证代码来自客服支撑
 */
//封装了私有变量/提供公共接口isWeak()
//调用方法 var instance=new WeakPasswordChecker()
//              instance.isWeak("passwordStrings")

var WeakPasswordChecker = function() {
  this.isWeak = function(s) {
    if (containLetter(s))
      return false;
    else if (passwordCheckRule_1(s) && passwordCheckRule_2(s) && passwordCheckRule_3(s) && passwordCheckRule_4(s)) {
      return false;
    } else
      return true;

  }
  var containLetter = function(passWord) //判断是不是纯数字，是返回false，不是返回true
    {
      for (var i = 0; i < passWord.length; i++) {
        if (passWord.charAt(i) < "0" || passWord.charAt(i) > "9") {
          return true;
        }
      }
      return false;
    }

  var passwordCheckRule_1 = function(passWord) //只包含一个数字，是返回false，不是返回true
    {
      var a = passWord.charAt(0);
      for (var i = 1; i < passWord.length; i++) {
        if (passWord.charAt(i) != a)
          return true;
      }
      return false;
    }

  var passwordCheckRule_2 = function(passWord) //只包含两个数字，是返回false，不是返回true
    {
      var a = passWord.charAt(0);
      var index = 0;
      var j = 0;
      for (var i = 1; i < passWord.length; i++) {
        if (passWord.charAt(i) != a) {
          index = i;
          break;
        } else
          j = j + 1;
        if (j == (passWord.length - 1))
          return false;
      }
      for (var k = index + 1; k < passWord.length; k++) {
        if (passWord.charAt(k) != passWord.charAt(0) && passWord.charAt(k) != passWord.charAt(index))
          return true;
      }
      return false;
    }

  var passwordCheckRule_3 = function(passWord) //升序，是返回false，不是返回true
    {
      var a = Number(passWord.charAt(0));
      if (a + passWord.length - 1 > 9)
        return true;
      else {
        for (var i = 1; i <= passWord.length - 1; i++) {
          if (Number(passWord.charAt(i)) != ++a)
            return true;
        }
        return false;
      }

    }

  var passwordCheckRule_4 = function(passWord) //降序，是返回false，不是返回true
    {
      var a = Number(passWord.charAt(0));
      if (passWord.length - a - 1 > 0)
        return true;
      else {
        for (var i = 1; i <= passWord.length - 1; i++) {
          if (Number(passWord.charAt(i)) != --a)
            return true;
        }
        return false;
      }

    }

}

let isArray = function(arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
};
(function() {
  var RegEx = /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/;

  function getDomain(str) {
    return str.match(RegEx)[3];
  }

  function getParts(str) {
    return str.match(RegEx);
  }

  function getSearchQuery(str, key) {
    return getQuerys(str.match(RegEx)[8], key);
  }

  function getHashQuery(str, key) {
    return getQuerys(str.match(RegEx)[9] ? str.match(RegEx)[9].substring(1) : false, key);
  }

  function getQuerys(str, key) {
    if (str) {
      var keyReg = new RegExp("(?:^|&)" + key + "(?:[=]?)(.*?)(?=&|$)", "i"),
        commonReg = new RegExp("(?:^|&)(.+?)(?=&|$)", "gi"),
        objects = {},
        j, w;
      if (key) {
        j = keyReg.exec(str);
        return j ? j[1] : null;
      } else {
        while (w = commonReg.exec(str)) {
          var s = w[1].match(/(^[a-zA-Z0-9]+?)=(.*)/);
          if (s) {
            objects[$.trim(s[1])] = s[2]
          } else {
            objects[$.trim(w[1])] = ""
          }
        }
        return objects
      }
    } else {
      return {}
    }
  }

  exports.qs = {
    getDomain: getDomain,
    getSearchQuery: getSearchQuery,
    getHashQuery: getHashQuery,
    getQuerys: getQuerys,
    getParts: getParts
  };

})();

module.exports.ValidateItem = function ValidateItem(value, fieldName = "") {
  this.data = value;
  this.status = true;
  this.fieldName = fieldName;
  this.detail = "";
}

exports.ValidateItem.prototype = {...exports.ValidateItem.prototype,
    notEmpty: function() {
      if (isArray(this.data) && this.data.length == 0) {
        this.status = false;
        this.detail = `${this.fieldName}不能为空`;
      } else if (!$.trim(this.data)) {
        this.status = false;
        this.detail = `${this.fieldName}不能为空`;
      }

      return this;
    },
    max: function(max) {
      if (this.data.length > max) {
        this.status = false;
        this.detail = `${this.fieldName}长度不能超过${max}`;
      }
      return this;
    },
    min: function(min) {
      if (this.data.length < min) {
        this.status = false;
        this.detail = `${this.fieldName}长度不能少于${min}`;
      }
      return this;
    },
    sameAs: function(v2) {
      if (this.data != v2) {
        this.status = false;
        this.detail = `${this.fieldName}输入框不一致`;
      }
      return this;
    },
    isNumber: function() {
      if (/\D/.test(this.data)) {
        this.status = false;
        this.detail = `${this.fieldName}不能输入非数字`;
      }
      return this;
    },
    strongEnough: function() {
      var instance = new WeakPasswordChecker();
      if (instance.isWeak(this.data)) {
        this.status = false;
        this.detail = `${this.fieldName}太简单不够安全哦~`;
      }
      return this;
    },
    isIdCard: function() {
      if (!/^\d{17}[0-9xX]$/.test(this.data)) {
        this.status = false;
        this.detail = `你输入的身份信息不对哦`;
      }
      return this;
    },
    isUrl: function(domain) {
        let urlReg = new RegExp(`^http(s)?:\/\/${domain?domain.replace(/[./()\[\]]/g,'\\$&'):''}`, "im");
        if (!urlReg.test(this.data)) {
          this.status = false;
          this.detail = `${this.fieldName}请输入${domain?`${domain}域名下的`:''}正确url`;
      }
      return this;
    }
  };

module.exports.st=function st (stType,type){
  //
  console.log("send Stastic:",stType,type);
  return $.Deferred().resolve();
//   统计需求
//  普通登录页面访问用户数（初始化调用）1
//  普通登录页面成功登录用户数（登录时候调用）2
//  游戏名登录页面访问用户数（初始化时调用）3
//  游戏名登录页面成功登录用户数（登录时调用）4
//  快速注册页面访问用户数（初始化调用）5
//  快速注册页面成功注册用户数（注册时调用）6
//  快速登录页面的访问用户数（初始化调用）7
//  经过快速登录页面成功登录的用户数（登陆时候调用）8
}

function cookie(key, value, options) {
  if (arguments.length > 1 && String(value) !== "[object Object]") {
    options = {...options};
    if (value === null || value === undefined) {
      options.expires = -1;
    }
    if (typeof options.expires === 'number') {
      var minute = options.expires,
        t = options.expires = new Date();
      t.setMinutes(t.getMinutes() + minute);
    }
    value = String(value);
    return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
  }
  options = value || {};
  var result, decode = options.raw ? function(s) {
    return s;
  } : decodeURIComponent;
  return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
}
cookie.support=(function(){
  let g=false;
  cookie("mytestofcookie","mytestofcookie");
  if(cookie("mytestofcookie")){
    g=true;
  }
  cookie("mytestofcookie",null,{
    expires:"1990-01-01"
  })
  return g;
})();

module.exports.cookie=cookie;
window.ccc=cookie;
//后端历史cookie格式如下
// gameId=4,gameName=奥雅之光,duoduoId=10014,token=xxx;gameId=4,gameName=奥雅之光,duoduoId=10013,token=xxx;gameId=2,gameName=奥拉星,duoduoId=10011,token=xxx

//后端当前登录用户cookie格式如下
//gameId=4,gameName=奥雅之光,duoduoId=10014,token=xxx,autoLogin=false,QQOpenId=xxx,QQNickName=xxx,QQGender=xxx,QQAvatarUrl=xxx

function tokenStrToObj(v){
  let kws=v.split(",");
  let rst={}
  $.each(kws,(k,v)=>{
    let kw=v.split("=");
    rst[kw[0]]=kw[1];
  })
  return rst;
}

let getHistoryList=function(){
  //这里会取出公共写的历史记录cookie,提取出前三个，同时如果有当前已成功登录的状态信息则合并进去历史记录里面
  //eg 历史是["duoduoId1-token1","duoduoId2","duoduoId3-token2"]
  //当前有登陆状态的是duoduoId1则不做处理，如果是duoduoId2的话就吧token传入快速登录的界面让该用户可以因为有登陆态而直接登陆（尽管用户没有勾选自动登录的选项）
  let history=cookie("his_auth_sid");
  let current=cookie("web_auth_sid");
  if(!$.trim(history)){//没有历史应该也不会有当前登录态
      return false;
  }
  if(current){
    current=tokenStrToObj(current);
  }

  let historyList=$.map(history.split(";"),v=>{//登录态肯定是在历史记录里面所以只需要遍历历史记录替换一下空token位当前态的token即可
    let c=tokenStrToObj(v);
    if(current.duoduoId==c.duoduoId&&!c.token){
      return {
        duoduoId:c.duoduoId,
        token:current.token
      };
    }else{
      return c;
    }
  });

  return historyList;

}
module.exports.getHistoryList=getHistoryList;

module.exports.getActionByJudge=function(){
  let action="register";//默认是注册
  let history=getHistoryList();
  if(history){
    action="quicklogin"//如果有历史记录则打开快速登录
  }
  return action;
}


exports.support = {};
exports.support.placeholder = (function() {
    var i = document.createElement("input");
    return typeof i.placeholder !== 'undefined';
  }());
exports.placeholder = function(ele) {
      if (!exports.support.placeholder) {
        var defaultWord = ele.attr("placeholder");
        ele.focus(function() {
          $(this).val() == defaultWord && $(this).val("");
        }).blur(function() {
          $.trim($(this).val()) == "" && $(this).val(defaultWord);
        }).trigger("blur",{isInit:true});
      }
    }
