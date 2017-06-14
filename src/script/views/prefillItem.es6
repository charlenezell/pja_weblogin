module.exports={
    render:function({tofill,word,target}){
        return `
        <div class="formlo01">
          <div class="formlo01__l"></div><div class="formlo01__r">
          <div data-target="${target}" data-word="${word}" class="prefillItem" data-fill="${tofill}">${word}</div>
          </div>
        </div>
        `
    },
    bind:function(root){
      root.find(".prefillItem").click(function(){
        let {target,fill}=$(this).data();
        if($(this).hasClass("prefillItem--clickable")){
          if($(target).length>0){
            $(target).val(fill);
            $(target).closest(".fieldItem01__input--error").removeClass("fieldItem01__input--error");
          }
        }
      })
    },
    changeState:function(id){
      let target=$(`.prefillItem[data-target=#${id}]`);
      if(target.length>0){
        target.addClass("prefillItem--clickable").text(`[${$(target).data("word")}]`);
      }
    }
}
