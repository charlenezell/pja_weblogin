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

exports.ValidateItem=function ValidateItem(value,fieldName=""){
    this.data=value;
    this.status=true;
    this.fieldName=fieldName;
    this.detail="";
  }

  exports.ValidateItem.prototype={...exports.ValidateItem.prototype,
    notEmpty:function(){
      if(isArray(this.data)&&this.data.length==0){
        this.status=false;
        this.detail=`${this.fieldName}不能为空`;
      }else if(!$.trim(this.data)){
        this.status=false;
        this.detail=`${this.fieldName}不能为空`;
      }

      return this;
    },
    max:function(max){
      if(this.data.length>max){
        this.status=false;
        this.detail=`${this.fieldName}长度不能超过${max}`;
      }
      return this;
    },
    min:function(min){
      if(this.data.length<min){
        this.status=false;
        this.detail=`${this.fieldName}长度不能少于${min}`;
      }
      return this;
    },
    isNumber:function(){
      if(/\D/.test(this.data)){
        this.status=false;
        this.detail=`${this.fieldName}不能输入非数字`;
      }
      return this;
    },
    isUrl:function(domain){
      let urlReg=new RegExp(`^http(s)?:\/\/${domain?domain.replace(/[./()\[\]]/g,'\\$&'):''}`,"im");
      if(!urlReg.test(this.data)){
        this.status=false;
        this.detail=`${this.fieldName}请输入${domain?`${domain}域名下的`:''}正确url`;
      }
      return this;
    }
  };

exports.st=function st (stType,type){
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
