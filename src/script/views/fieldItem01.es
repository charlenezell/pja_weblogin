export default {
    render:function({cname,name,tips,rule,type}){
        return `
          <div class="fieldItem01 formlo01">
            <div class="fieldItem01__label formlo01__l">${cname}</div>
            <div class="fieldItem01__input formlo01__r ${type?`fieldItem01__input--${type}`:'fieldItem01__input--long'}"><input type="text" name="${name}" id="" placeholder="${tips}" data-validaterule="${rule}"/></div>
          </div>
        `
    }
}
