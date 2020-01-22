// miniprogram/pages/my/wallet/withdraw/withdraw.js
Page({

    data: {
        balanceMoney: 3.5,
        applyMoney: null,
        modal: false
    },

    onLoad: function(options) {

    },
    select() {
        this.setData({
            modal: true
        })
    },
    input(e) {
        console.log(e.detail.value)
        this.setData({
            applyMoney: e.detail.value
        })
    },
    withdraw() {
        console.log('提现' + this.data.applyMoney);
        wx.showModal({
            content: '已提现' + this.data.applyMoney
        })
    }
})