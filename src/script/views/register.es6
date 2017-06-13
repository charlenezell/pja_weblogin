import qqloginbtn from './qqloginbtn.es6';
import fieldItem from './fieldItem01.es';
import forgetLink from './forgetlink.es';
// cname,name,tips,rule,type
export default {
    render:function({qqUrl,forgetUrl}){
        return `
        ${qqloginbtn.render({url:qqUrl})}
        <form id="registerForm">
        ${fieldItem.render(
          {cname:"密码:",name:"gameName",tips:"请输入6-16位的密码",rule:"r_gameName"})}
        ${fieldItem.render(
          {cname:"重复密码:",name:"password",tips:"请再次输入你的密码",rule:"r_password"})}
        ${fieldItem.render(
          {cname:"验证码:",name:"code",tips:"右边的数字",rule:"r_password"})}
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
