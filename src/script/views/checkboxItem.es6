module.exports={
    render:function(option={}){
        let {defaultChecked,word,key}={defaultChecked:false,...option};
        return `
          <span class="checkboxItem">
            <input type="hidden" name="${key}" value="${defaultChecked?"true":"false"}"/>
            <span class="checkboxItem__w ${defaultChecked?'checkboxItem--on':''}">
            <span class="checkboxItem__i"></span><span class="checkboxItem__word">${word}</span>
            </span>
          </span>
        `
    },
    bind:function(root){
      root.find(".checkboxItem__w").click(function() {
          $(this).closest(".checkboxItem").toggleClass("checkboxItem--on");
          let state = "false";
          if ($(this).closest(".checkboxItem").hasClass("checkboxItem--on")) {
            state = "true"
          }
          $(this).closest(".checkboxItem").find('input[type=hidden]').val(state);
        })

    }
}
