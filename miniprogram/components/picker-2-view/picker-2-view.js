// components/picker-2-view/picker-2-view.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    addressData: {
      type: Array,
      value: [{
        "name": "平顶山1",
        "id": "1",
        "children": [{
          "name": "平顶山学院1",
          "id": "02",
          "childres": []
        },
        {
          "name": "城建学院1",
          "id": "03",
          "childres": []
        }]
      },
      {
        "name": "平顶山2",
        "id": "1",
        "children": [{
          "name": "平顶山学院2",
          "id": "02",
          "childres": []
        },
        {
          "name": "城建学院2",
          "id": "03",
          "childres": []
        }]
      },
      ]
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
    attached() {
      this.setValue();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setValue() {
      this.setData({
        cityArr: this.toArr(this.data.addressData),
        addressArr: this.toArr(this.data.addressData[0].children)
      })
    },
    toArr(object) {
      let arr = [];
      for (let i in object) {
        arr.push(object[i].name);
      }
      return arr;
    },
    //滚动结束
    bindpickstart: function (e) {
      console.log("开始滚动==")
      wx.showNavigationBarLoading()
      this.data._isScroll = true
    },
    //滚动结束
    bindpickend: function (e) {
      console.log("结束滚动==")
      this.data._isScroll = false
      wx.hideNavigationBarLoading()
    },
    //picker change切换事件
    columnPicker: function (e) {
      let value = e.detail.value;
      //如果两者下标不一致，表示滚动过
      if (this.data.value[0] !== value[0]) {
        this.setData({
          cityArr: this.toArr(this.data.addressData),
          addressArr: this.toArr(this.data.addressData[value[0]].children),
          value: [value[0], 0]
        })
      }
      else {
        this.setData({
          value: value
        })
        // console.log("设置", value, this.data.value)
      }
    },
    //确定按钮
    picker: function (e) {
      let value = this.data.value;
      if (this.data._isScroll) {
        console.log("pickerView还没滚动完")
        wx.showNavigationBarLoading()
        return
      }
      if (this.data.addressData.length > 0) {
        let city = this.data.addressData[value[0]].name
        let address = this.data.addressData[value[0]].children[value[1]].name
        this.setData({
          showPickerStatus: false
        })
        let text = [city, address]
        this.triggerEvent("confirm", text)
      }
    },
    // 显示picker-view
    show: function () {
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
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 200)
    },
    // 隐藏picker-view
    hide: function () {
      this.setData({
        showPickerStatus: false
      })
    }
  }
})
