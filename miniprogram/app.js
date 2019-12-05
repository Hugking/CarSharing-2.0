//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      traceUser: true,
      env: 'haojiechuxing-3bf093'
    })

    wx.BaaS = requirePlugin('sdkPlugin')
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)
    let clientID = '3f5751e5076c11b4d4df'
    wx.BaaS.init(clientID)

    wx.BaaS.auth.loginWithWechat().then(user => {
      console.log("静默登录",user)
      wx.setStorageSync('userInfo', user)
    }, err => {
      // 登录失败
    })

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        this.globalData.windowHeight = e.windowHeight;
        this.globalData.Screenwidth = e.screenWidth;
        this.globalData.Screenheight = e.screenHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    this.globalData = {
      userInfo: null,
      version: "1.0.0",
      isLogin: false,
    }
  },
  globalData:{
    
  }
})
