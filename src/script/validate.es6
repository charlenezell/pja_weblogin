let  {ValidateItem} =require("./util.es6");
 function doValidate(data, rule,initEnvVariable) {
  let {pairData}=initEnvVariable&&initEnvVariable()||{};
  let ruleMap = {
    l_gameName: function(data) {
      return new ValidateItem(data, "游戏名").notEmpty();
    },
    l_password: function(data) {
      return new ValidateItem(data, "密码").max(16).min(6);
    },
    l_duoduoid: function(data) {
      return new ValidateItem(data, "多多号").isNumber().notEmpty();
    },
    code:function(data){
      return new ValidateItem(data, "验证码").notEmpty();
    },
    r_password:function(data){
      return new ValidateItem(data, "密码").strongEnough().notEmpty();
    },
    r_password2:function(data,data2){
      return new ValidateItem(data, "密码").sameAs(pairData).notEmpty();
    },
    r_name:function(data){
      return new ValidateItem(data, "姓名").notEmpty();
    },
    r_id:function(data){
      return new ValidateItem(data, "身份证号").isIdCard().notEmpty();
    }
  }

  return ruleMap[rule](data);
}
module.exports={
  doValidate
}
