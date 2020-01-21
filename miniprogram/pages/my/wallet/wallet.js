// miniprogram/pages/my/wallet/wallet.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 'E1-FGBwkjgYb-yuVCUdJBi5YkYmWMFuuPoLcVZp7vKA',
        today: {
            money: 2.7,
            count: 5
        },
        totalMoney: 50.3
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    history() {
        wx.navigateTo({
            url: './history/history',
        })
    },
    withdraw() {
        wx.navigateTo({
            url: './withdraw/withdraw'
        })
    },
})