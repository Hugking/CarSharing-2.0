// miniprogram/pages/car-sharing/release/release.js
Page({

    data: {
        start: null,
        end: null,
        time: null,
        rightValue: 0,
        leftValue: 0,
        peoNum: 1,
        peoTotalNum: 1,
        note: "",
        textColor: "",
        activeTextColor: ""
    },
    onLoad(options) {
        if (options) {
            let addressData = JSON.parse(options.addressData)
            this.setData({
                startArray: addressData.startArray,
                endArray: addressData.endArray,
                startValue: addressData.startValue ? addressData.startValue : [0, 0],
                endValue: addressData.endValue ? addressData.endValue : [0, 0],
            })
        }
    },
    time(e) {
        // console.log(e.detail)
        this.setData({
            time: e.detail
        })
    },
    start(e) {
        // console.log(e.detail)
        this.setData({ start: e.detail[1] })
    },
    end(e) {
        // console.log(e.detail)
        this.setData({ end: e.detail[1] })
    },
    peoNum(e) {
        var peoNum = e.detail
        this.setData({
            peoNum: peoNum ? peoNum : 1
        })
    },
    peoTotalNum(e) {
        var peoTotalNum = e.detail
        this.setData({
            peoTotalNum: peoTotalNum ? peoTotalNum : 1
        })
    },
    leftChange(e) {
        this.setData({
                leftValue: e.detail.left
            })
            // console.log(e.detail.left)
    },
    rightChange(e) {
        this.setData({
                rightValue: e.detail.right
            })
            // console.log(e.detail.right)
    },
    input(e) {
        this.setData({
            note: e.detail.value,
            textNum: e.detail.value.length
        })
    },
    push() {
        if (this.data.peoNum > this.data.peoTotalNum) {
            wx.showModal({
                content: "乘客总数大于实际乘车人数",
            })
            return;
        } else if (!this.data.start) {
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
        let timeStamp = this.data.time.timeStamp
        this.data.endTime = new Date(Number(timeStamp) + 8 * 3600 * 1000 +
                this.data.rightValue * 60 * 1000
            ).toISOString()
            .replace(/Z/, '000+08:00')

        this.data.startTime = new Date(Number(timeStamp) + 8 * 3600 * 1000 +
                this.data.leftValue * 60 * 1000
            ).toISOString()
            .replace(/Z/, '000+08:00')
        console.log("发布信息", this.data)
    },
    back() {
        console.log("back")
    }
})