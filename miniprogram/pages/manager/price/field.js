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
class getList {
    addValue = memorize(({ queryList = [] }) => {
        return new Promise(resolve, reject => {
            let item = Object.fromEntries(queryList.map(item => {
                return Object.values(item)
            }))
            if (Object.keys(item).length > 0) {
                new wx.BaaS.TableObject('n_price')
                    .create()
                    .set(item).save().then(res => {
                        // success
                        wx.showToast({
                                title: '创建成功',
                                icon: 'none'
                            })
                            // console.log(res)
                    }, err => {
                        //err 为 HError 对象
                    })
            } else {
                wx.showToast({
                    title: '参数错误',
                    icon: 'none'
                })
            }
        })
    })
    delValue = memorize((id) => {
        return new Promise(resolve, reject => {
            wx.showNavigationBarLoading()
            let n_price = new wx.BaaS.TableObject('n_price').getWithoutData(id)
            n_price.set('delete', true)
            n_price.update().then(res => {
                // success
                wx.hideNavigationBarLoading()
                wx.showToast({
                        title: '删除成功',
                        icon: 'none'
                    })
                    // console.log(res.data)

            }, err => {
                // err
            });
        })
    })
    value = memorize(({ queryList = [], page = 0 } = {}) => {
        return new Promise((resolve, reject) => {
            wx.showNavigationBarLoading()
            let query = new wx.BaaS.Query()
            query.compare('delete', '=', false)
            queryList.map(item => {
                query.compare(item.name, '=', item.value)
            })
            new wx.BaaS.TableObject('n_price')
                .setQuery(query).orderBy(['strart', 'peoNum', 'price'])
                .select(['-created_at', '-created_by', '-updated_at', '-delete'])
                .limit(20).offset(page * 20).find().then(res => {
                    // success
                    wx.hideNavigationBarLoading()
                    resolve(res.data.objects)
                }, err => {
                    // err
                    reject(err.message)
                })
        })
    })
    field = memorize(({ name = 'address', page = 0 } = {}) => {
        return new Promise((resolve, reject) => {
            wx.showNavigationBarLoading()
            let query = new wx.BaaS.Query()
            query.compare('name', '=', name + 'Detail')
            query.compare('delete', '=', false)
            new wx.BaaS.TableObject('n_field')
                .setQuery(query).orderBy(['priority'])
                .select(['-created_at', '-created_by', '-updated_at', '-delete'])
                .limit(20).offset(page * 20).find().then(res => {
                    // success
                    if (res.data.objects.length === 0) {
                        wx.showToast({
                            title: '暂无更多了',
                            icon: 'none'
                        })
                    }
                    wx.hideNavigationBarLoading()
                    resolve(res.data.objects)
                }, err => {
                    // err
                    wx.hideNavigationBarLoading()
                    reject(err.message)
                })
        })
    })
}
export default new getList()