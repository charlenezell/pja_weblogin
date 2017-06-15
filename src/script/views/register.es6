let thirdpartyloginbtns = require('./thirdpartyloginbtns.es6');
let fieldItem =require('./fieldItem01.es6');
let forgetLink =require('./forgetlink.es6');
let codeItem =require('./codeitem.es6');
let checkbox =require('./checkboxItem.es6');
let prefillItem =require('./prefillItem.es6');
// cname,name,tips,rule,type
module.exports= {
    render:function({qqUrl,forgetUrl,ps,needRealName}){
        return `
        ${thirdpartyloginbtns.render({url:qqUrl})}
        <form id="registerForm">
        ${fieldItem.render(
          {cname:"密码:",name:"gameName",tips:"请输入6-16位的密码",rule:"r_password",id:"r_password",noautocomplete:true,isPassword:true})}
        ${fieldItem.render(
          {cname:"重复密码:",name:"password",tips:"请再次输入你的密码",rule:"r_password2",target:"#r_password",noautocomplete:true,isPassword:true})}
        ${(function(){
          if(needRealName){
            return `${fieldItem.render(
          {cname:"姓名:",name:"name",tips:"如:张三",rule:"r_name",id:"realName",classname:"special01"})}

            ${prefillItem.render(
          {word:"如:张三",tofill:"张三",target:"#realName"})}

            ${fieldItem.render(
          {cname:"身份证号:",name:"id",tips:"如:440206199707071051",rule:"r_id",id:"idCard",classname:"special01"})}

            ${prefillItem.render(
          {word:"如:440206199707071051",tofill:"440206199707071051",target:"#idCard"})}

          `;}
        })()}
        ${codeItem.render(
          {cname:"验证码:",name:"code",tips:"请输入右面数字",rule:"code"})}

        <div class="formlo01 formlo01--registerbtnrow">
          <div class="formlo01__l"></div><div class="formlo01__r">
            <input type="submit" value="注册按钮" class="registerBtn" />
            ${checkbox.render({
              word:"下次自动登录",
              key:"autologin"
            })}
          </div>
        </div>
        <div class="registerView__protocos">
          ${checkbox.render({
              word:`我同意<a href="${window.__gameConfig.serviceProtocoUrl}" target="_blank">用户服务协议</a>`,
              key:"serviceProtocoCheck"
            })}
          ${checkbox.render({
              word:`我同意<a href="${window.__gameConfig.promiseUrl}" target="_blank">拒绝沉迷承诺书</a>`,
              key:"promiseCheck"
            })}
        </div>
        </form>
        `
    }
}
