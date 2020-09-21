import DeviceType from './DeviceIos'

const deviceSize = {
    android: {
        statusbar: 24,
        navbar: 40
    },
    ios: {
        statusbar: 20,
        navbar: 44
    },
    iphoneX: {
        statusbar: 44,
        navbar: 44
    },       
}

let exportDevice = {
    statusbar: 24,
    navbar: 40
}

if(DeviceType.isIos){
    exportDevice = deviceSize.ios
}
if(DeviceType.isIphoneX){
    exportDevice = deviceSize.iphoneX
}

export default exportDevice