const util = require('../../utils/util.js')
const app = getApp()
const globalData = getApp().globalData
Page({
  onLoad: function(options) {},
  data: {
    elements: [{
        title: '地址管理',
        url: '/manager/address/address',
        name: 'button',
        color: 'cyan',
        icon: 'newsfill',
      },
      {
        title: '字段管理',
        url: '/manager/field/field',
        name: 'text',
        color: 'blue',
        icon: 'colorlens'
      },
      {
        title: '拼车',
        url: '/car-sharing/car-sharing',
        name: 'CarSharing',
        color: 'purple',
        icon: 'font'
      },
      {
        title: '价格管理 ',
        url: '/manager/price/price',
        name: 'icon',
        color: 'mauve',
        icon: 'icon'
      },
      {
        title: '我的',
        url: '/my/my',
        name: 'MyZone',
        color: 'pink',
        icon: 'btn'
      },
      {
        title: '标签',
        name: 'tag',
        color: 'brown',
        icon: 'tagfill'
      },
      {
        title: '头像',
        name: 'avatar',
        color: 'red',
        icon: 'myfill'
      },
      {
        title: '进度条',
        name: 'progress',
        color: 'orange',
        icon: 'icloading'
      },
      {
        title: '边框阴影',
        name: 'shadow',
        color: 'olive',
        icon: 'copy'
      },
      {
        title: '加载',
        name: 'loading',
        color: 'green',
        icon: 'loading2'
      },
    ],
  },
  onShow() {
    this.listInit()

  },
  async listInit() {
    wx.showNavigationBarLoading()
    var that = this
    let defaultList
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
        if (provinceList.indexOf(provinceItem) === 0) {
          defaultList = cityList
        }
        if (globalData.loaclAddress === provinceItem.value) {
          globalData.addressArray = cityList
        }
      }
    }
    wx.hideNavigationBarLoading()
    if (!globalData.addressArray) {
      globalData.addressArray = defaultList
    }
    // console.log(provinceList)
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
          // if (page === 0) {
          //     let item = {
          //         id: parent,
          //         name: name,
          //         value: '',
          //         children: []
          //     }
          //     resList.push(item)
          // }
          resolve(resList)
        })
    })
  },
  // toChild(e) {
  //     wx.navigateTo({
  //         url: '/pages/' + e.currentTarget.dataset.url
  //     })
  // },
  // kindToggle: function(e) {
  //     var id = e.currentTarget.id,
  //         list = this.data.list;
  //     console.log(id)
  //     if (id == "basic") {
  //         wx.navigateTo({
  //             url: '../my/my',
  //         })
  //     } else if (id == "map") {


  //     } else if (id == "index") {
  //         wx.navigateTo({
  //             url: '../my/custom-msg/custom-msg',
  //         })
  //     }
  //     this.setData({
  //         list: list
  //     });
  // },

});