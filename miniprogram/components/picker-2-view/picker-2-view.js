// components/picker-2-view/picker-2-view.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        addressData: {
            type: Array,
            value: [{
                    "value": "选项1",
                    "children": [{
                            "value": "选项1-1",
                            "children": []
                        },
                        {
                            "value": "选项1-2",
                            "children": []
                        }
                    ]
                },
                {
                    "value": "选项2",
                    "children": [{
                            "value": "选项2-1",
                            "children": []
                        },
                        {
                            "value": "选项2-2",
                            "children": []
                        }
                    ]
                },
            ]
        },
        externalValue: {
            type: Array,
            value: [0, 0]
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        cityArr: [],
        addressArr: [],
        value: [0, 0],
        _isScroll: false,
        showPickerStatus: false,
        animationData: "",
    },
    lifetimes: {
        ready() {
            this.setValue();
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        setValue() {
            let addArray = []
            if (this.data.addressData[0]) {
                addArray = this.toArr(this.data.addressData[0].children)
            }
            this.setData({
                cityArr: this.toArr(this.data.addressData),
                addressArr: addArray,
            })
            if (this.data.externalValue[0] || this.data.externalValue[1] !== 0) {
                this.setData({
                    value: [this.data.externalValue[0], 0]
                })
                this.setData({
                    value: [this.data.externalValue[0], this.data.externalValue[1]]
                })
            }
        },
        toArr(object) {
            let arr = [];
            for (let i in object) {
                arr.push(object[i].value);
            }
            return arr;
        },
        //滚动结束
        bindpickstart: function(e) {
            // console.log("开始滚动==")
            wx.showNavigationBarLoading()
            this.data._isScroll = true
        },
        //滚动结束
        bindpickend: function(e) {
            // console.log("结束滚动==")
            this.data._isScroll = false
            wx.hideNavigationBarLoading()
        },
        //picker change切换事件
        columnPicker: function(e) {
            let value = e.detail.value;
            //如果两者下标不一致，表示滚动过
            if (this.data.value[0] !== value[0]) {
                this.setData({
                    cityArr: this.toArr(this.data.addressData),
                    addressArr: this.toArr(this.data.addressData[value[0]].children),
                    value: [value[0], 0]
                })
            } else {
                this.setData({
                        value: value
                    })
                    // console.log("设置", value, this.data.value)
            }
        },
        //确定按钮
        picker: function(e) {
            let value = this.data.value;
            if (this.data._isScroll) {
                console.log("pickerView还没滚动完")
                wx.showNavigationBarLoading()
                return
            }
            if (this.data.addressData.length > 0) {
                let city = this.data.addressData[value[0]].value
                let address = this.data.addressData[value[0]].children[value[1]].value
                this.setData({
                    showPickerStatus: false
                })
                let text = [city, address, value]
                this.triggerEvent("confirm", text)
            }
        },
        // 显示picker-view
        show: function() {
            var animation = wx.createAnimation({
                duration: 220,
                timingFunction: "linear",
                delay: 0
            })
            animation.translateY(500).step()
            this.setData({
                animationData: animation.export(),
                showPickerStatus: true
            })
            setTimeout(function() {
                animation.translateY(0).step()
                this.setData({
                    animationData: animation.export()
                })
            }.bind(this), 200)
        },
        // 隐藏picker-view
        hide: function() {
            this.setData({
                showPickerStatus: false
            })
        }
    }
})