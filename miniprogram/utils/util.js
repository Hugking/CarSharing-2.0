/**
 * @description 实现缓存读取接口数据
 * @param {*} fn
 * @returns 对应数组
 */
const memorize = (fn) => {
    const cache = {}
    return function(...args) {
        const _args = JSON.stringify(args)
        return cache[_args] || (cache[_args] = fn.apply(fn, args))
    }
}
const nums = {
    /** 
     ** 除法函数，用来得到精确的除法结果
     ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
     ** 调用：numDiv(arg1,arg2)
     ** 返回值：arg1除以arg2的精确结果
     **/
    numDiv(arg1, arg2) {
        var t1 = 0,
            t2 = 0,
            r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        } catch (e) {}
        try {
            t2 = arg2.toString().split(".")[1].length;
        } catch (e) {}
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    },
    /**
     ** 乘法函数，用来得到精确的乘法结果
     ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
     ** 调用：numMul(arg1,arg2)
     ** 返回值：arg1乘以 arg2的精确结果
     **/
    numMul(arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        } catch (e) {}
        try {
            m += s2.split(".")[1].length;
        } catch (e) {}
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    /**
     ** 减法函数，用来得到精确的减法结果
     ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
     ** 调用：numSub(arg1,arg2)
     ** 返回值：arg1加上arg2的精确结果
     **/
    numSub(arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    /**
     ** 加法函数，用来得到精确的加法结果
     ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
     ** 调用：numAdd(arg1,arg2)
     ** 返回值：arg1加上arg2的精确结果
     **/
    numAdd(arg1, arg2) {
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    },
}
const times = {
        /*
         * Unix时间戳转换成日期格式  numToString("1497232433000")
         * @param UnixTime Unix时间戳
         * @return yyyy-MM-dd HH:mm:ss
         */
        numToTime: function(UnixTime) {
            var date = new Date(parseInt(UnixTime * 1000))
            var h = date.getHours()
            h = h < 10 ? ('0' + h) : h
            var minute = date.getMinutes()
            minute = minute < 10 ? ('0' + minute) : minute
            return h + ':' + minute
        },
        numToHour: function(UnixTime) {
            var date = new Date(parseInt(UnixTime * 1000))
            var h = date.getHours()
            h = h < 10 ? ('0' + h) : h
            return h
        },
        numToMinutes: function(UnixTime) {
            var date = new Date(parseInt(UnixTime * 1000))
            var minute = date.getMinutes()
            minute = minute < 10 ? ('0' + minute) : minute
            return minute
        },
        numToDate: function(UnixTime) {
            var date = new Date(parseInt(UnixTime * 1000))
            var y = date.getFullYear()
            var m = date.getMonth() + 1
            m = m < 10 ? ('0' + m) : m
            var d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            return y + '-' + m + '-' + d
        },
        numToString: function(UnixTime) {
            var date = new Date(parseInt(UnixTime * 1000))
            var y = date.getFullYear()
            var m = date.getMonth() + 1
            m = m < 10 ? ('0' + m) : m
            var d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            var h = date.getHours()
            h = h < 10 ? ('0' + h) : h
            var minute = date.getMinutes()
            minute = minute < 10 ? ('0' + minute) : minute
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute
        },
        ISOToString: function(isostr) {
            var parts = isostr.match(/\d+/g);
            return new Date(parts[0] + '-' + parts[1] + '-' + parts[2] + ' ' + parts[3] + ':' + parts[4] + ':' + parts[5]).getTime();
        },
        stringToNum: function(string) {
            return new Date(string).getTime()
        },
        formatTime: function(date) {
            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()
            return [hour, minute].map(formatNumber).join(':')
        },
        formatDate: function(date) {
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            return [year, month, day].map(formatNumber).join('-')
        },
        formatNumber: function(n) {
            n = n.toString()
            return n[1] ? n : '0' + n
        }
    }
    //公共js，主要做表单验证，以及基本方法封装
