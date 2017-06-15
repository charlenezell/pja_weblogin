let {placeholder}=require("../util.es6");
module.exports= {
    render:function({cname,name,tips,rule,type,id="",target="",classname=""}){
        return `
          <div class="fieldItem01 formlo01 ${classname?`fieldItem01--${classname}`:''}">
            <div class="fieldItem01__label formlo01__l">${cname}</div>
            <div class="fieldItem01__input formlo01__r ${type?`fieldItem01__input--${type}`:'fieldItem01__input--long'}"><input type="text" name="${name}" id="${id}" data-fieldItem_pairtarget="${target}" placeholder="${tips}" data-validaterule="${rule}"/></div>
          </div>
        `
    },
    bind:function(root,{ps,doValidate}){

      $(".fieldItem01__input input", root).on("blur", function(e,data) {
        if(data&&data.isInit){return false;}
        let v = $(this).val();
        let {
          validaterule
        } = $(this).data();
        let rst = doValidate(v, validaterule,()=>{
          let pairItem=$($(this).data("fielditem_pairtarget"));
          let data={}
          if(pairItem.length>0){
            data=pairItem.val();
          }
          return {
            pairData:data
          }
        });
        if (!rst.status) {
          $(this).closest(".fieldItem01__input").addClass("fieldItem01__input--error");
          $(this).val(rst.detail);
          ps.trigger("cDispatch", {
            type: "changeValidState",
            valid:false
          })
        }
      }).on("focus", function(e,data) {
        if(data&&data.nocheck){
          console.log("nocheck");
          return false;
        }
        ps.trigger("cDispatch", {
          type: "changeValidState",
          valid:true
        })
        ps.trigger("cDispatch", {
          type: "fieldItem01focus",
          id:$(this).attr("id")
        })
        if ($(this).closest(".fieldItem01__input").hasClass("fieldItem01__input--error")) {
          $(this).val("")
        }
        $(this).closest(".fieldItem01__input").removeClass("fieldItem01__input--error");
      })
      $(".fieldItem01__input").each(function(){
        placeholder($(this).find('input'));
      });
    }
}
