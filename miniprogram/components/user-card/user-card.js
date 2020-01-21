// components/user-card/user-card.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        type: {
            type: Number,
            value: 0
        },
        edit: {
            type: Boolean,
            value: false
        },
        Info: {
            type: Object,
            value: null,
            observer(val) {
                this.propsChange();
            }
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        driverInfo: {
            nickName: "昵称",
            tel: "电话",
            carNum: "车牌",
            carColor: "车体颜色",
        },
        userInfo: {
            userList: [{
                nickName: "昵称",
                tel: "电话",
                note: "备注",
            }]
        },
        opearBtn: false,
        reset: false
    },
    lifetimes: {
        attached: function() {
            this.initData()
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        propsChange() {
            this.setData({
                reset: true
            })
            setTimeout(() => {
                this.initData()
            }, 10);
        },
        initData() {
            this.setData({
                reset: false
            })
            switch (this.data.type) {
                case 0:
                    if (this.data.Info) {
                        this.setData({
                            driverInfo: this.data.Info
                        })
                    };
                    break;
                case 1:
                    if (this.data.Info) {
                        this.setData({
                            userInfo: this.data.Info
                        })
                    };
                    break;
                default:
                    break;
            }
        },
        callPhone(e) {
            let phone = e.currentTarget.dataset.tel;
            wx.makePhoneCall({
                phoneNumber: phone,
            })
        },
        detail(e) {
            let result = { Info: this.data.Info }
            this.triggerEvent("detail", result)
        },
        delete(e) {
            let that = this
            let idx = e.currentTarget.dataset.idx
            let result = { Info: this.data.Info, Idx: idx, Delete: this.data.Info.userList[idx] }
            wx.showModal({
                content: "确定删除该乘客吗？",
                success(res) {
                    if (res.confirm) {
                        that.data.userInfo.userList.splice(idx, 1)
                        that.setData({
                            userInfo: that.data.userInfo
                        })
                        that.triggerEvent("delete", result)
                    }
                }
            })
        },
        edit() {
            this.setData({
                opearBtn: !this.data.opearBtn
            })
        }
    }
})