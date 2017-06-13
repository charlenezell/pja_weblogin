export default {
    render:function({list,index=0}){
        return `
          <div class="tabView">
          ${$.map(list,(v,k)=>{
            return `
              <div class="tabView__item ${k==index?'tabView__item--on':''}" data-action="${v.action}">${v.name}</div>
            `
          }).join("")}
          </div>
        `
    }
}
