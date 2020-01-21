// components/peoNum-sel/peoNum-sel.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        text: {
            type: String,
            value: "人数"
        },
        color:{
          type:String,
          value:"#5677fc"
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        peopleNum: 1
    },

    /**
     * 组件的方法列表
     */
    methods: {
        peoplePicker(e) {
            var peoNum = e.currentTarget.dataset.num
            this.setData({ peopleNum: peoNum ? peoNum : 1 })
            this.triggerEvent("sel", peoNum)
        }
    }
})