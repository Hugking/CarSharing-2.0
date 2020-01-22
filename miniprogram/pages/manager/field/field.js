Page({

    /**
     * 页面的初始数据
     */
    data: {
        fieldName: '请选择查询字段',
        fieldList: [],
        type: '0',
        parent: '0',
        name: '',
        valueList: [],
        edit: false,
        fieldShow: false,
        valuePage: 0,
        fieldPage: 0
    },
    fieldList(e) {
        let value = e.detail.item.value
        let id = e.detail.item.id
        let name = e.detail.item.name
        this.setData({
            fieldName: value,
            parent: id,
            name: name
        })
        this.valueListInit()
    },
    valueListInit(page = 0) {
        if (this.data.name !== '') {
            wx.showNavigationBarLoading()
            let query = new wx.BaaS.Query()
            query.compare('type', '=', this.data.type)
            query.compare('parent', '=', this.data.parent)
            query.compare('delete', '=', false)
            new wx.BaaS.TableObject('n_field')
                .setQuery(query).orderBy(['priority'])
                .select(['-created_at', '-created_by', '-updated_at', '-delete'])
                .limit(20).offset(page * 20).find().then(res => {
                    // success
                    // console.log(res.data.objects)
                    wx.hideNavigationBarLoading()
                    this.setData({
                        valueList: page === 0 ? res.data.objects : this.data.valueList.concat(res.data.objects),
                        valuePage: page === 0 ? 1 : res.data.objects.length === 0 ? this.data.valuePage : this.data.valuePage + 1
                    })
                }, err => {
                    // err
                })
        }
    },
    updateShow(e) {
        if (this.data.name === 'field') {
            if (e && Object.keys(e.currentTarget.dataset).length !== 0) {
                let fieldItem = e.currentTarget.dataset.item
                let fieldIdx = e.currentTarget.dataset.idx
                this.setData({
                    fieldItem: fieldItem,
                    fieldIdx: fieldIdx
                })
            }
            this.fieldShow()
        } else {
            if (e && Object.keys(e.currentTarget.dataset).length !== 0) {
                let updateItem = e.currentTarget.dataset.item
                let updateIdx = e.currentTarget.dataset.idx
                this.setData({
                    updateItem: updateItem,
                    updateIdx: updateIdx
                })
            }
            this.setData({
                updateShow: !this.data.updateShow,
            })
        }
    },
    updateSubmit(e) {
        let updateItem = this.data.updateItem
        updateItem.value = e.detail.value.value
        updateItem.priority = e.detail.value.priority
        wx.showNavigationBarLoading()
        let valueList = this.data.valueList
        if (this.data.updateIdx === this.data.valueList.length) {
            // 新增项
            let query = new wx.BaaS.Query()
            query.compare('value', '=', updateItem.value)
            query.compare('type', '=', this.data.type)
            query.compare('parent', '=', this.data.parent)
            query.compare('delete', '=', false)
            new wx.BaaS.TableObject('n_field')
                .setQuery(query).orderBy(['-created_at'])
                .select(['-created_at', '-created_by', '-updated_at', '-delete'])
                .limit(1).offset(0).find().then(res => {
                    // success
                    // console.log(res.data)
                    if (res.data.objects.length === 0) {
                        let n_field = new wx.BaaS.TableObject('n_field')
                            .create()
                        n_field.set('value', updateItem.value)
                        n_field.set('type', updateItem.type)
                        n_field.set('parent', updateItem.parent)
                        n_field.set('name', updateItem.name)
                        n_field.save().then(res => {
                            // success
                            console.log('新增成功')
                            wx.hideNavigationBarLoading()
                            wx.showToast({ title: '新增成功', icon: 'none' })
                            valueList.push(res.data)
                            this.setData({
                                valueList: valueList
                            })
                            this.updateShow()
                        })
                    } else {
                        console.log('查询到信息不允许重复');
                        wx.hideNavigationBarLoading()
                        wx.showToast({ title: '检测到重复项，创建失败', icon: 'none' })
                        this.updateShow()
                    }
                }, err => {
                    // err
                })
        } else {
            // 更新项
            if (valueList[this.data.updateIdx].value === updateItem.value &&
                valueList[this.data.updateIdx].priority === updateItem.priority) {
                wx.hideNavigationBarLoading()
                wx.showToast({ title: '值尚未改变', icon: 'none' })
                this.updateShow()
            } else {
                // 更新
                if (updateItem.id) {
                    let n_field_id = updateItem.id
                    let n_field = new wx.BaaS.TableObject('n_field').getWithoutData(n_field_id)
                    n_field.set('value', updateItem.value)
                    if (updateItem.priority) {
                        n_field.set('priority', updateItem.priority)
                    }
                    n_field.update().then(res => {
                        // success
                        console.log('更新成功')
                        wx.hideNavigationBarLoading()
                        wx.showToast({ title: '更新成功', icon: 'none' })
                        valueList[this.data.updateIdx] = res.data
                        this.setData({
                            valueList: valueList,
                        })
                        this.updateShow()
                        this.refresh()
                    }, err => {
                        // err
                    })
                } else {
                    wx.hideNavigationBarLoading()
                    wx.showToast({ title: '检测到重复项，创建失败', icon: 'none' })
                }
            }
        }
    },
    plus() {
        let name = this.data.name
        let newValue = {
            type: this.data.type,
            parent: this.data.parent,
            name: name === 'field' ? '' : name + 'Detail',
            value: ''
        }
        let obj = { currentTarget: { dataset: { item: null, idx: null } } }
        obj.currentTarget.dataset.item = newValue
        obj.currentTarget.dataset.idx = this.data.valueList.length
        this.updateShow(obj)
    },
    reduce() {
        wx.showNavigationBarLoading()
        let valueList = this.data.valueList
        let item = this.data.reduceItem
        let idx = this.data.reduceIdx
        let n_field_id = item.id
        let n_field = new wx.BaaS.TableObject('n_field').getWithoutData(n_field_id)
        n_field.set('delete', true)
        n_field.update().then(res => {
            // success
            console.log('删除成功', res.data)
            wx.showToast({ title: '删除成功', icon: 'none' })
            valueList.splice(idx, 1)
            this.setData({
                valueList: valueList
            })
            if (this.data.name === 'field') { this.fieldInit() }
            wx.hideNavigationBarLoading()
        }, err => {
            // err
        })
    },
    reduceShow(e) {
        this.setData({
            reduceIdx: e.currentTarget.dataset.idx,
            reduceItem: e.currentTarget.dataset.item
        })
        let that = this
        wx.showModal({
            content: '确认要删除吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    that.reduce()
                }
            }
        })
    },
    edit() {
        this.setData({
            edit: !this.data.edit
        })
    },
    fieldShow() {
        this.setData({
            fieldShow: !this.data.fieldShow
        })
    },
    fieldSunmit(e) {
        let fieldValue = e.detail.value
        let fieldItem = this.data.fieldItem
        let valueList = this.data.valueList
        let fieldList = this.data.fieldList
        wx.showNavigationBarLoading()
        let query = new wx.BaaS.Query()
        query.compare('name', '=', fieldValue.name)
        query.compare('type', '=', this.data.type)
        query.compare('parent', '=', '0')
        query.compare('delete', '=', false)
        new wx.BaaS.TableObject('n_field')
            .setQuery(query).orderBy(['-created_at'])
            .select(['-created_at', '-created_by', '-updated_at', '-delete'])
            .limit(1).offset(0).find().then(res => {
                // success
                // console.log(res.data)
                if (res.data.objects.length === 0) {
                    let n_field = new wx.BaaS.TableObject('n_field')
                        .create()
                    n_field.set('name', fieldValue.name)
                    n_field.set('value', fieldValue.value)
                    n_field.set('priority', fieldValue.priority)
                    n_field.set('type', this.data.type)
                    n_field.set('parent', '0')
                    n_field.save().then(res => {
                        // success
                        // console.log(res.data)
                        wx.hideNavigationBarLoading()
                        wx.showToast({ title: '新增成功', icon: 'none' })
                        this.fieldShow()
                        valueList.push(res.data)
                        this.setData({
                            valueList: valueList
                        })
                        this.fieldInit()
                    })
                } else {
                    console.log('重复项');
                    // 更新
                    if (fieldList[this.data.fieldIdx].name === fieldValue.name &&
                        fieldList[this.data.fieldIdx].value === fieldValue.value &&
                        fieldList[this.data.fieldIdx].priority === fieldValue.priority) {
                        wx.hideNavigationBarLoading()
                        wx.showToast({ title: '值尚未改变', icon: 'none' })
                        this.fieldShow()
                    } else {
                        // 更新
                        if (fieldItem.id) {
                            let n_field_id = fieldItem.id
                            let n_field = new wx.BaaS.TableObject('n_field').getWithoutData(n_field_id)
                            n_field.set('name', fieldValue.name)
                            n_field.set('value', fieldValue.value)
                            n_field.set('priority', fieldValue.priority)
                            n_field.update().then(res => {
                                // success
                                console.log('更新成功')
                                wx.hideNavigationBarLoading()
                                wx.showToast({ title: '更新成功', icon: 'none' })
                                valueList[this.data.updateIdx] = res.data
                                this.setData({
                                    valueList: valueList,
                                })
                                this.fieldInit()
                                this.fieldShow()
                            }, err => {
                                // err
                            })
                        } else {
                            wx.hideNavigationBarLoading()
                            wx.showToast({ title: '检测到重复项，创建失败', icon: 'none' })
                        }
                    }
                }
            }, err => {
                // err
            })
    },
    fieldInit(page = 0) {
        wx.showNavigationBarLoading()
        let query = new wx.BaaS.Query()
        query.compare('type', '=', this.data.type)
        query.compare('parent', '=', this.data.parent)
        query.compare('delete', '=', false)
        new wx.BaaS.TableObject('n_field')
            .setQuery(query).orderBy(['priority'])
            .select(['-created_at', '-created_by', '-updated_at', '-delete'])
            .limit(20).offset(page * 20).find().then(res => {
                // success
                // console.log(res.data.objects)
                wx.hideNavigationBarLoading()
                let fieldList = res.data.objects
                let field = {
                    value: '管理字段名',
                    id: '0',
                    name: 'field'
                }
                if (page === 0) {
                    fieldList.unshift(field)
                }
                this.setData({
                    fieldPage: page === 0 ? 1 : fieldList.length === 0 ? this.data.fieldPage : this.data.fieldPage + 1,
                    fieldList: page === 0 ? fieldList : this.data.fieldList.concat(fieldList),
                })
            }, err => {
                // err
            })
    },
    onLoad() {
        this.fieldInit()
    },
    onPullDownRefresh() {
        this.refresh(false)
    },
    refresh(start = true) {
        start ? wx.startPullDownRefresh() : null
        this.valueListInit()
        wx.stopPullDownRefresh()
    },
    valueLower() {
        this.valueListInit(this.data.valuePage)
    },
    fieldLower() {
        this.fieldInit(this.data.fieldPage)
    }
})