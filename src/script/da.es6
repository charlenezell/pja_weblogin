module.exports={
  register:function(password,autologin,name,id,code){
    let d=$.Deferred();
    console.log(password,autologin,name,id,code);
    d.resolve({
      code:0,
      duoduoId:Math.random()*10000,
      password:password
    });
    return d.promise();
  },
  login:function(duoduoId,password,autologin,gameId,code){
    let d=$.Deferred();
    console.log(duoduoId,password,autologin,gameId,code);
    d.resolve({
      code:0
    });
    return d.promise();
  },
  loginToken:function(duoduoId,token,gameId){
    let d=$.Deferred();
    console.log(duoduoId,token,gameId);
    d.resolve({
      code:0
    });
    return d.promise();
  },
  checkGameName:function(url,name){
    return $.getJSON(url+"?callback=?",{name});
  },
  checkRealNameNeeded:function(){
    let d=$.Deferred();
    d.resolve({
      need:true
    });
    return d.promise();
  },
  checkCodeNeeded:function(){
    let d=$.Deferred();
    d.resolve({
      need:true
    });
    return d.promise();
  },
  getImgSrc:function(){
    return `http://account.9aoduo.com/access/imgCodeGetter.action?v=${new Date - 0}`;
  }
}
