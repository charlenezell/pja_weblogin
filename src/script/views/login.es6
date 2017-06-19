let thirdpartyloginbtns = require('./thirdpartyloginbtns.es6');
let fieldItem = require('./fieldItem01.es6');
let forgetLink = require('./forgetlink.es6');
let checkbox = require('./checkboxItem.es6');
let codeItem = require('./codeitem.es6');
module.exports={
    render:function({qqUrl,forgetUrl,needCode,ps,duoduoId}){
        return `
        ${thirdpartyloginbtns.render({url:qqUrl})}
        <form id="loginForm">
        ${fieldItem.render(
          {cname:"多多号:",name:"duoduoid",tips:"请输入多多号",rule:"l_duoduoid",value:duoduoId,id:"login_duoduoid",noautocomplete:true})}
        ${fieldItem.render(
          {cname:"密码:",name:"password",tips:"请输入密码",rule:"l_password",isPassword:true,id:"login_password",noautocomplete:true})}
        ${codeItem.render(
          {cname:"验证码:",name:"code",tips:"请输入右面数字",rule:"code",hide:needCode?false:true,id:"validCode"})}
        <div class="formlo01">
          <div class="formlo01__l"></div><div class="formlo01__r">
            ${checkbox.render({
              word:"下次自动登录",
              key:"autologin"
            })}
            ${forgetLink.render({url:forgetUrl})}
          </div>
        </div>
        <div class="formlo01">
          <div class="formlo01__l"></div><div class="formlo01__r">
            <input type="submit" value="登陆按钮" class="loginBtn" />
          </div>
        </div>
        </form>
        `
    }
}
