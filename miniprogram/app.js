//app.js
App({
    onLaunch: function() {

        // wx.cloud.init({
        //     traceUser: true,
        //     env: 'haojiechuxing-3bf093'
        // })

        let test_clientID = 'b618b408f46370257140'
        let test_appID = 'wx94fec6cd5ed674a3'
        let test_selkey = "6fdd5ece1e8bee6db9915677f7f791fc"
        let appID = 'wx37c9d625eddac654'
        let clientID = '3f5751e5076c11b4d4df'
        let dev = 0 // 0为测试版

        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let custom = wx.getMenuButtonBoundingClientRect();
                this.globalData.Custom = custom;
                this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
            }
        })

        wx.BaaS = requirePlugin('sdkPlugin')
        wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)
        let options = {
            // autoLogin: true
        }
        switch (dev) {
            case 0:
                wx.BaaS.init(test_clientID, options);
                break;
            case 1:
                wx.BaaS.init(clientID, options);
                break;
        }

        // 静默登录，检测是否注册账户
        wx.BaaS.auth.loginWithWechat(null, { createUser: false }).then(user => {
            // console.log(user)
            if (user.is_authorized) {
                this.globalData.userInfo = user
                this.globalData.isLogin = true
            }
        }, err => {
            // 匿名登录
            wx.BaaS.auth.anonymousLogin().then(user => {
                console.log(user.id)
            }).catch(err => {
                // HError
            })

        })
    },
    globalData: {
        userInfo: null,
        version: "1.0.0",
        loaclAddress: '河南省',
        isLogin: false,
        auditID: 'E1-FGBwkjgYb-yuVCUdJBi5YkYmWMFuuPoLcVZp7vKA',
        reporIDtList: ['E1-FGBwkjgYb-yuVCUdJBi5YkYmWMFuuPoLcVZp7vKA', 'zPWkGMmVpuH0gZRUtGZ_-B4U0V6jRuV_i5mUZHHba0c']
    }
})