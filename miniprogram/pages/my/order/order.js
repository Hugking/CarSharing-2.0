Page({
  data: {
    currentTab: 1,
    tabs: [],
    orderlist: null,
    index:0
  },
  onLoad: function(options) {
    if (options.user_level) {
      this.setData({
        tabs: [
          {
            name: '已接单',
          },
          {
            name: '未结算',
          },
          {
            name: '已完成',
          },
        ],
      })
    } else {
      this.setData({
        tabs: [
          {
            name: '待接单',
          },
          {
            name: '待出行',
          },
          {
            name: '全部',
          },
          {
            name: '测试',
          },
        ],
      })
    }
    if (this.data.currentTab == 0) {
      this.Order_info('first', 'useropenid', 'isgo');
    }
    if (this.data.currentTab == 1) {
      this.Order_info('first', 'useropenid', 'all');
    }
  },
  change(e) {
    this.setData({
      currentTab: e.detail.index,
    })
    if (this.data.currentTab == 0) {
      this.Order_info('first', 'useropenid', 'isgo');
    }
    if (this.data.currentTab == 1) {
      this.Order_info('first', 'useropenid', 'all');
    }
  },
  createTable(e) {
    let Driver = new wx.BaaS.TableObject('Driver')
  },
  Order_info(type, openidtype, status) {
    var that = this
    console.log(type)
    wx.showNavigationBarLoading();
    if (type == 'up') {
      that.setData({
        orderlist: null,
        isLoad: false,
        index: 0
      })
    }
    if (type == 'low' || 'first') {
      that.setData({
        isLoad: false
      })
    }
    var Order = new wx.BaaS.TableObject('Order')
    var query = new wx.BaaS.Query()
    let userInfo = wx.getStorageSync('userInfo')
    query.compare(openidtype, '=', userInfo.openid)
    if (status == 'all') {
      query.compare('city', '=', "平顶山市");
      query.compare('delete', '=', false);
    }
    if (status == 'isgo') {
      query.compare('city', '=', "平顶山市");
      query.compare('delete', '=', false);
      query.compare('pay_status', '=', true);
      query.compare('cancel', '=', false);
      // query.compare('isget', '=', true);
      // query.compare('confirm_isget', '=', true);
      query.compare('completion', '=', false);
      // query.compare('in_car', '=', false);
      // query.compare('reminder', '=', false);
      // query.compare('settle', '=', false);
    }
    Order.setQuery(query).limit(10).offset(this.data.index * 10).orderBy('-pre_time').find().then(res => {
      // success
      // console.log("原始订单", res.data.objects)
      if (res.data.objects.length == 0) {
        console.log('最后一页', res.data.objects)
        that.setData({
          over: true,
          isLoad: true,
        })
        wx.hideNavigationBarLoading();
      } else {
        for (var i = 0; i < res.data.objects.length; i++) {
          res.data.objects[i].time = res.data.objects[i]['pre_time_str'];
        }
        if (type == 'first' || type == 'up') {
          console.log('首页', res.data.objects)
          that.setData({
            orderlist: res.data.objects,
            isLoad: true,
            index: 1
          })
          wx.hideNavigationBarLoading();
        }
        if (type == 'low') {
          console.log('下一页', this.data.index, res.data.objects)
          var list = res.data.objects
          //console.log(res.data.objects[0]['created_at'] = util.Formatunix(res.data.objects[0]['created_at']), res.data.objects[0])
          that.setData({
            orderlist: this.data.orderlist.concat(list),
            index: this.data.index + 1,
            isLoad: true
          })
          wx.hideNavigationBarLoading();
        }

      }

    }, err => {
      // err
    })
  },
})
