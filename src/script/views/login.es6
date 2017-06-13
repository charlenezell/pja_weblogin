import qqloginbtn from './qqloginbtn.es6';
import fieldItem from './fieldItem01.es';
import forgetLink from './forgetlink.es';
// cname,name,tips,rule,type
export default {
    render:function({qqUrl,forgetUrl}){
        return `
        ${qqloginbtn.render({url:qqUrl})}
        <form id="loginForm">
        ${fieldItem.render(
          {cname:"多多号:",name:"gameName",tips:"请输入多多号",rule:"l_duoduoid"})}
        ${fieldItem.render(
          {cname:"密码:",name:"password",tips:"请输入密码",rule:"l_password"})}
        <div class="formlo01">
          <div class="formlo01__l"></div><div class="formlo01__r">
            <input type="hidden" name="autologin" />
            <span class="autologinCheckbox">
            <span class="autologinCheckbox__i">a</span><span class="autologinCheckbox__word">自动登录</span>
            </span>
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
