let {
  placeholder
} = require("../util.es6");
module.exports = {
  render: function ({
    cname,
    name,
    tips,
    rule,
    type,
    id = "",
    target = "",
    classname = "",
    noautocomplete = false,
    isPassword = false,
    value = ""
  }) {
    return `
          <div class="fieldItem01 formlo01 ${classname?`fieldItem01--${classname}`:''}">
            <div class="fieldItem01__label formlo01__l">${cname}</div>
            <div class="fieldItem01__input formlo01__r ${type?`fieldItem01__input--${type}`:'fieldItem01__input--long'}"><input type="${isPassword?'password':'text'}" name="${name}" id="${id}" data-fieldItem_pairtarget="${target}" data-placeholder="${tips}" data-validaterule="${rule}" ${noautocomplete?'autocomplete="off"':''} value="${value}"/><div class="fieldItem01__tips">${tips}</div></div>
          </div>
        `
  },
  bind: function (root, {
    ps,
    doValidate
  }) {
    $(".fieldItem01__input input",root).on("focus",function(){
      $(this).siblings(".fieldItem01__tips").hide();
    })
    $(".fieldItem01__input input", root).on("blur", function (e,data={
      fromSubmit:false
    }) {
      let v = $(this).val();
      let {
        validaterule
      } = $(this).data();
      let tips=$(this).siblings(".fieldItem01__tips");
      let rst = doValidate(v, validaterule, () => {
        let pairItem = $($(this).data("fielditem_pairtarget"));
        let data = {}
        if (pairItem.length > 0) {
          data = pairItem.val();
        }
        return {
          pairData: data
        }
      });

      if(data.fromSubmit&&$(this).closest(".fieldItem01__input").hasClass("fieldItem01__input--error")){
        return false;
      }

      if (!rst.status) {
        $(this).closest(".fieldItem01__input").addClass("fieldItem01__input--error");
        tips.text(rst.detail);
        $(this).val("");
        ps.trigger("cDispatch", {
          type: "changeValidState",
          valid: false
        })
      }
    }).on("focus", function (e, data) {

      ps.trigger("cDispatch", {
        type: "changeValidState",
        valid: true
      });

      ps.trigger("cDispatch", {
        type: "fieldItem01focus",
        id: $(this).attr("id")
      });
      $(this).closest(".fieldItem01__input").removeClass("fieldItem01__input--error");
    })

  }
}