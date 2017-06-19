let env = require('./env.es6');
module.exports={
  register:function(password,autologin,name,id,code){
    return $.post(`${env.backendHost}/game/auth/register.action`,{
      password,
      captcha:code,
      gameId:__gameConfig.serverGameId,
      gameName:__gameConfig.serverName,
      autoLogin:autologin,
      realName:name,
      idCard:id
    });
    // let d=$.Deferred();
    // console.log(password,autologin,name,id,code);
    // d.resolve({
    //   resultCode:{
    //     // code:-11,
    //     code:0,
    //     detail:"请输入正确验证码"
    //   },
    //   value:{
    //     code:0,
    //     duoduoId:Math.random()*10000,
    //     password:password
    //   }
    // });
    // return d.promise();
  },
  login:function(duoduoId,password,autologin,gameId,code){

    return $.post(`${env.backendHost}/game/auth/normallogin.action`,{
      account:duoduoId,
      password:password,
      captcha:code,
      gameId:__gameConfig.serverGameId,
      gameName:__gameConfig.serverName,
      autoLogin:autologin
    });

    // let d=$.Deferred();
    // console.log(duoduoId,password,autologin,gameId,code);
    // d.resolve({
    //   code:0
    // });
    // d.resolve({
    //   resultCode:{
    //     code:-11,
    //     detail:"请输入正确验证码"
    //   },value:{
    //     needCaptcha:true
    //   }
    // });
    // return d.promise();
  },
  loginToken:function(duoduoId,token){
    return $.post(`${env.backendHost}/game/auth/quicklogin.action`,{
      duoduoId,
      token,
      gameId:__gameConfig.serverGameId,
      gameName:__gameConfig.serverName
    })
    // let d=$.Deferred();
    // console.log(duoduoId,token,gameId);
    // d.resolve({
    //   resultCode:{
    //     // code:0
    //     code:-14
    //   }
    // });
    // return d.promise();
  },
  checkGameName:function(url,name){
    return $.getJSON(url+"?callback=?",{name});
  },
  checkRealNameNeeded:function(){
    return $.get(`${env.backendHost}/game/auth/registerprecondition.action`,{
      gameId:__gameConfig.serverGameId
    });
    /*let d=$.Deferred();
    d.resolve({
      need:true
    });
    return d.promise();*/
  },
  /*checkCodeNeeded:function(){
    let d=$.Deferred();
    d.resolve({
      need:false
    });
    return d.promise();
  },*/
  getImgSrc:function(){
    return `${env.backendHost}/game/auth/captcha.action?v=${new Date - 0}`;
  }
}
