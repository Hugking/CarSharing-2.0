const util = require('../../utils/util.js')
Page({
    onLoad: function (options) {
        if (!wx.getStorageSync("tuiReadDoc")) {
            wx.setTabBarBadge({
                index: 0,
                text: '1'
            })
        }
        // 在页面中定义插屏广告
        let interstitialAd = null

        // 在页面onLoad回调事件中创建插屏广告实例
        if (wx.createInterstitialAd) {
            interstitialAd = wx.createInterstitialAd({
                adUnitId: 'adunit-44bbe9a9087910e3'
            })
            interstitialAd.onLoad(() => { })
            interstitialAd.onError((err) => { })
            interstitialAd.onClose(() => { })
        }

        // 在适合的场景显示插屏广告
        if (interstitialAd) {
            interstitialAd.show().catch((err) => {
                console.error(err)
            })
        }
    },
    data: {
        list: [{
            id: 'basic',
            name: '基础组件'
        }, {
            id: 'map',
            name: '地图',
        },
        {
            id: 'index',
            name: '索引列表',
        },
        {
            id: 'nav',
            name: '三级联动',
        },
        {
            id: 'canvas',
            name: '二维码生成',
        },
        {
            id: 'drawer',
            name: 'drawer抽屉',
        },
        {
            id: 'swipe',
            name: '滑动菜单',
        }
        ]
    },
    kindToggle: function (e) {
        var id = e.currentTarget.id,
            list = this.data.list;
        console.log(id)
        if (id == "basic") {
            wx.navigateTo({
                url: '../my/my',
            })
        } else if (id == "map") {
            wx.navigateTo({
                url: '../car-sharing/car-sharing',
            })
        }
        this.setData({
            list: list
        });
    },
    emit(city) {
        setTimeout(() => {
            wx.showToast({
                title: "您选择了：" + city,
                icon: "none"
            })
        }, 350)
    },
    href(e) {
        let page = e.currentTarget.dataset.page
        if (page == "subway") {
            let plugin = requirePlugin("subway");
            let key = 'ZEHBZ-UK5K4-CN5UN-XX4YM-4LS66-IEFWH';
            let referer = 'ThorUI';
            wx.navigateTo({
                url: 'plugin://subway/index?key=' + key + '&referer=' + referer
            });
        }
    },
    github: function () {
        wx.setClipboardData({
            data: 'https://github.com/dingyong0214/ThorUI',
            success(res) {
                wx.getClipboardData({
                    success(res) {
                        util.toast("链接已复制", 2000, true)
                    }
                })
            }
        })
    },
    template: function () {
        wx.navigateTo({
            url: '../extend-view/template/template'
        })
    },
    doc: function () {
        wx.setStorageSync("tuiReadDoc", "1")
        wx.removeTabBarBadge({
            index: 0
        })
        wx.navigateTo({
            url: '../basic-view/doc/doc'
        })
    }
});