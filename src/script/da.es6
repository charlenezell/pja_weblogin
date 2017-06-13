export default {
  login:function(duoduoId,password,autologin){
    let d=$.Deferred();
    console.log(duoduoId,password,autologin);
    d.resolve();
    return d.promise();
  },
  checkGameName:function(url,name){
    return $.getJSON(url+"?callback=?",{name});
  }
}
