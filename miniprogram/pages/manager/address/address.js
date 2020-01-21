// miniprogram/pages/manager/address/address.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressList: [],
        current1: -1,
        current2: -1,
        edit: false,
        updateValue: '',
        valueShow: false,
        valueList: [],
        valuePage: 0,
    },
    onLoad() {
        this.listInit()
    },
    async listInit() {
        wx.showNavigationBarLoading()
        var that = this
        let provinceList = await that.getList('provinceDetail', '0')
        for (var provinceItem of provinceList) {
            if (provinceItem.id) {
                let cityList = await that.getList('cityDetail', provinceItem.id)
                for (var cityItem of cityList) {
                    if (cityItem.id) {
                        let addressList = await that.getList('addressDetail', cityItem.id)
                        cityItem['children'] = addressList
                    }
                }
                provinceItem["children"] = cityList
            }
        }
        wx.hideNavigationBarLoading()
        that.setData({
            addressList: provinceList
        })
    },
    getList(name, parent, page = 0) {
        return new Promise(resolve => {
            let query = new wx.BaaS.Query()
            query.compare('parent', '=', parent)
            query.compare('name', '=', name)
            query.compare('delete', '=', false)
            new wx.BaaS.TableObject('n_address')
                .setQuery(query).orderBy(['priority'])
                .select(['-created_at', '-created_by', '-updated_at', '-delete'])
                .limit(1000).offset(0).find().then(res => {
                    // success
                    let resList = res.data.objects
                    if (page === 0) {
                        let item = {
                            id: parent,
                            name: name,
                            value: '',
                            children: []
                        }
                        resList.push(item)
                    }
                    resolve(resList)
                })
        })
    },
    change1(e) {
        let index = e.currentTarget.dataset.idx;
        this.setData({
            current1: this.data.current1 == index ? -1 : index
        })
    },
    change2(e) {
        let index = e.currentTarget.dataset.idx
        this.setData({
            current2: this.data.current2 == index ? -1 : index
        })
    },
    plus(e) {
        // console.log(e.currentTarget.dataset)
        let item = e.currentTarget.dataset.item
        this.setData({
            updateName: item.name,
            updateId: item.id,
            updateValue: '',
        })
        this.valueListInit(item.name)
        this.valueShow()
    },
    reduceShow(e) {
        // console.log(e.currentTarget.dataset.item)
        var that = this
        let item = e.currentTarget.dataset.item
        that.setData({
            updateValue: item.value,
            updateName: item.name,
            updateId: item.id
        })
        wx.showModal({
            content: '确定要删除吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    that.reduce()
                }
            }
        })
    },
    reduce() {
        this.address('reduce')
    },
    valueListInit(name, page = 0) {
        wx.showNavigationBarLoading()
        if (name !== '') {
            wx.showNavigationBarLoading()
            let query = new wx.BaaS.Query()
            query.compare('name', '=', name)
            query.compare('delete', '=', false)
            new wx.BaaS.TableObject('n_field')
                .setQuery(query).orderBy(['priority'])
                .select(['-created_at', '-created_by', '-updated_at', '-delete'])
                .limit(20).offset(page * 20).find().then(res => {
                    // success
                    // console.log(res.data.objects)
                    let resList = res.data.objects
                    if (resList.length === 0) {
                        wx.showToast({ title: '暂无更多了', icon: 'none' })
                    } else {
                        wx.hideNavigationBarLoading()
                        this.setData({
                            valueList: page === 0 ? resList : this.data.valueList.concat(resList),
                            valuePage: page === 0 ? 1 : resList.length === 0 ? this.data.valuePage : this.data.valuePage + 1
                        })
                    }
                }, err => {
                    // err
                })
        } else {
            wx.showToast({ title: '无查询条件', icon: 'none' })
            wx.hideNavigationBarLoading()
        }
    },
    valueShow() {
        this.setData({
            valueShow: !this.data.valueShow,
            value: ''
        })
    },
    Lower() {
        this.valueListInit(this.data.name, this.data.valuePage)
    },
    setValue(e) {
        // console.log(e)
        let item = e.currentTarget.dataset.item
        let value = item.value
        let name = item.name
        let priority = item.priority
        this.setData({
            updateValue: value,
            updateName: name,
            updatePriority: priority
        })
    },
    address(type) {
        wx.showNavigationBarLoading()
        let query = new wx.BaaS.Query()
        switch (type) {
            case "reduce":
                { query.compare('id', '=', this.data.updateId) };
                break;
            case 'add':
                {
                    query.compare('parent', '=', this.data.updateId)
                    query.compare('name', '=', this.data.updateName)
                    query.compare('value', '=', this.data.updateValue)
                };
                break;
        }
        query.compare('delete', '=', false)
        new wx.BaaS.TableObject('n_address')
            .setQuery(query).orderBy(['priority'])
            .select(['-created_at', '-created_by', '-updated_at', '-delete'])
            .limit(1).offset(0).find().then(res => {
                // success
                // console.log(res.data)
                if (res.data.objects.length === 0) {
                    switch (type) {
                        case "reduce":
                            {
                                wx.hideNavigationBarLoading()
                                wx.showToast({ title: '未找到记录值', icon: 'none' })
                            };
                            break;
                        case 'add':
                            {
                                let n_address = new wx.BaaS.TableObject('n_address')
                                    .create()
                                n_address.set('parent', this.data.updateId)
                                n_address.set('name', this.data.updateName)
                                n_address.set('value', this.data.updateValue)
                                n_address.set('priority', this.data.updatePriority)
                                n_address.save().then(res => {
                                    // success
                                    wx.hideNavigationBarLoading()
                                    wx.showToast({ title: '提交成功', icon: 'none' })
                                        // console.log(res.data)
                                })
                            };
                            break;
                    }
                } else {
                    switch (type) {
                        case "reduce":
                            {
                                let n_address_id = res.data.objects[0].id
                                let n_address = new wx.BaaS.TableObject('n_address').getWithoutData(n_address_id)
                                n_address.set('delete', true)
                                n_address.update().then(res => {
                                    // success
                                    wx.hideNavigationBarLoading()
                                    wx.showToast({ title: '删除成功', icon: 'none' })
                                        // console.log(res.data)
                                }, err => {
                                    // err
                                })
                            };
                            break;
                        case 'add':
                            {
                                wx.hideNavigationBarLoading()
                                wx.showToast({ title: '已存在该记录', icon: 'none' })
                            };
                            break;
                        default:
                            break;
                    }
                }
                this.listInit()
            }, err => {
                // err
            })

        setTimeout(() => {
            wx.hideNavigationBarLoading()
        }, 2000);
    },
    submit() {
        // 检查并创建新的联表
        if (this.data.updateValue) {
            this.address('add')
            this.valueShow()
        } else {
            wx.showToast({ title: '您还未选择任何值', icon: 'none' })
        }
    },
    edit() {
        this.setData({
            edit: !this.data.edit
        })
    },
    onPullDownRefresh() {
        this.refresh(false)
    },
    refresh(start = true) {
        start ? wx.startPullDownRefresh() : null
        this.listInit()
        wx.stopPullDownRefresh()
    },
})