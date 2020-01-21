// miniprogram/pages/car-sharing/car-sharing-detail/car-sharing-detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tripInfo: {
            avatar: '',
            nickName: '',
            pushTime: '1234',
            preTime: '1234',
            start: '平顶山学院',
            end: '平顶山站',
            peoNum: 1,
            peoTotalNum: 2,
            driver: "王凯",
            driverTel: '15670813638'
        },
        driver: {
            nickName: "小明",
            tel: "15670813638",
            carNum: "豫12345",
            carColor: "黄色",
        },
        user: {
            userList: [{
                    nickName: "wg",
                    tel: "15670813638",
                    note: "",
                },
                {
                    nickName: "王凯",
                    tel: "电话",
                    note: "选取一个模块，该模块由其领域内的像素点组成，一般选取 3*3 或者5*5 的模块，求其模块中所有像素点的平均值，再把该平均值替换掉当前像素点，作为均值滤波中处理后的像素点 g(x,y)均值滤波的缺点是把原始图像变得模糊不清，即不能够很好地保留图像的原有细节，是因为它对所有点都是用一样的均值",
                }
            ]
        },
        edit: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})