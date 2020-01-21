let globalData = getApp().globalData
Page({
    data: {
        start: null,
        end: null,
        time: null,
        peoNum: 1,
        textColor: "",
        activeTextColor: "",
        startArray: null,
        endArray: null
    },
    onLoad() {
        this.setData({
            startArray: globalData.addressArray,
            endArray: globalData.addressArray
        })
    },
    time(e) {
        console.log(e.detail)
        this.setData({
            time: e.detail
        })
    },
    start(e) {
        console.log(e.detail)
        this.setData({ start: e.detail[1], startValue: e.detail[2] })
    },
    end(e) {
        console.log(e.detail)
        this.setData({ end: e.detail[1], endValue: e.detail[2] })
    },
    peoNum(e) {
        var peoNum = e.detail
        this.setData({ peopleNum: peoNum ? peoNum : 1 })
    },
    search() {
        if (!this.data.start) {
            wx.showModal({
                content: "未选择出发地点"
            })
            return;
        } else if (!this.data.end) {
            wx.showModal({
                content: "未选择到达地点"
            })
            return;
        } else if (!this.data.time) {
            wx.showModal({
                content: "未选择时间"
            })
            return;
        }
        let addressData = {
            startArray: this.data.startArray,
            startValue: this.data.startValue,
            endArray: this.data.endArray,
            endValue: this.data.endValue,
            time: this.data.time
        }
        wx.navigateTo({
            url: './search-car/search-car?addressData=' + JSON.stringify(addressData)
        })
    },
    trip() {
        wx.navigateTo({
            url: './my-car-sharing/my-car-sharing'
        })
    }

})