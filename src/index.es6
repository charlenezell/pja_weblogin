import pageModeContainer from './script/manager/page.es6';

import util from './script/util.es6';


function resolveGameNameToConfig(gameName) {
  return ({
    "aoya": {
      configUrl: "aoya.json"
    }
  })[gameName];
}

function queryGameData(gameName) {
  let c = resolveGameNameToConfig(gameName);
  return $.get(c.configUrl);
}

function init(option) {
  let {
    mode,
    gameName
  } = option;

  queryGameData(gameName).then((data) => {
    if (mode == "page") {
      pageModeContainer.init(data,option);
    } else {
      throw new Error("mode 不受支持");
    }
  })
}
export {
  init,
  util
}

// if (!window.btWebLogin_config) {
//     throw new Error("请在引入登陆脚本前先配置相干信息");
// }
// config = {
//     ...config,
//     ...window.btWebLogin_config
// };
// console.log("currentConfig", config);
