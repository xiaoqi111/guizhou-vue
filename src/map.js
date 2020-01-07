export function MP(ak) {
  return new Promise(function (resolve, reject) {
    window.init = function () {
      resolve(BMap)
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://api.map.baidu.com/api?v=2.0&ak=PbwI8i77M4VEryKRLUaphZGsT1HBOal2&callback=init'
    script.onerror = reject
    document.head.appendChild(script)
  })
}
