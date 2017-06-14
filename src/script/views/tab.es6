module.exports={
    render:function({list,index=-1}){
        return `
          <div class="tabView">
          ${$.map(list,(v,k)=>{
            return `
              <div class="tabView__item ${k==index?'tabView__item--on':''}" data-action="${v.action}">${v.name}</div>
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
