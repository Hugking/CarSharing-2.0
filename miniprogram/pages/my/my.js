let globalData = getApp().globalData;
const util = require('../../utils/util.js')
Page({
    data: {
        memberName: 'echo.', //昵称
        isLogin: false,
        modal: {
            btnList: [{
                text: "微信登录",
                type: 'green',
                login: true,
                plain: true
            }, {
                text: "手机号登录",
                type: 'white',
                plain: false,
            }],
            content: '请选择登录方式',
            show: false
        }
    },
    onLoad: function(options) {},
    onShow: function() {
        this.indexData()
    },
    indexData() {
        let isLogin = globalData.isLogin;
        console.log(globalData)
        if (isLogin) {
            this.setData({
                isLogin: isLogin,
                memberName: globalData.userInfo.nickname ? globalData.userInfo.nickname : util.formatNum(globalData.userInfo._phone),
                avatar: globalData.userInfo.avatar
            });
        }
    },
    userinfo(e) {
        let that = this
        let res = e.detail
        if (res.errMsg == 'ok') {
            globalData.userInfo = res.user
            globalData.isLogin = true
            this.indexData()
        } else if (res.errMsg == 'fail') {
            console.log('授权失败')
            wx.showModal({ title: '授权失败', content: '请在最近使用的小程序中长按删除本小程序后，再重新搜索即可' })
        }
    },
    modalHide() {
        var modal = this.data.modal
        modal.show = false
        this.setData({
            modal: modal
        })
    },
    modalShow() {
        var modal = this.data.modal
        modal.show = true
        this.setData({
            modal: modal
        })
    },
    modalClick(e) {
        let index = e.detail.index;
        if (index === 1) {
            wx.navigateTo({
                url: '../my/login/login'
            })
        }
        this.modalHide()
    },
    logout: function() {
        wx.showModal({
            title: '提示',
            content: '确定退出登录？',
            confirmColor: '#5677FC',
            success: (res) => {
                if (res.confirm) {
                    wx.BaaS.auth.logout().then(res => {
                        // success
                    }, err => {
                        // err
                    })
                    globalData.isLogin = false
                    globalData.userInfo = null
                    wx.reLaunch({
                        url: '../index/index'
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
                url = './my-info/my-info'
                    // 设置中心
            } else if (index == 3) {
                url = '../my/wallet/wallet'
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