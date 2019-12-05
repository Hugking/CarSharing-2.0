let globalData = getApp().globalData;
const util = require('../../utils/util.js')
Page({
  data: {
    memberName: 'echo.', //昵称
    isLogin: false
  },
  onLoad: function(options) {},
  onShow: function() {
    let isLogin = globalData.isLogin;
    if (isLogin) {
      this.setData({
        isLogin: isLogin,
        memberName: util.formatNum(wx.getStorageSync("thorui_mobile") || 'echo.')
      });
    }
  },
  userInfoHandler(data) {
    wx.BaaS.auth.loginWithWechat(data, {
      createUser: false
    }).then(user => {
      console.log('用户信息',user)
      // 已经有用户记录，不是第一次登录，进入正常业务流程。
    }, err => {
      console.log("拒绝授权",err)
    })
  },
  logout: function() {
    wx.showModal({
      title: '提示',
      content: '确定退出登录？',
      confirmColor: '#5677FC',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorage()
          wx.reLaunch({
            url: '../home/home'
          })
        }
      }
    });
  },
  edit() {
    wx.showToast({
      title: '功能开发中~',
      icon: "none"
    })
  },
  tapEvent: function(e) {
    let index = e.currentTarget.dataset.index;
    let url = "";
    if (index == 1) {
      url = '../my/order/order'
      // 我的行程
    } else if (index == 2) {
      url = '../my/my'
      // 设置中心
    } else if (index == 3) {
      url = '../my/log/log'
      // 钱包
    } else if (index == 4) {
      url = '../my/log/log'
      // 安全
    } else if (index == 5) {
      url = '../my/log/log'
      // 客服
    } else if (index == 6) {
      url = '../my/about/about'
      // 关于
    } else if (index == 7) {
      url = '../my/log/log'
      // 反馈
    } else if (index == 8) {
      url = '../my/log/log'
      // 日志
    }
    wx.navigateTo({
      url: url
    })
  }
  //   github: function() {
  //     wx.setClipboardData({
  //       data: 'https://github.com/dingyong0214/ThorUI',
  //       success(res) {
  //         wx.getClipboardData({
  //           success(res) {
  //             util.toast("链接已复制",2000,true)
  //           }
  //         })
  //       }
  //     })
  //   },
  //   previewReward: function() {
  //     wx.previewImage({
  //       urls: ["https://thorui.cn/img/reward.jpg"]
  //     })
  //   }
})