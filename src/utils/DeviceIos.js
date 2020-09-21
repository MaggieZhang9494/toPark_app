const sbIphone = {
    iphoneX: {
        width: 1125,
        height: 2436
    },
    iphoneXs: {
        width: 1125,
        height: 2346
    },
    iohoneXs_Max: {
        width: 1242,
        height: 2688
    },
    iphoneXr: {
        width: 828,
        height: 1792        
    }
}

/**
 * 是否为iphone刘海屏
 */
function isIphoneX(){
    let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    let ratio = window.devicePixelRatio || 1;
    let screen = {
      width : window.screen.width * ratio,
      height : window.screen.height * ratio
    };
    if(!iOS) return false
    return Object.values(sbIphone).some(iphone=>{
        return iphone.width === screen.width && iphone.height === screen.height
    })
}

/**
 * 是否为ios系统
 */
function isIos(){
    return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

const deviceType = {
    isIphoneX: isIphoneX(),
    isIos: isIos()
}

export default deviceType

