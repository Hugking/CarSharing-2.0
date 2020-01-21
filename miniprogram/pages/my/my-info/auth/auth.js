// miniprogram/pages/my/my-info/auth/auth.js
const config = require("./config")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        typeList: [{
                value: 'ocr_idcardocr',
                title: '身份证(正)',
                id: 0,
                itemList: null,
                content: null
            },
            {
                value: 'ocr_idcardocr',
                title: '身份证(反)',
                id: 1,
                itemList: null,
                content: null
            },
            {
                value: "ocr_driverlicenseocr",
                title: "行驶证",
                id: 2,
                itemList: null,
                content: null
            },
            {
                value: "ocr_driverlicenseocr",
                title: "驾驶证",
                id: 3,
                itemList: null,
                content: null
            },
            {
                value: "ocr_plateocr",
                title: "车牌",
                id: 4,
                itemList: null,
                content: null
            },
            {
                value: 'ocr_creditcardocr',
                title: '银行卡',
                id: 5,
                itemList: null,
                content: null
            },
        ],
        type: 'ocr_idcardocr',
        num: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    choose(e) {
        console.log(e.currentTarget.dataset.type)
        this.setData({
            type: e.currentTarget.dataset.type
        })
        wx.chooseImage({
            success: (res) => {
                let file = res.tempFilePaths[0]
                this.setData({
                    file: file
                })
                let base64 = wx.getFileSystemManager().readFileSync(file, 'base64') // 新的小程序sdk支持用wx.getFileSystemManager转码base64
                    // console.log(base64)
                let image = 'data:image/png;base64,' + base64
                this.scan(base64)
                wx.showLoading({
                    title: '正在识别'
                })
            }
        })
    },
    scan(image) {
        let params = {
            image: image,
            time_stamp: (Date.now() / 1000).toFixed(),
            nonce_str: Math.random()
        }
        switch (this.data.num) {
            case 0:
                params.card_type = 0;
                break;
            case 1:
                params.card_type = 1;
                break;
            case 2:
                params.type = 0;
                break;
            case 3:
                params.type = 1;
                break;
            case 4:
                break;
            case 5:
                break;
            default:
                break;
        }
        this.upload(config.signedParam(params), this.data.type, this.data.num)
    },
    upload(params, type, idx) {
        // console.log(params)
        wx.request({
            url: `https://api.ai.qq.com/fcgi-bin/ocr/${type}`,
            data: params,
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 注意不是'application/json'
            },
            success: (res) => {
                wx.hideLoading()
                console.log(res.data)
                if (res.data.ret !== 0) {
                    wx.showModal({
                        content: "系统出错，请更换图片稍后重试"
                    })
                    return;
                }
                switch (this.data.num) {
                    case 0:
                        res.data.data.item_list = [
                            { item: "住址", itemstring: res.data.data.address },
                            { item: "出生", itemstring: res.data.data.birth },
                            { item: "身份证号码", itemstring: res.data.data.id },
                            { item: "姓名", itemstring: res.data.data.name },
                            { item: "民族", itemstring: res.data.data.nation },
                            { item: "性别", itemstring: res.data.data.sex }
                        ];
                        break;
                    case 1:
                        res.data.data.item_list = [
                            { item: "签发机关", itemstring: res.data.data.authority },
                            { item: "有效期限", itemstring: res.data.data.valid_date }
                        ];
                        break;
                }
                if (res.data.data.item_list.length === 0) {
                    wx.showModal({
                        title: '识别失败',
                        content: '这可能不是一张' + this.data.typeList[idx].title,
                        showCancel: false
                    })
                } else {
                    let content = ''
                    res.data.data.item_list.forEach((item) => {
                        content += item.itemstring
                    })
                    this.data.typeList[idx].itemList = res.data.data.item_list
                    this.data.typeList[idx].content = content
                    this.setData({
                        info: this.data.typeList[idx].itemList,
                        typeList: this.data.typeList
                    })
                }
            }
        })
    },
    before() {
        if (this.data.num == 0) {
            wx.showToast({
                title: "已经是第一步了～",
                icon: "none"
            })
        }
        this.setData({
            num: this.data.num == 0 ? 0 : this.data.num - 1
        })
    },
    next() {
        console.log("上传")
        this.setData({
            num: this.data.num == this.data.typeList.length - 1 ? 0 : this.data.num + 1
        })
        wx.showToast({
            title: "点击图片开始上传" + this.data.typeList[this.data.num].title,
            icon: "none",
            duration: 2000
        })
    },
    confirm() {
        console.log("识别完成", this.data.typeList)
        for (var item in this.data.typeList) {
            if (!item.content) {
                wx.showModal({
                    content: "请检查是否已全部上传"
                })
                return;
            } else {
                console.log('开始上传', this.data.typeList)
                wx.BaaS.auth.getCurrentUser().then(user => {
                    let query = new wx.BaaS.Query()
                    query.compare('user', '=', new wx.BaaS.User().getWithoutData(user.id))
                    query.compare('delete', '=', false)
                    new wx.BaaS.TableObject('n_user')
                        .setQuery(query).orderBy(['-created_at'])
                        .select(['-created_at', '-created_by', '-delete'])
                        .limit(1).offset(0).find().then(res => {
                            // success
                            console.log(res.data)
                            if (res.data.objects.length === 0) {
                                let n_user = new wx.BaaS.TableObject('n_user')
                                    .create()
                                n_user.set('driverInfo', this.data.typeList)
                                n_user.set('userType', 1)
                                n_user.set('user', new wx.BaaS.User().getWithoutData(user.id))
                                n_user.save().then(res => {
                                    // success
                                    console.log('创建成功', res.data)
                                    wx.showModal({
                                        content: '已成功上传，审核时间为1～7个工作日，敬请等待'
                                    })
                                })
                            } else {
                                console.log('查询到信息并更新');
                                let n_user_id = res.data.objects[0].id
                                let n_user = new wx.BaaS.TableObject('n_user').getWithoutData(n_user_id)
                                n_user.set('driverInfo', this.data.typeList)
                                n_user.set('userType', 1)
                                n_user.set('user', new wx.BaaS.User().getWithoutData(user.id))
                                n_user.update().then(res => {
                                    // success
                                    console.log('更新成功', res.data)
                                    wx.showModal({
                                        content: '已成功上传，审核时间为1～7个工作日，敬请等待'
                                    })
                                }, err => {
                                    // err
                                })
                            }
                        }, err => {
                            // err
                        })
                })
            }
        }

    }
})