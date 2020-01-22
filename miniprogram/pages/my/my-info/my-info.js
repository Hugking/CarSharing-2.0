// miniprogram/pages/my/my-info/my-info.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: "",
        tel: '',
        showNameModel: false,
        linkStatus: false,
        userType: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},
    onShow() {
        wx.BaaS.auth.getCurrentUser().then(user => {
            new wx.BaaS.User().expand('linkInfo').get(user.id).then((res) => {
                // success
                console.log(res.data)
                if (res.data.linkInfo) {
                    this.data.linkStatus = true
                    this.setData({
                        tel: res.data._phone,
                        name: res.data.linkInfo.name,
                        userType: res.data.linkInfo.userType ? res.data.linkInfo.userType : 0
                    })
                } else {
                    this.data.linkStatus = false
                    this.setData({
                        tel: user._phone ? user._phone : null,
                        name: user.nickname
                    })
                }
            }, (err) => {
                // err
            })
        })
    },
    showNameModel() {
        this.setData({
            showNameModel: true
        })
    },
    hideNameModel() {
        this.setData({
            showNameModel: false
        })
    },
    submit() {
        this.hideNameModel()
        console.log("上传")
        wx.BaaS.auth.getCurrentUser().then(user => {
            // console.log(user.id)
            let query = new wx.BaaS.Query()
            query.compare('user', '=', new wx.BaaS.User().getWithoutData(user.id))
            query.compare('delete', '=', false)
            new wx.BaaS.TableObject('n_user')
                .setQuery(query).orderBy(['-created_at'])
                .select(['-created_at', '-created_by', '-delete'])
                .limit(1).offset(0).find().then(res => {
                    // success
                    // console.log(res.data)
                    if (res.data.objects.length === 0) {
                        console.log('未查询到关联信息')
                        let n_user = new wx.BaaS.TableObject('n_user')
                            .create()
                        n_user.set('user', new wx.BaaS.User().getWithoutData(user.id))
                        n_user.set('name', this.data.name)
                        n_user.save().then(res => {
                            // success
                            console.log(res.data)
                            let linkInfoId = res.data.id
                            wx.BaaS.auth.getCurrentUser()
                                .then(user => {
                                    let linkInfo = new wx.BaaS.TableObject('n_user')
                                        .limit(1).offset(0).getWithoutData(res.data.id)
                                    return user.set('linkInfo', linkInfo).update()
                                }).then(user => {
                                    // success
                                    console.log('更新成功');
                                    wx.showToast({ title: '更新成功', icon: "none", duration: 2000 })
                                }).catch(err => {
                                    // err 为 HError 对象
                                })
                        })
                    } else {
                        console.log('查询到关联信息');
                        let n_user_id = res.data.objects[0].id
                        let n_user = new wx.BaaS.TableObject('n_user').getWithoutData(n_user_id)
                        n_user.set('name', this.data.name)
                        n_user.update().then(res => {
                            // success
                            // console.log(res.data)
                            console.log('更新成功');
                            wx.showToast({ title: '更新成功', icon: "none", duration: 2000 })
                        }, err => {
                            // err
                        })
                    }
                }, err => {
                    // err
                })
        })
    },
    input(e) {
        this.setData({
            name: e.detail.value
        })
    },
    tel() {
        if (this.data.tel) {
            wx.showModal({
                content: "您已绑定手机号 " + this.data.tel + " 需要修改吗？",
                success(res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '../login/login' + "?verify=true"
                        })
                        console.log('用户点击确定', "跳转验证绑定手机号")
                    }
                }
            })
        } else {
            wx.navigateTo({
                url: '../login/login' + "?verify=true"
            })
            console.log("去绑定手机号")
        }
    },
    auth() {
        console.log("身份识别")
        wx.navigateTo({
            url: './auth/auth'
        })
    },
    wallet() {
        console.log("跳转钱包")
        if (this.data.userType !== 0) {
            wx.navigateTo({
                url: '../wallet/wallet'
            })
        } else {
            wx.showModal({
                content: '您还不是司机哦~'
            })
        }
    },
    openSetting() {
        wx.openSetting({
            success(res) {
                console.log(res.authSetting)
            }
        })
    },
    more() {
        wx.showToast({
            title: "敬请期待～",
            icon: "none"
        })
    }
})