const utils = {
    isNullOrEmpty: function(value) {
        //是否为空
        return (value === null || value === '' || value === undefined) ? true : false;
    },
    trim: function(value) {
        //去空格
        return value.replace(/(^\s*)|(\s*$)/g, "");
    },
    isMobile: function(value) {
        //是否为手机号
        return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(value);
    },
    isFloat: function(value) {
        //金额，只允许保留两位小数
        return /^([0-9]*[.]?[0-9])[0-9]{0,1}$/.test(value);
    },
    isNum: function(value) {
        //是否全为数字
        return /^[0-9]+$/.test(value);
    },
    formatNum: function(num) {
        //格式化手机号码
        if (utils.isMobile(num)) {
            num = num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
        }
        return num;
    },
    interfaceUrl: function() {
        //接口地址
        return "http://172.19.11.185:12000/";
    },
    toast: function(text, duration, success) {
        wx.showToast({
            title: text,
            icon: success ? 'success' : 'none',
            duration: duration || 2000
        })
    },
    preventMultiple: function(fn, gapTime) {
        if (gapTime == null || gapTime == undefined) {
            gapTime = 200;
        }
        let lastTime = null;
        return function() {
            let now = +new Date();
            if (!lastTime || now - lastTime > gapTime) {
                fn.apply(this, arguments);
                lastTime = now;
            }
        }
    },
    request: function(url, postData, method, type, hideLoading) {
        //接口请求
        if (!hideLoading) {
            wx.showLoading({
                title: '请稍候...',
                mask: true
            })
        }
        const params = {
            data: method === "POST" ? postData : JSON.stringify(postData)
        }
        return new Promise((resolve, reject) => {
            wx.request({
                url: this.interfaceUrl() + url,
                data: method === "POST" ? JSON.stringify(params) : params,
                header: {
                    'content-type': type ? 'application/x-www-form-urlencoded' : 'application/json',
                    'authorization': wx.getStorageSync("token"),
                    'security': 1
                },
                method: method, //'GET','POST'
                dataType: 'json',
                success: (res) => {
                    !hideLoading && wx.hideLoading()
                    if (res.data && res.data.code === 403) {
                        wx.showModal({
                            title: '登录',
                            content: '您尚未登录，请先登录',
                            showCancel: false,
                            confirmColor: "#5677FC",
                            confirmText: '确定',
                            success(res) {
                                wx.redirectTo({
                                    url: '../login/login'
                                })
                            }
                        })
                    } else {
                        resolve(res.data)
                    }
                },
                fail: (res) => {
                    !hideLoading && this.toast("网络不给力，请稍后再试~")
                        //wx.hideLoading()
                    reject(res)
                }
            })
        })
    },
    uploadFile: function(src) {
        const that = this
        wx.showLoading({
            title: '请稍候...',
            mask: true
        })
        return new Promise((resolve, reject) => {
            const uploadTask = wx.uploadFile({
                url: 'http://39.108.124.252:8081/fileServce/file/ ', //测试地址,暂不使用
                filePath: src,
                name: 'file',
                header: {
                    'content-type': 'multipart/form-data'
                },
                formData: {},
                success: function(res) {
                    wx.hideLoading()
                    let d = JSON.parse(res.data)
                    if (d.code === 1) {
                        let fileObj = JSON.parse(d.data)[0];
                        //文件上传成功后把图片路径数据提交到服务器，数据提交成功后，再进行下张图片的上传
                        resolve(fileObj)
                    } else {
                        that.toast(res.message);
                    }
                },
                fail: function(res) {
                    reject(res)
                    wx.hideLoading();
                    that.toast(res.message);
                }
            })
        })
    }
}
const accountings = {
    formatMoney: function(number, decimals = 2, dec_point = '.', thousands_sep = ',') {
        /*
         * 参数说明：
         * number：要格式化的数字
         * decimals：保留几位小数
         * dec_point：小数点符号
         * thousands_sep：千分位符号
         * */
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function(n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.ceil(n * k) / k;
            };

        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        var re = /(-?\d+)(\d{3})/;
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, "$1" + sep + "$2");
        }

        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }
}
module.exports = {
    formatTime: times.formatTime,
    formatDate: times.formData,
    numToDate: times.numToDate,
    numToTime: times.numToTime,
    numToString: times.numToString,
    numToHour: times.numToHour,
    numToMinutes: times.numToMinutes,
    ISOToString: times.ISOToString,
    stringToNum: times.stringToNum,
    numAdd: nums.numAdd,
    numDiv: nums.numDiv,
    numMul: nums.numMul,
    numSub: nums.numSub,
    isNullOrEmpty: utils.isNullOrEmpty,
    trim: utils.trim,
    isMobile: utils.isMobile,
    isFloat: utils.isFloat,
    isNum: utils.isNum,
    interfaceUrl: utils.interfaceUrl,
    toast: utils.toast,
    request: utils.request,
    uploadFile: utils.uploadFile,
    formatNum: utils.formatNum,
    formatMoney: accountings.formatMoney,
}