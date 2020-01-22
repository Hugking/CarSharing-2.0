// miniprogram/pages/car-sharing/my-car-shaing/my-car-sharing.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
            name: "即将出发"
        }, {
            name: "历史行程"
        }],
        currentTab: 0,
    },
    change(e) {
        this.setData({
            currentTab: e.detail.index
        })
    },
    goTo() {
        wx.navigateTo({
            url: '../car-sharing-detail/car-sharing-detail',
        })
    }
})