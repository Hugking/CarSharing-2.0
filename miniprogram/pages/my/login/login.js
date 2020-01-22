const util = require('../../../utils/util.js')
let globalData = getApp().globalData
Page({
    data: {
        disabled: false,
        btnText: "获取验证码",
        mobile: "",
        type: "primary",
        code: ""
    },
    onLoad: function (options) { },
    getRandom: function (u) {
        let rnd = "";
        u = u || 6;
        for (var i = 0; i < u; i++) {
            rnd += Math.floor(Math.random() * 10);
        }
        return Number(rnd);
    },
    input: function (e) {
        this.setData({
            mobile: e.detail.value
        });
    },
    doLoop: function (seconds) {
        wx.BaaS.sendSmsCode({ phone: this.data.mobile }).then(res => {
            // success
            console.log(res.data) // { "status": "ok" }
            util.toast('发送成功，请注意查收', 5000);
        }).catch(e => {
            // err
            console.log(e.code) // 错误状态码
            if (e.code === 400) {
                util.toast('当天该手机号码接受短信已超过限制');
            } else if (e.code === 402 || e.code === 500) {
                util.toast('服务器正忙，请稍后重试！');
            }
        })
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
    btnSend: function () {
        if (util.isNullOrEmpty(this.data.mobile)) {
            util.toast('请输入手机号码');
            return
        } else if (!util.isMobile(this.data.mobile)) {
            util.toast('请输入正确的手机号码');
            return
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
    login: function (e) {
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
        wx.BaaS.verifySmsCode({ phone: mobile, code: loginCode }).then(res => {
            // success
            console.log(res.data) // { "status": "ok" }
            globalData.isLogin = true;
            wx.setStorageSync("thorui_mobile", mobile);
            util.toast("登录成功", 2000, true);
            setTimeout(() => {
                wx.reLaunch({
                    url: '../../my/my'
                })
            }, 200);
        }).catch(e => {
            // err
            console.log(e.code) // 错误状态码
            util.toast('验证码不正确');
            return
        })
    },
    protocol: function () {
        wx.navigateTo({
            url: '../about/about'
        })
    }
})