// components/sel-drop-list/sel-drop-list.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        content: {
            type: String,
            value: '项目名'
        },
        valueList: {
            type: Array,
            value: [{
                name: 'name',
                value: 'value',
                id: 'id'
            }],
        },
        height: {
            type: Number,
            value: 400
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        valueShow: false,
        valueName: '请选择'
    },
    /**
     * 组件的方法列表
     */
    methods: {
        valueShow() {
            this.triggerEvent('init')
            this.setData({
                valueShow: !this.data.valueShow
            })
        },
        Lower(e) {
            this.triggerEvent('lower')
        },
        setValue(e) {
            let item = e.currentTarget.dataset.item
            this.setData({
                valueName: item.value
            })
            this.valueShow()
            let res = { item: item }
            this.triggerEvent('set', res)
        }
    }
})