// components/base-card/base-card.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        textColor: {
            type: String,
            value: ""
        },
        type: {
            type: Number,
            value: 1
        },
        startArray: {
            type: Array,
            value: [{
                    "value": "平顶山市",
                    "children": [{
                            "value": "平顶山学院",
                            "children": []
                        },
                        {
                            "value": "城建学院",
                            "children": []
                        }
                    ]
                },
                {
                    "value": "郑州市",
                    "children": [{
                            "value": "郑州站",
                            "children": []
                        },
                        {
                            "value": "郑州机场",
                            "children": []
                        }
                    ]
                }
            ]
        },
        endArray: {
            type: Array,
            value: [{
                    "value": "平顶山市",
                    "children": [{
                            "value": "平顶山学院",
                            "children": []
                        },
                        {
                            "value": "城建学院",
                            "children": []
                        }
                    ]
                },
                {
                    "value": "郑州市",
                    "children": [{
                            "value": "郑州站",
                            "children": []
                        },
                        {
                            "value": "郑州机场",
                            "children": []
                        }
                    ]
                }
            ],
        },
        startValue: {
            type: Array,
            value: [0, 0]
        },
        endValue: {
            type: Array,
            value: [0, 0]
        },
    },
    /**
     * 组件的初始数据
     */
    data: {
        start: null,
        end: null,
        time: null,
        textColor: "",
    },
    lifetimes: {
        ready() {
            this.Time = this.selectComponent("#tui-dateTime-ctx")
            this.Start = this.selectComponent("#picker-2-view-start")
            this.End = this.selectComponent("#picker-2-view-end")
            if (this.data.startArray.length && this.data.endArray.length !== 0) {
                console.log('选择地点')
                if (this.data.type === 1) {
                    console.log('设置出发地',
                        this.data.startArray[this.data.startValue[0]].children[this.data.startValue[1]])
                    this.setData({
                        start: [
                            this.data.startArray[this.data.startValue[0]].value,
                            this.data.startArray[this.data.startValue[0]].children[this.data.startValue[1]].value,
                            this.data.startValue
                        ],
                    })
                    console.log('设置目的地',
                        this.data.endArray[this.data.endValue[0]].children[this.data.endValue[1]])
                    this.setData({
                        end: [
                            this.data.endArray[this.data.endValue[0]].value,
                            this.data.endArray[this.data.endValue[0]].children[this.data.endValue[1]].value,
                            this.data.endValue
                        ]
                    })
                    let Estart = {
                        detail: this.data.start
                    }
                    let Eend = {
                        detail: this.data.end
                    }
                    this.addressPickerStart(Estart)
                    this.addressPickerEnd(Eend)
                }
            } else {
                console.log('没有出入地点')
                wx.showToast({ title: '未查询到地点，请稍后重试', icon: 'none', duration: 2000 })
            }
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        timeShow(e) {
            this.Time.show()
        },
        addressShow(e) {
            var val = e.currentTarget.dataset.id
            switch (val) {
                case "start":
                    this.Start.show();
                    break;
                case "end":
                    this.End.show();
                    break;
                default:
                    break;
            }
        },
        timePicker(e) {
            var time = e.detail
            var that = this
            this.setData({
                time: time
            });
            wx.showModal({
                title: "注意核对出发时间",
                content: "出发时间为 " + that.data.time.result,
                success(res) {
                    if (res.confirm) {
                        that.triggerEvent("time", that.data.time)
                    }
                }
            })
        },
        addressPickerStart(e) {
            this.check("addressCheckLocal", "start", e.detail);
        },
        addressPickerEnd(e) {
            this.check("addressCheckLocal", "end", e.detail);
        },
        check(methods, type, val) {
            switch (methods) {
                case "addressCheckLocal":
                    this.addressCheckLocal(type, val);
                    break;
            }
        },
        addressCheckLocal(type, val) {
            // console.log("CheckLocal", type, val)
            var that = this
            switch (type) {
                case "start":
                    if (that.data.end && that.data.end[1] === val[1]) {
                        wx.showModal({
                            title: "提示",
                            content: "出发地与目的地不能相同",
                            success(res) {
                                if (res.confirm) {
                                    that.setData({
                                        start: null
                                    })
                                }
                            }
                        })
                    };
                    that.setData({
                        start: val
                    });
                    that.triggerEvent("start", that.data.start)
                    break;
                case "end":
                    if (that.data.start && that.data.start[1] === val[1]) {
                        wx.showModal({
                            title: "提示",
                            content: "出发地与目的地不能相同",
                            success(res) {
                                if (res.confirm) {
                                    that.setData({
                                        end: null
                                    })
                                }
                            }
                        })
                    }
                    that.setData({
                        end: val
                    });
                    that.triggerEvent("end", that.data.end)
                    break;
                default:
                    break;
            }
        },
    }

})