module.exports={
    render:function({list,index=-1}){
        return `
          <div class="tabView">
          ${$.map(list,(v,k)=>{
            return `
              <span class="tabView__item ${k==index?'tabView__item--on':''}" data-action="${v.action}" title="${v.name}"><span class="tabView__item__bg tabView__item__bg--${v.action}"></span></span>
            `
          }).join("")}
          </div>
        `
    },
    bind:function(root,{ps}){
      root.find(".tabView").on("click", ".tabView__item", function() {
        let {
          action
        } = $(this).data();
        ps.trigger("cDispatch", {
          type: "changeView",
          action,
          index: $(this).index()
        });
      })
    }
}
