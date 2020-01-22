// miniprogram/pages/manager/price/price.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        add: false,
        edit: false,
        modal: false,
        modalText: '',
        proDropName: 'start',
        proDropData: [],
        proDropIndex: -1,
        dropShow: false,
        scrollTop: 0,
    },
    btnDropChange(e) {
        let index = e.currentTarget.dataset.index;
        let name = e.currentTarget.dataset.name
        let List
        switch (name) {
            case 'start':
                List = this.data.startList;
                break;
            case "end":
                List = this.data.endList;
                break;
            case "startTime":
                List = this.data.startTimeList;
                break;
            case "endTime":
                List = this.data.endTimeList;
                break;
            case "price":
                List = this.data.priceList;
                break;
            case "peoNum":
                List = this.data.peoNumList;
                break;
            default:
                break;
        }
        this.setData({
            proDropName: name,
            proDropData: List,
            proDropIndex: index,
            dropShow: true
        }, () => {
            this.setData({
                scrollTop: 0
            })
        })
    },
    btnSelected(e) {
        let index = e.currentTarget.dataset.index;
        let selected = `proDropData[${index}].selected`;
        this.setData({
            [selected]: !this.data.proDropData[index].selected
        })
    },
    reset() {
        let arr = this.data.proDropData;
        for (let item of arr) {
            item.selected = false;
        }
        this.setData({
            proDropData: arr
        })
    },
    btnCloseDrop() {
        this.setData({
            scrollTop: 0,
            dropShow: false,
            proDropIndex: -1
        })
        this.valueInit({
            type: 'find',
            queryList: [
                ...this.findKey({ list: this.data.startList }),
                ...this.findKey({ list: this.data.endList }),
                ...this.findKey({ list: this.data.startTimeList }),
                ...this.findKey({ list: this.data.endTimeList }),
                ...this.findKey({ list: this.data.priceList }),
                ...this.findKey({ list: this.data.peoNumList })
            ]
        })
    },
    findKey(obj = {}) {
        const { list = [] } = obj
        let resList = []
        for (var item of list) {
            if (item.selected) {
                resList.push({ name: item.name, value: item.value })
            }
        }
        return resList
    },
    onLoad() {
        console.log('初始化开始')
        this.initDataList()
        this.valueInit({ type: 'find' })
    },
    onShow() {},
    async initDataList() {
        await this.FieldInit({ name: "address", type: "start" });
        await this.FieldInit({ name: "address", type: "end" });
        await this.FieldInit({ name: "time", type: "startTime" });
        await this.FieldInit({ name: "time", type: "endTime" });
        await this.FieldInit({ name: "price", type: "price" });
        await this.FieldInit({ name: "peoNum", type: "peoNum" });
    },
    async Lower(e) {
        let type = e.currentTarget.dataset.name
        console.log('加载更多' + type + '列表');
        switch (type) {
            case "start":
                {
                    await this.FieldInit({ name: "address", type: "start", page: this.data.startPage });
                    break;
                }
            case "end":
                {
                    await this.FieldInit({ name: "address", type: "end", page: this.data.endPage });
                    break;
                }
            case "startTime":
                {
                    await this.FieldInit({ name: "time", type: "startTime", page: this.data.startTimePage });
                    break;
                }
            case "endTime":
                {
                    await this.FieldInit({ name: "time", type: "endTime", page: this.data.endTimePage });
                    break;
                }
            case "price":
                {
                    await this.FieldInit({ name: "price", type: "price", page: this.data.pricePage });
                    break;
                }
            case "peoNum":
                {
                    await this.FieldInit({ name: "peoNum", type: "peoNum", page: this.data.peoNumPage });
                    break;
                }
            case 'find':
                {
                    this.valueInit({ type: 'find', page: this.data.valuePage });
                    break;
                }
            default:
                break;
        }
    },
    updateShow(e) {
        let item = e.currentTarget.dataset.item
        this.setData({
            modal: !this.data.modal,
            modalText: item ? item.start + "->" + item.end + " " + item.startTime + "-" + item.endTime + " " + item.peoNum + "人 " + "￥" + item.price : ''
        })
    },
    reduceShow(e) {
        let item = e.currentTarget.dataset.item
        let idx = e.currentTarget.dataset.idx
        this.valueInit({
            type: 'delete',
            queryList: [{
                    name: 'start',
                    value: item.start
                },
                {
                    name: 'end',
                    value: item.end
                },
                {
                    name: 'startTime',
                    value: item.startTime
                },
                {
                    name: 'endTime',
                    value: item.endTime
                },
                {
                    name: 'peoNum',
                    value: item.peoNum
                },
                {
                    name: 'price',
                    value: item.price
                },
            ],
            idx: idx
        })
    },
    set(e) {
        let type = e.currentTarget.dataset.name
        let item = e.detail.item
        switch (type) {
            case "start":
                {
                    this.setData({
                        start: item.value
                    });
                    break;
                }
            case "end":
                {
                    this.setData({
                        end: item.value
                    });
                    break;
                }
            case "startTime":
                {
                    this.setData({
                        startTime: item.value
                    });
                    break;
                }
            case "endTime":
                {
                    this.setData({
                        endTime: item.value
                    });
                    break;
                }
            case "peoNum":
                {
                    this.setData({
                        peoNum: item.value
                    });
                    break;
                }
            case "price":
                {
                    this.setData({
                        price: item.value
                    });
                    break;
                }
            default:
                break;
        }
        console.log('设置' + type, item.value);
    },
    submit() {
        if (!this.data.start) {
            wx.showToast({
                title: "未填写开始地点",
                icon: 'none'
            });
            return;
        }
        if (!this.data.end) {
            wx.showToast({
                title: "未填写结束地点",
                icon: 'none'
            });
            return;
        }
        if (!this.data.startTime) {
            wx.showToast({
                title: "未填写开始时间",
                icon: 'none'
            });
            return;
        }
        if (!this.data.endTime) {
            wx.showToast({
                title: "未填写结束时间",
                icon: 'none'
            });
            return;
        }
        if (!this.data.peoNum) {
            wx.showToast({
                title: "未填写乘客数量",
                icon: 'none'
            });
            return;
        }
        if (!this.data.price) {
            wx.showToast({
                title: "未填写价格费用",
                icon: 'none'
            });
            return;
        }
        this.valueInit({
            type: 'add',
            queryList: [{
                    name: 'start',
                    value: this.data.start
                },
                {
                    name: 'end',
                    value: this.data.end
                },
                {
                    name: 'startTime',
                    value: this.data.startTime
                },
                {
                    name: 'endTime',
                    value: this.data.endTime
                },
                {
                    name: 'peoNum',
                    value: this.data.peoNum
                },
                {
                    name: 'price',
                    value: this.data.price
                },
            ]
        })
        this.setData({
            add: !this.data.add
        })
    },
    find() {
        this.setData({
            add: !this.data.add
        })
        if (!this.data.add) {
            this.valueInit({ type: "find" })
        }
    },
    edit() {
        this.setData({
            edit: !this.data.edit
        })
    },
    valueInit(args = {}) {
        const {
            type = 'find', idx = null, queryList = [], page = 0
        } = args
        wx.showNavigationBarLoading()
        let query = new wx.BaaS.Query()
        query.compare('delete', '=', false)
        for (var item of queryList) {
            query.compare(item.name, '=', item.value)
        }
        new wx.BaaS.TableObject('n_price')
            .setQuery(query).orderBy(['strart', 'peoNum', 'price'])
            .select(['-created_at', '-created_by', '-updated_at', '-delete'])
            .limit(20).offset(page * 20).find().then(res => {
                // success
                wx.hideNavigationBarLoading()
                let resList = res.data.objects
                if (resList.length === 0) {
                    switch (type) {
                        case 'find':
                            this.setData({
                                valueList: page === 0 ? resList : this.data.valueList.concat(resList),
                                valuePage: page === 0 ? 1 : resList.length === 0 ? this.data.valuePage : this.data.valuePage + 1
                            });
                            wx.showToast({
                                title: '暂无更多了',
                                icon: 'none'
                            })
                            break;
                        case 'delete':
                            wx.showToast({
                                title: '未找到该记录',
                                icon: 'none'
                            })
                            break;
                        case 'add':
                            let item = Object.fromEntries(queryList.map(item => {
                                return Object.values(item)
                            }))
                            if (item) {
                                new wx.BaaS.TableObject('n_price')
                                    .create()
                                    .set(item).save().then(res => {
                                        // success
                                        wx.showToast({
                                            title: '创建成功',
                                            icon: 'none'
                                        })
                                        this.valueInit({
                                                type: 'find'
                                            })
                                            // console.log(res)
                                    }, err => {
                                        //err 为 HError 对象
                                    })
                            } else {
                                wx.showToast({
                                    title: '参数错误',
                                    icon: 'none'
                                })
                            }
                            break;
                    }
                } else {
                    switch (type) {
                        case 'find':
                            this.setData({
                                valueList: page === 0 ? resList : this.data.valueList.concat(resList),
                                valuePage: page === 0 ? 1 : resList.length === 0 ? this.data.valuePage : this.data.valuePage + 1
                            });
                            break;
                        case 'delete':
                            wx.showNavigationBarLoading()
                            let n_price_id = resList[0].id
                            let n_price = new wx.BaaS.TableObject('n_price').getWithoutData(n_price_id)
                            n_price.set('delete', true)
                            n_price.update().then(res => {
                                // success
                                wx.hideNavigationBarLoading()
                                wx.showToast({
                                        title: '删除成功',
                                        icon: 'none'
                                    })
                                    // console.log(res.data)
                                this.valueInit({
                                    type: 'find'
                                })
                            }, err => {
                                // err
                            });
                            break;
                        case 'add':
                            wx.showToast({
                                title: '存在重复值，创建失败',
                                icon: 'none'
                            })
                            break
                    }
                }
            }, err => {
                // err
            })
        setTimeout(() => {
            wx.hideNavigationBarLoading()
        }, 2000)
    },
    FieldInit(args) {
        return new Promise((resolve, reject) => {
            const { name = 'address', type = "start", page = 0 } = args
            wx.showNavigationBarLoading()
            let query = new wx.BaaS.Query()
            query.compare('name', '=', name + 'Detail')
            query.compare('delete', '=', false)
            new wx.BaaS.TableObject('n_field')
                .setQuery(query).orderBy(['priority'])
                .select(['-created_at', '-created_by', '-updated_at', '-delete'])
                .limit(20).offset(page * 20).find().then(res => {
                    // success
                    let resList = res.data.objects.map(item => {
                        let obj = item
                        obj.selected = false
                        return obj
                    })
                    if (resList.length === 0) {
                        wx.showToast({
                            title: '暂无更多了',
                            icon: 'none'
                        })
                    }
                    switch (type) {
                        case "start":
                            resList = resList.map(item => { item.name = 'start'; return item })
                            this.setData({
                                startList: page === 0 ? resList : this.data.startList.concat(resList),
                                startPage: page === 0 ? 1 : resList.length === 0 ? this.data.startPage : this.data.startPage + 1
                            });
                            resolve(this.data.startList)
                            break;
                        case "end":
                            resList = resList.map(item => { item.name = 'end'; return item })
                            this.setData({
                                endList: page === 0 ? resList : this.data.endList.concat(resList),
                                endPage: page === 0 ? 1 : resList.length === 0 ? this.data.endPage : this.data.endPage + 1
                            });
                            resolve(this.data.endList)
                            break;
                        case "startTime":
                            resList = resList.map(item => { item.name = 'startTime'; return item })
                            this.setData({
                                startTimeList: page === 0 ? resList : this.data.startTimeList.concat(resList),
                                startTimePage: page === 0 ? 1 : resList.length === 0 ? this.data.startTimePage : this.data.startTimePage + 1
                            });
                            resolve(this.data.startTimeList)
                            break;
                        case "endTime":
                            resList = resList.map(item => { item.name = 'endTime'; return item })
                            this.setData({
                                endTimeList: page === 0 ? resList : this.data.endTimeList.concat(resList),
                                endTimePage: page === 0 ? 1 : resList.length === 0 ? this.data.endTimePage : this.data.endTimePage + 1
                            });
                            resolve(this.data.endTimeList)
                            break;
                        case "price":
                            resList = resList.map(item => { item.name = 'price'; return item })
                            this.setData({
                                priceList: page === 0 ? resList : this.data.priceList.concat(resList),
                                pricePage: page === 0 ? 1 : resList.length === 0 ? this.data.pricePage : this.data.pricePage + 1
                            });
                            resolve(this.data.priceList)
                            break;
                        case "peoNum":
                            resList = resList.map(item => { item.name = 'peoNum'; return item })
                            this.setData({
                                peoNumList: page === 0 ? resList : this.data.peoNumList.concat(resList),
                                peoNumPage: page === 0 ? 1 : resList.length === 0 ? this.data.peoNumPage : this.data.peoNumPage + 1
                            });
                            resolve(this.data.peoNumList)
                            break;
                        default:
                            reject(new Error('未查询到记录值'))
                            break;
                    }
                }, err => {
                    // err
                })
            setTimeout(() => {
                wx.hideNavigationBarLoading()
            }, 2000);
        })
    },
})