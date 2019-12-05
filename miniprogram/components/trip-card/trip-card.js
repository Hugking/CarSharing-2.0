// components/trip-card/trip-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: Number,
      value: 0
    },
    color: {
      type: String,
      value: ""
    },
    tripInfo: {
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
    Info: {
      avatar: "./avatar.png",
      nickName: "昵称",
      pushTime: "发布时间",
      preTime: "出发时间",
      start: "出发地",
      end: "目的地",
      peoNum: 1,
      peoTotalNum: 1,
      driver: "司机姓名",
      driverTel: '司机电话'
    },
    reset: false
  },
  lifetimes: {
    attached() {
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
      if (this.data.tripInfo) {
        this.setData({
          Info: this.data.tripInfo
        })
      }
    },
    goTo(e) {
      let result = { Info: this.data.Info }
      this.triggerEvent("goTo", result)
    },
    detail(e){
      let result = { Info: this.data.Info }
      this.triggerEvent("detail", result)
    }
  }
})
