// components/slider/slider.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        color: {
            type: String,
            value: "#000"
        },
        bgColor: {
            type: String,
            value: "#fff"
        },
        max: {
            type: Number,
            value: 60
        },
        min: {
            type: Number,
            value: -60
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        leftValue: 0,
        rightValue: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        leftChange(e) {
            let leftValue = e.detail.value
            this.setData({
                leftValue: leftValue
            })
            let result = { left: this.data.leftValue, right: this.data.rightValue }
            this.triggerEvent("left", result)
        },
        rightChange(e) {
            let rightValue = e.detail.value
            this.setData({
                rightValue: rightValue
            })
            let result = { left: this.data.leftValue, right: this.data.rightValue }
            this.triggerEvent("right", result)
        }
    }
})