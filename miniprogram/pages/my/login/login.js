const util = require('../../../utils/util.js')
let globalData = getApp().globalData
Page({
    data: {
        disabled: false,
        btnText: "获取验证码",
        mobile: "",
        type: "primary",
        code: "",
        verify: false
    },
    onLoad: function(options) {
        if (options.verify) {
            this.setData({
                verify: true
            })
        }
    },
    phone: function(e) {
        this.setData({
            mobile: e.detail.value
        });
    },
    doLoop: function(seconds) {
        seconds = seconds ? seconds : 60;
        this.setData({
            btnText: seconds + "s后获取",
        });
        let countdown = setInterval(() => {
            if (seconds > 0) {
                this.setData({
                    btnText: seconds + "s后获取"
                });
                --seconds;
            } else {
                this.setData({
                    btnText: "获取验证码",
                    disabled: false,
                    type: "primary"
                });
                clearInterval(countdown);
            }
        }, 1000);
    },
    codeSend() {
        wx.BaaS.sendSmsCode({ phone: this.data.mobile })
            .then(res => {
                // success
                console.log(res.data)
                if (res.data.status == "ok") {
                    wx.showToast({ title: "验证码发送成功，请注意查收", icon: 'none' })
                }
            }).catch(e => {
                // err
                console.log(e.code) // 错误状态码
            })
    },
    btnSend: function() {
        let that = this
        if (util.isNullOrEmpty(this.data.mobile)) {
            util.toast('请输入手机号码');
            return
        } else if (!util.isMobile(this.data.mobile)) {
            util.toast('请输入正确的手机号码');
            return
        }

        if (this.data.verify) {
            wx.BaaS.auth.getCurrentUser().then(user => {
                // console.log(user.id)
                return user.setMobilePhone(this.data.mobile)
            }).then(user => {
                // console.log(user)
                that.codeSend()
            }).catch(err => {
                // HError
            })
        } else {
            that.codeSend()
        }

        this.setData({
            disabled: true,
            btnText: "请稍候...",
            type: "gray"
        });

        setTimeout(() => {
            this.doLoop(60)
        }, 500)
    },
    login: function(e) {
        let loginCode = e.detail.value.smsCode;
        let mobile = e.detail.value.mobile;
        if (util.isNullOrEmpty(mobile)) {
            util.toast('请输入手机号码');
            return
        } else if (!util.isMobile(mobile)) {
            util.toast('请输入正确的手机号码');
            return
        } else if (util.isNullOrEmpty(loginCode)) {
            util.toast('请输入验证码');
            return
        }

        if (this.data.verify) {
            wx.BaaS.auth.getCurrentUser()
                .then(user => {
                    return user.verifyMobilePhone(loginCode)
                }).then(user => {
                    // console.log(user)
                    globalData.isLogin = true;
                    globalData.userInfo = user;
                    util.toast("验证成功", 2000, true);
                    setTimeout(() => {
                        wx.navigateBack()
                    }, 200);
                }).catch(err => {
                    // HError
                })
        } else {
            wx.BaaS.auth.loginWithSmsVerificationCode(mobile, loginCode)
                .then(user => {
                    console.log(user)
                    if (user._provider.wechat) {
                        wx.showModal({ content: "已关联微信用户，请勿重复关联" })
                        return;
                    } else {
                        user.linkWechat().then(res => {
                            console.log(res.statusCode, '关联成功')
                                // 关联成功，下次可以通过 wx.BaaS.auth.loginWithWechat 登录了
                        })
                    }
                    globalData.isLogin = true;
                    globalData.userInfo = user;
                    util.toast("登录成功", 2000, true);
                    setTimeout(() => {
                        wx.navigateBack()
                    }, 200);
                }).catch(err => {
                    // HError
                    if (err.code === 400) {
                        util.toast('当天该手机号码接受短信已超过限制');
                    } else if (e.code === 402 || e.code === 500) {
                        util.toast('服务器正忙，请稍后重试！');
                    }
                })
        }

    },
    protocol: function() {
        wx.navigateTo({
            url: '../about/about'
        })
    }
})