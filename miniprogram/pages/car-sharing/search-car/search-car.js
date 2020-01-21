// miniprogram/pages/car-sharing/search-car/search-car.js
const util = require('../../../utils/util')
Page({
    data: {
        btnList: [],
        tripInfo: null,
        userInfo: null,
        Info: {
            userList: []
        },
        Info0: {
            nickName: "小明",
            tel: "15670813638",
            carNum: "豫12345",
            carColor: "黄色",
        },
        Info1: {
            userList: [{
                    nickName: "wg",
                    tel: "15670813638",
                    note: "",
                },
                {
                    nickName: "王凯",
                    tel: "电话",
                    note: "选取一个模块，该模块由其领域内的像素点组成，一般选取 3*3 或者5*5 的模块，求其模块中所有像素点的平均值，再把该平均值替换掉当前像素点，作为均值滤波中处理后的像素点 g(x,y)均值滤波的缺点是把原始图像变得模糊不清，即不能够很好地保留图像的原有细节，是因为它对所有点都是用一样的均值方法替代，当出现噪声或者边缘的时候，也会把平均值代替当做原始值，从而不能够很好地达到去燥的效果。",
                }
            ]
        }
    },
    onLoad(options) {
        // console.log(JSON.parse(options.addressData))
        this.setData({
            addressData: JSON.parse(options.addressData),
            btnList: [{
                bgColor: "#16C2C2",
                //名称
                text: "发布",
                //字体大小
                fontSize: 28,
                //字体颜色
                color: "#fff"
            }, {
                bgColor: "#64B532",
                //名称
                text: "分享",
                //字体大小
                fontSize: 28,
                //字体颜色
                color: "#fff"
            }, {
                bgColor: "#FFA000",
                //名称
                text: "赞赏",
                //字体大小
                fontSize: 28,
                //字体颜色
                color: "#fff"
            }]
        })
        let userInfo = wx.getStorageSync('userInfo')
        this.setData({
            tripInfo: {
                avatar: userInfo.avatar,
                nickName: userInfo.nickname,
                pushTime: '1234',
                preTime: '1234',
                start: '平顶山学院',
                end: '平顶山站',
                peoNum: 1,
                peoTotalNum: 2,
                driver: "王凯",
                driverTel: '15670813638'
            },
        })
    },
    goTo(e) {
        console.log(e)
    },
    detail(e) {
        console.log(e)
    },
    driverInfo(e) {
        console.log(e)
    },
    delete(e) {
        console.log(e.detail)
    },
    onClick(e) {
        let index = e.detail.index
        switch (index) {
            case -1:
                util.toast("您点击了悬浮按钮")
                break;
            case 0:
                wx.navigateTo({
                    url: "../release/release?addressData=" + JSON.stringify(this.data.addressData)
                })
                break;
            case 1:
                util.toast("您点击了悬浮按钮")
                break;
            case 2:
                wx.previewImage({
                    urls: ["https://thorui.cn/img/reward.jpg"]
                })
                break;
            default:
                break;
        }
    },
})