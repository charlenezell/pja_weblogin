let da =require("../da.es6");
let {placeholder}=require("../util.es6");
module.exports= {
    render:function({cname,name,tips,rule,hide=false,id=""}){
        return `
          <div class="codeItem formlo01" style="${hide?'display:none':''}" id="${id}">
            <div class="codeItem__label formlo01__l">${cname}</div>
            <div class="codeItem__input formlo01__r"><input type="text" name="${name}" placeholder="${tips}" data-validaterule="${rule}"/><img src="${da.getImgSrc()}" alt="" class="codeItem__img"/><span href="" class="codeItem__changeBtn">换一张</span></div>
          </div>
        `
    },
    bind:function(root,{ps,doValidate}){
      $(".codeItem__changeBtn,.codeItem__img",root).on("click",function(){
        $(".codeItem__img",root).attr("src",da.getImgSrc());
      });
      $(".codeItem__input input", root).on("blur", function(e,data) {
        if(!$(this).is(":visible")){
          return false;
        }
        if(data&&data.isInit){return false;}
        let v = $(this).val();
        let {
          validaterule
        } = $(this).data();
        let rst = doValidate(v, validaterule);
        if (!rst.status) {
          $(this).closest(".codeItem__input").addClass("codeItem__input--error");
          $(this).val(rst.detail);
          ps.trigger("cDispatch", {
            type: "changeValidState",
            valid:false
          })
        }
      }).on("focus", function() {
        ps.trigger("cDispatch", {
          type: "changeValidState",
          valid:true
        })
        if ($(this).closest(".codeItem__input").hasClass("codeItem__input--error")) {
          $(this).val("")
        }
        $(this).closest(".codeItem__input").removeClass("codeItem__input--error");
      });
      $(".codeItem__input").each(function(){
        placeholder($(this).find('input'));
      });
    }
}
