/**
 * 知晓云 JS SDK 命名空间
 */
declare namespace BaaS {
    class BaseQuery {
        constructor();

        /**
         * 设置查询条件
         * @param Query 对象
         */
        setQuery(Query: BaaS.Query): this;

        /**
         * 选择只返回指定字段
         * @param key 字段名称
         */
        select(key: string[] | string): this;

        /**
         * 指定需要展开的 pointer 类型字段
         * @param key 字段名称
         */
        expand(key: string[] | string): this;

        /**
         * 指定最多返回数量
         * @param count 数量
         */
        limit(count: number): this;

        /**
         * 设置列表偏移量
         * @param count 偏移量
         */
        offset(count: number): this;

        /**
         * 设置排序依据
         * @param key 字段名称
         */
        orderBy(key: string[] | string): this;

    }

    class BaseRecord {
        constructor();

        set(key: string, value: string): this;

        set(particialRecord: { [key: string]: any }): this;

        unset(key: string): this;

        unset(particialRecord: { [key: string]: any }): this;

        /**
         * 自增（原子操作）。
         * @param key 字段名称
         * @param value 值
         */
        incrementBy(key: string, value: number): this;

        /**
         * 数组添加元素。
         * @param key 字段名称
         * @param value 值
         */
        append(key: string, value: string): this;

        /**
         * 数组添加元素（原子操作）。
         * @param key 字段名称
         * @param value 值
         */
        uAppend(key: string, value: string[] | string): this;

        /**
         * 数组移除元素。
         * @param key 字段名称
         * @param value 值
         */
        remove(key: string, value: string): this;

        /**
         * Object 类型字段修改。
         * @param key 字段名称
         * @param value 值
         */
        patchObject(key: string, value: object): this;

    }

    /**
     * 内容库
     */
    class ContentGroup {
        /**
         * 
         * @param contentGroupID 内容库 ID
         */
        constructor(contentGroupID: string);

        /**
         * 获取内容库详情。
         * @param id 内容库 ID
         */
        static get(id: string): Promise<BaaS.Response<any>>;

        /**
         * 获取内容库列表。
         * @param options 内容库 ID
         */
        static find(options?: object): Promise<BaaS.Response<any>>;

        /**
         * 获取内容。
         * @param richTextID 内容 ID
         */
        getContent(richTextID: string): Promise<BaaS.Response<any>>;

        /**
         * 查找内容。
         * @param options 参数
         */
        find(options?: BaaS.FindOptions): Promise<BaaS.Response<any>>;

        /**
         * 获取内容数量。
         */
        count(): Promise<number>;

        /**
         * 获取内容分类列表。
         * @param options 参数
         */
        getCategoryList(options?: BaaS.FindOptions): Promise<BaaS.Response<any>>;

        /**
         * 获取内容分类详情。
         */
        getCategory(): Promise<BaaS.Response<any>>;

        /**
         * 设置查询条件
         * @param Query 对象
         */
        setQuery(Query: BaaS.Query): this;

        /**
         * 选择只返回指定字段
         * @param key 字段名称
         */
        select(key: string[] | string): this;

        /**
         * 指定需要展开的 pointer 类型字段
         * @param key 字段名称
         */
        expand(key: string[] | string): this;

        /**
         * 指定最多返回数量
         * @param count 数量
         */
        limit(count: number): this;

        /**
         * 设置列表偏移量
         * @param count 偏移量
         */
        offset(count: number): this;

        /**
         * 设置排序依据
         * @param key 字段名称
         */
        orderBy(key: string[] | string): this;

    }

    class CurrentUser {
        /**
         * 
         * @param attribute 用户信息
         */
        constructor(attribute: Object);

        /**
         * 以 JSON Object 的形式返回用户信息
         * @returns 用户信息
         */
        toJSON(): Object;

        /**
         * 获取某一项用户信息
         * @param key 用户信息 key
         * @returns 用户信息
         */
        get(key: string): any;

        /**
         * 将微信账号绑定到当前用户，匿名用户无法调用
         * @param authData 用户信息
         * @param params 用户信息参数
         * @returns UserRecord 实例
         */
        linkWechat(authData?: BaaS.AuthData | null, params?: BaaS.LinkOptions): Promise<this>;

        /**
         * 将支付宝账号绑定到当前用户，匿名用户无法调用
         * @param options 参数
         * @returns UserRecord 实例
         */
        linkAlipay(options?: BaaS.LinkAlipayParams): Promise<this>;

        /**
         * 将 QQ 账号绑定到当前用户，匿名用户无法调用
         * @param authData 用户信息
         * @param params 用户信息参数
         * @returns UserRecord 实例
         */
        linkQQ(authData?: BaaS.AuthData | null, params?: BaaS.LinkOptions): Promise<this>;

        /**
         * 将百度账号绑定到当前用户，匿名用户无法调用
         * @param authData 用户信息
         * @param params 用户信息参数
         * @returns UserRecord 实例
         */
        linkBaidu(authData?: BaaS.AuthData | null, params?: BaaS.LinkOptions): Promise<this>;

        /**
         * 将第三方账号绑定到当前用户，匿名用户无法调用
         * @param providor 第三方平台
         * @param authPageUrl 授权页面 URL
         * @param options 其他选项
         * @returns UserRecord 实例
         */
        linkThirdParty(providor: string, authPageUrl: string, options?: BaaS.LinkThirdPartyParams): Promise<this>;

        /**
         * 更新密码
         * @param options
         * @returns UserRecord 实例
         */
        updatePassword(options: BaaS.UpdatePasswordParams): Promise<this>;

        /**
         * 更新邮箱
         * @param email email 地址
         * @param options 可选参数
         * @returns UserRecord 实例
         */
        setEmail(email: string | null, options?: SetEmailOptions): Promise<this>;

        /**
         * 更新用户名
         * @param username 用户名
         * @returns UserRecord 实例
         */
        setUsername(username: string | null): Promise<this>;

        /**
         * 发送验证邮件
         * @returns UserRecord 实例
         */
        requestEmailVerification(): Promise<this>;

        /**
         * 初次设置账号信息
         * @param accountInfo
         * @returns UserRecord 实例
         */
        setAccount(accountInfo: BaaS.SetAccountParmas): Promise<this>;

        /**
         * 更改手机号
         * @param phone 手机号码
         * @returns UserRecord 实例
         */
        setMobilePhone(phone: string | null): Promise<this>;

        /**
         * 验证手机号
         * @param code 短信验证码
         * @returns UserRecord 实例
         */
        verifyMobilePhone(code: string): Promise<this>;

        /**
         * 更新用户数据。
         */
        update(): Promise<Response<any>>;

        set(key: string, value: string): this;

        set(particialRecord: { [key: string]: any }): this;

        unset(key: string): this;

        unset(particialRecord: { [key: string]: any }): this;

        /**
         * 自增（原子操作）。
         * @param key 字段名称
         * @param value 值
         */
        incrementBy(key: string, value: number): this;

        /**
         * 数组添加元素。
         * @param key 字段名称
         * @param value 值
         */
        append(key: string, value: string): this;

        /**
         * 数组添加元素（原子操作）。
         * @param key 字段名称
         * @param value 值
         */
        uAppend(key: string, value: string[] | string): this;

        /**
         * 数组移除元素。
         * @param key 字段名称
         * @param value 值
         */
        remove(key: string, value: string): this;

        /**
         * Object 类型字段修改。
         * @param key 字段名称
         * @param value 值
         */
        patchObject(key: string, value: object): this;

    }

    /**
     * 文件
     */
    class File {
        constructor();

        /**
         * 上传文件。
         * @param fileParams 文件参数
         * @param metaData 文件元信息
         */
        upload(fileParams: BaaS.FileParams, metaData?: BaaS.FileMeta): Promise<BaaS.Response<any>>;

        /**
         * 删除文件。
         * @param id 文件 ID
         */
        delete(id: string): Promise<BaaS.Response<any>>;

        /**
         * 获取文件详情。
         * @param fileID 文件 ID
         */
        get(fileID: string): Promise<BaaS.Response<any>>;

        /**
         * 获取文件列表。
         * @param options 参数
         */
        find(options?: BaaS.FindOptions): Promise<BaaS.Response<any>>;

        /**
         * 获取文件数量。
         */
        count(): Promise<number>;

        /**
         * 生成视频截图。
         * @param params 截图参数
         */
        genVideoSnapshot(params: BaaS.VideoSnapshotParams): Promise<BaaS.FileOperationResult>;

        /**
         * M3U8 视频拼接。
         * @param params 拼接参数
         */
        videoConcat(params: BaaS.VideoConcatParams): Promise<BaaS.FileOperationResult>;

        /**
         * M3U8 视频剪辑。
         * @param params 剪辑参数
         */
        videoClip(params: BaaS.VideoClipParams): Promise<BaaS.FileOperationResult>;

        /**
         * M3U8 时长和分片信息。
         * @param params 分片信息参数
         */
        videoMeta(params: BaaS.VideoMetaParams): Promise<BaaS.VideoMetaResult>;

        /**
         * 音视频的元信息。
         * @param params 音视频的元信息参数
         */
        videoAudioMeta(params: BaaS.VideoAudioMetaParams): Promise<BaaS.VideoAudioMetaResult>;

        /**
         * 设置查询条件
         * @param Query 对象
         */
        setQuery(Query: BaaS.Query): this;

        /**
         * 选择只返回指定字段
         * @param key 字段名称
         */
        select(key: string[] | string): this;

        /**
         * 指定需要展开的 pointer 类型字段
         * @param key 字段名称
         */
        expand(key: string[] | string): this;

        /**
         * 指定最多返回数量
         * @param count 数量
         */
        limit(count: number): this;

        /**
         * 设置列表偏移量
         * @param count 偏移量
         */
        offset(count: number): this;

        /**
         * 设置排序依据
         * @param key 字段名称
         */
        orderBy(key: string[] | string): this;

    }

    /**
     * 文件分类
     */
    class FileCategory {
        constructor();

        /**
         * 获取文件分类详情。
         * @param categoryID 文件分类 ID
         */
        get(categoryID: string): Promise<BaaS.Response<any>>;

        /**
         * 通过文件分类 ID 获取分类下的所有文件。
         * @param categoryID 文件分类 ID
         * @param options 参数
         */
        getFileList(categoryID: string, options?: BaaS.FindOptions): Promise<BaaS.Response<any>>;

        /**
         * 获取文件分类列表。
         * @param options 参数
         */
        find(options?: BaaS.FindOptions): Promise<BaaS.Response<any>>;

        /**
         * 获取文件分类数量。
         */
        count(): Promise<number>;

        /**
         * 设置查询条件
         * @param Query 对象
         */
        setQuery(Query: BaaS.Query): this;

        /**
         * 选择只返回指定字段
         * @param key 字段名称
         */
        select(key: string[] | string): this;

        /**
         * 指定需要展开的 pointer 类型字段
         * @param key 字段名称
         */
        expand(key: string[] | string): this;

        /**
         * 指定最多返回数量
         * @param count 数量
         */
        limit(count: number): this;

        /**
         * 设置列表偏移量
         * @param count 偏移量
         */
        offset(count: number): this;

        /**
         * 设置排序依据
         * @param key 字段名称
         */
        orderBy(key: string[] | string): this;

    }

    /**
     * Geo 点
     */
    class GeoPoint {
        /**
         * 
         * @param longitude 经度
         * @param latitude 纬度
         */
        constructor(longitude: number, latitude: number);

        /**
         * 转换为 GeoJSON
         */
        toGeoJSON(): BaaS.GeoJson;

    }

    /**
     * Geo 多边形
     */
    class GeoPolygon {
        /**
         * 
         * @param args 点坐标
         */
        constructor(args: (number[])[]);

        /**
         * 转换为 GeoJSON
         */
        toGeoJSON(): GeoJson;

    }

    class HError {
        /**
         * 
         * @param code 错误码
         * @param msg 错误信息
         */
        constructor(code: number, msg: string);

    }

    /**
     * 支付订单
     */
    class Order {
        /**
         * 支付订单
         */
        constructor();

        /**
         * 获取支付订单详情。
         * @param transactionID 支付流水 ID
         */
        get(transactionID: string): Promise<BaaS.Response<any>>;

        /**
         * 获取支付订单列表。
         * @param params 筛选参数
         */
        getOrderList(params?: BaaS.GetOrderListParams): Promise<BaaS.Response<any>>;

        /**
         * 设置查询条件
         * @param Query 对象
         */
        setQuery(Query: BaaS.Query): this;

        /**
         * 选择只返回指定字段
         * @param key 字段名称
         */
        select(key: string[] | string): this;

        /**
         * 指定需要展开的 pointer 类型字段
         * @param key 字段名称
         */
        expand(key: string[] | string): this;

        /**
         * 指定最多返回数量
         * @param count 数量
         */
        limit(count: number): this;

        /**
         * 设置列表偏移量
         * @param count 偏移量
         */
        offset(count: number): this;

        /**
         * 设置排序依据
         * @param key 字段名称
         */
        orderBy(key: string[] | string): this;

    }

    /**
     * 查询
     */
    class Query {
        constructor();

        /**
         * and 操作符。将多个 Query 对象使用 and 操作符进行合并
         * @param querys Query 对象
         * @returns - 新的 Query 对象
         */
        static and(...querys: Query[]): Query;

        /**
         * or 操作符。将多个 Query 对象使用 or 操作符进行合并
         * @param querys Query 对象
         * @returns - 新的 Query 对象
         */
        static or(...querys: Query[]): Query;

        /**
         * 比较判断，将 Record[key] 与 value 使用 operator 进行判断，筛选出
         * 符合条件的 Record。
         * @param key - 用于查询判断的字段
         * @param operator - 判断操作符
         * @param value - 用于判断的值
         * @returns Query 实例
         */
        compare(key: string, operator: string, value: string): this;

        /**
         * 包含判断，筛选出符合条件（Record[key] 包含了字符串 str）的 Record。
         * @param key - 用于查询判断的字段
         * @param str - 用于判断的字符串
         * @returns Query 实例
         */
        contains(key: string, str: string): this;

        /**
         * 正则判断，筛选出符合条件（正则表达式 regExp 能匹配 Record[key]）的 Record。
         * @param key - 用于查询判断的字段
         * @param regExp - 正则表达式
         * @returns Query 实例
         */
        matches(key: string, regExp: RegExp): this;

        /**
         * 包含判断，筛选出符合条件（数组 arr 包含 Record[key]）的 Record。
         * @param key - 用于查询判断的字段
         * @param arr - 用于判断的数组
         * @returns Query 实例
         */
        in(key: string, arr: any[]): this;

        /**
         * 不包含判断，筛选出符合条件（数组 arr 不包含 Record[key]）的 Record。
         * @param key - 用于查询判断的字段
         * @param arr - 用于判断的数组
         * @returns Query 实例
         */
        notIn(key: string, arr: any[]): this;

        /**
         * 数组包含判断。
         * 判断逻辑：Record[key] 是数组类型，且包含 arr 数组中的元素
         * @param key - 用于查询判断的字段
         * @param arr - 用于判断的数组
         * @returns Query 实例
         */
        arrayContains(key: string, arr: any[]): this;

        /**
         * 字段为 Null 判断。
         * 判断逻辑：Record[key] 是 null
         * @param key - 用于查询判断的字段
         * @returns Query 实例
         */
        isNull(key: string): this;

        /**
         * 字段不为 Null 判断。
         * 判断逻辑：Record[key] 不是 null
         * @param key - 用于查询判断的字段
         * @returns Query 实例
         */
        isNotNull(key: string): this;

        /**
         * 字段存在判断。
         * 判断逻辑：Record[key] 不是 undefined
         * @param key - 用于查询判断的字段
         * @returns Query 实例
         */
        exists(key: string): this;

        /**
         * 字段不存在判断。
         * 判断逻辑：Record[key] 是 undefined
         * @param key - 用于查询判断的字段
         * @returns Query 实例
         */
        notExists(key: string): this;

        /**
         * 多边形包含判断，在指定多边形集合中找出包含某一点的多边形（geojson 类型）。
         * 判断逻辑：Record[key] 包含 point
         * @param key - 用于查询判断的字段
         * @param point - 点
         * @returns Query 实例
         */
        include(key: string, point: GeoPoint): this;

        /**
         * 多边形包含判断，在指定点集合中，查找包含于指定的多边形区域的点（geojson 类型）。
         * 判断逻辑：polygon 包含 Record[key]
         * @param key - 用于查询判断的字段
         * @param polygon - 多边形
         * @returns Query 实例
         */
        within(key: string, polygon: GeoPolygon): this;

        /**
         * 圆包含判断，在指定点集合中，查找包含在指定圆心和指定半径所构成的圆形区域中的点（geojson 类型）。
         * 判断逻辑：以 point 为圆心、以 redius 为半径的圆包含 Record[key]
         * @param key - 用于查询判断的字段
         * @param point - 圆心
         * @param radius - 半径
         * @returns Query 实例
         */
        withinCircle(key: string, point: GeoPoint, radius: number): this;

        /**
         * 圆环包含判断，在指定点集合中，查找包含在以某点为起点的最大和最小距离所构成的圆环区域中的点（geojson 类型）。
         * 判断逻辑：以 point 为圆心、以 minDistance 最小半径、以 maxDistance 为最大半径的圆环包含 Record[key]
         * @param key - 用于查询判断的字段
         * @param point - 圆心
         * @param maxDistance - 最大半径
         * @param minDistance - 最小半径
         * @returns Query 实例
         */
        withinRegion(key: string, point: GeoPoint, maxDistance: number, minDistance?: number): this;

        /**
         * Object 类型字段的属性存在判断。
         * 判断逻辑：Record[key] 为 Object 类型，且 Record[key][fieldName] 不为 undefined
         * @param key - 用于查询判断的字段
         * @param fieldName - 字段名称
         * @returns Query 实例
         */
        hasKey(key: string, fieldName: string): this;

    }

    /**
     * 数据表
     */
    class TableObject {
        /**
         * 
         * @param tableName 数据表名称
         */
        constructor(tableName: string);

        /**
         * 创建一条数据记录
         */
        create(): TableRecord;

        /**
         * 批量创建数据记录
         * @param args 数据记录列表
         * @param options 批量创建参数
         */
        createMany(args: object[], options?: BaaS.CreateManyParams): Promise<BaaS.Response<any>>;

        delete(recordID: string): Promise<any>;

        delete(query: Query, options?: BaaS.BatchUpdateParams): Promise<any>;

        getWithoutData(recordID: string): TableRecord;

        getWithoutData(query: Query): TableRecord;

        /**
         * 获取单条数据记录。
         * @param recordID 数据记录 ID
         */
        get(recordID: string): Promise<BaaS.Response<any>>;

        /**
         * 获取数据记录列表。
         * @param options 参数
         */
        find(options?: BaaS.FindOptions): Promise<BaaS.Response<any>>;

        /**
         * 获取数据记录数量。
         */
        count(): Promise<number>;

        /**
         * 设置查询条件
         * @param Query 对象
         */
        setQuery(Query: BaaS.Query): this;

        /**
         * 选择只返回指定字段
         * @param key 字段名称
         */
        select(key: string[] | string): this;

        /**
         * 指定需要展开的 pointer 类型字段
         * @param key 字段名称
         */
        expand(key: string[] | string): this;

        /**
         * 指定最多返回数量
         * @param count 数量
         */
        limit(count: number): this;

        /**
         * 设置列表偏移量
         * @param count 偏移量
         */
        offset(count: number): this;

        /**
         * 设置排序依据
         * @param key 字段名称
         */
        orderBy(key: string[] | string): this;

    }

    /**
     * 数据记录。
     */
    class TableRecord {
        /**
         * 
         * @param tableName 数据表名
         * @param recordID 数据记录 ID
         * @param queryObject 查询对象
         */
        constructor(tableName: string, recordID: string, queryObject?: object);

        /**
         * 保存数据记录。
         */
        save(): Promise<BaaS.Response<any>>;

        /**
         * 更新数据记录。
         * 批量更新时，如果不需要触发触发器，可以设置 options.enableTrigger 为 false
         * @param options 批量更新参数
         */
        update(options?: BaaS.BatchUpdateParams): Promise<BaaS.Response<any>>;

        set(key: string, value: string): this;

        set(particialRecord: { [key: string]: any }): this;

        unset(key: string): this;

        unset(particialRecord: { [key: string]: any }): this;

        /**
         * 自增（原子操作）。
         * @param key 字段名称
         * @param value 值
         */
        incrementBy(key: string, value: number): this;

        /**
         * 数组添加元素。
         * @param key 字段名称
         * @param value 值
         */
        append(key: string, value: string): this;

        /**
         * 数组添加元素（原子操作）。
         * @param key 字段名称
         * @param value 值
         */
        uAppend(key: string, value: string[] | string): this;

        /**
         * 数组移除元素。
         * @param key 字段名称
         * @param value 值
         */
        remove(key: string, value: string): this;

        /**
         * Object 类型字段修改。
         * @param key 字段名称
         * @param value 值
         */
        patchObject(key: string, value: object): this;

    }

    /**
     * 用户
     */
    class User {
        constructor();

        /**
         * 获取用户详情。
         * @param userID 用户 ID
         */
        get(userID: string): Promise<Response<any>>;

        /**
         * 获取一个用户记录（仅引用，非数据）。
         * @param userID 用户 ID
         */
        getWithoutData(userID: string): BaaS.UserRecord;

        /**
         * 获取当前用户记录（仅引用，非数据）。
         * @returns
         */
        getCurrentUserWithoutData(): BaaS.UserRecord;

        /**
         * 获取用户列表。
         * @param options 参数
         */
        find(options?: BaaS.FindOptions): Promise<Response<any>>;

        /**
         * 获取用户数量。
         */
        count(): Promise<number>;

        /**
         * 设置查询条件
         * @param Query 对象
         */
        setQuery(Query: BaaS.Query): this;

        /**
         * 选择只返回指定字段
         * @param key 字段名称
         */
        select(key: string[] | string): this;

        /**
         * 指定需要展开的 pointer 类型字段
         * @param key 字段名称
         */
        expand(key: string[] | string): this;

        /**
         * 指定最多返回数量
         * @param count 数量
         */
        limit(count: number): this;

        /**
         * 设置列表偏移量
         * @param count 偏移量
         */
        offset(count: number): this;

        /**
         * 设置排序依据
         * @param key 字段名称
         */
        orderBy(key: string[] | string): this;

    }

    /**
     * 当前用户
     */
    class UserRecord {
        /**
         * 
         * @param userID 用户 ID
         */
        constructor(userID: string);

        /**
         * 更新用户数据。
         */
        update(): Promise<Response<any>>;

        set(key: string, value: string): this;

        set(particialRecord: { [key: string]: any }): this;

        unset(key: string): this;

        unset(particialRecord: { [key: string]: any }): this;

        /**
         * 自增（原子操作）。
         * @param key 字段名称
         * @param value 值
         */
        incrementBy(key: string, value: number): this;

        /**
         * 数组添加元素。
         * @param key 字段名称
         * @param value 值
         */
        append(key: string, value: string): this;

        /**
         * 数组添加元素（原子操作）。
         * @param key 字段名称
         * @param value 值
         */
        uAppend(key: string, value: string[] | string): this;

        /**
         * 数组移除元素。
         * @param key 字段名称
         * @param value 值
         */
        remove(key: string, value: string): this;

        /**
         * Object 类型字段修改。
         * @param key 字段名称
         * @param value 值
         */
        patchObject(key: string, value: object): this;

    }

    /**
     * 用户认证
     */
    namespace auth {
        /**
         * 登录
         * @param options
         */
        function login(options: BaaS.AuthWithUsernameOptions | BaaS.AuthWithEmailOptions | BaaS.AuthWithPhoneOptions): Promise<BaaS.CurrentUser>;

        /**
         * 匿名登录
         */
        function anonymousLogin(): Promise<BaaS.CurrentUser>;

        /**
         * 静默登录
         */
        function silentLogin(): Promise<BaaS.CurrentUser>;

        /**
         * 注册
         * @param options
         */
        function register(options: BaaS.AuthWithUsernameOptions | BaaS.AuthWithEmailOptions | BaaS.AuthWithPhoneOptions): Promise<BaaS.CurrentUser>;

        /**
         * 退出登录状态
         */
        function logout(): Promise<BaaS.Response<any>>;

        /**
         * 忘记密码，发送重置密码邮件
         * @param param 账号信息
         */
        function requestPasswordReset(param: BaaS.PasswordResetParam): Promise<BaaS.Response<any>>;

        /**
         * 获取当前用户
         */
        function getCurrentUser(): Promise<BaaS.CurrentUser>;

        /**
         * 使用手机号 + 验证码登录
         * @param mobilePhone 手机号码
         * @param smsCode 验证码
         * @param options 可选配置
         */
        function loginWithSmsVerificationCode(mobilePhone: string, smsCode: string, options?: BaaS.LoginOptions): Promise<BaaS.CurrentUser>;

        /**
         * 静默登录
         * @deprecated since v2.0.0
         */
        function silentLogin(): void;

        /**
         * 获取用户信息
         * @deprecated
         * @param options 参数
         */
        function handleUserInfo(options: BaaS.handleUserInfoOptions): Promise<any>;

        /**
         * 微信登录
         * @param authData 用户信息，值为 null 时是静默登录
         * @param options 其他选项
         */
        function loginWithWechat(authData?: BaaS.AuthData | null, options?: BaaS.LoginOptions): Promise<BaaS.CurrentUser>;

    }

    namespace _config {
        /**
         * SDK 版本号
         */
        var VERSION: string;

    }

    /**
     * 获取异步操作执行结果
     * @param operationID 异步操作 ID
     */
    function getAsyncJobResult(operationID: number): Promise<BaaS.Response<any>>;

    interface ServerDate {
        /**
         * 服务器时间 （ISO 8601）
         */
        time: string;
    }

    /**
     * 获取服务器时间
     */
    function getServerDate(): Promise<BaaS.Response<BaaS.ServerDate>>;

    /**
     * SDK 初始化
     * @param clientID - 知晓云应用的 client id
     * @param options - 其他选项
     */
    function init(clientID: string, options?: BaaS.InitOptions): void;

    /**
     * 获取 token
     */
    function getAuthToken(): string;

    /**
     * SDK 版本检查
     * @param options
     */
    function checkVersion(options: BaaS.CheckVersionOptions): void;

    /**
     * 清除会话（退出登录）
     */
    function clearSession(): void;

    /**
     * 调用云函数
     * @param functionName 云函数名称
     * @param params 参数
     * @param sync 是否同步运行
     */
    function invoke(functionName: string, params?: object, sync?: boolean): Promise<any>;

    /**
     * 本地存储
     */
    namespace storage {
        /**
         * 存入数据
         * @param key 键
         * @param value 值
         */
        function set(key: string, value: any): void;

        /**
         * 读取数据
         * @param key 键
         */
        function get(key: string): any;

    }

    /**
     * SDK 初始化选项
     */
    interface InitOptions {
        /**
         * 是否自动登录
         */
        autoLogin?: boolean;
        /**
         * 日志输出等级
         */
        logLevel?: string;
        /**
         * 接口域名
         */
        host?: string;
        /**
         * 开发环境 ID
         */
        env?: string;
    }

    /**
     * 检测版本选项
     */
    interface CheckVersionOptions {
        /**
         * 需要检测的平台
         */
        platform: string;
        /**
         * 接口请求成功时回调
         */
        onSuccess: Function;
        /**
         * 接口请求失败时的回调
         */
        onError: Function;
    }

    /**
     * 模块
     * @param BaaS - BaaS 对象
     */
    type Module = (BaaS: any)=>void;

    /**
     * 登录/注册参数（用户名 + 密码）
     */
    interface AuthWithUsernameOptions {
        /**
         * 用户名
         */
        username: string;
        /**
         * 密码
         */
        password: string;
    }

    /**
     * 登录/注册参数（邮箱 + 密码）
     */
    interface AuthWithEmailOptions {
        /**
         * 邮箱
         */
        email: string;
        /**
         * 密码
         */
        password: string;
    }

    /**
     * 登录/注册参数（手机号码 + 密码）
     */
    interface AuthWithPhoneOptions {
        /**
         * 手机号码
         */
        phone: string;
        /**
         * 密码
         */
        password: string;
    }

    /**
     * 登录可选参数
     */
    interface LoginOptions {
        /**
         * 是否创建用户
         */
        createUser?: boolean;
        /**
         * 是否同步第一层级用户信息，默认为 'setnx'。值说明：
         *     'overwrite' - 强制更新
         *     'setnx' - 仅当字段从未被赋值时才更新
         *     'false' - 不更新
         */
        syncUserProfile?: 'overwrite' | 'setnx' | 'false';
    }

    /**
     * 登录可选参数
     */
    interface handleUserInfoOptions {
        /**
         * 用户信息
         */
        "options.detail": BaaS.UserInfoDetail;
        /**
         * 是否创建用户
         */
        createUser?: boolean;
        /**
         * 是否同步第一层级用户信息，默认为 'setnx'。值说明：
         *     'overwrite' - 强制更新
         *     'setnx' - 仅当字段从未被赋值时才更新
         *     'false' - 不更新
         */
        syncUserProfile?: 'overwrite' | 'setnx' | 'false';
    }

    /**
     * 关联账号可选参数
     */
    interface LinkOptions {
        /**
         * 是否同步第一层级用户信息，默认为 'setnx'。值说明：
         *     'overwrite' - 强制更新
         *     'setnx' - 仅当字段从未被赋值时才更新
         *     'false' - 不更新
         */
        syncUserProfile?: 'overwrite' | 'setnx' | 'false';
    }

    /**
     * 用户信息
     */
    interface UserInfoDetail {
        /**
         * 用户信息对象，不包含 openid 等敏感信息
         */
        userInfo: Object;
        /**
         * 不包括敏感信息的原始数据字符串，用于计算签名
         */
        rawData: string;
        /**
         * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息
         */
        signature: string;
        /**
         * 包括敏感数据在内的完整用户信息的加密数据
         */
        encryptedData: string;
        /**
         * 加密算法的初始向量
         */
        iv: string;
    }

    /**
     * 强制登录的授权参数
     */
    interface AuthData {
        /**
         * 用户信息
         */
        detail: BaaS.UserInfoDetail;
    }

    /**
     * 文件操作返回结果
     */
    interface FileOperationResult {
        /**
         * 创建时间 （格式为 unix 时间戳)
         */
        created_at: number;
        /**
         * 路径
         */
        path: string;
        /**
         * 创建者 ID
         */
        created_by: number;
        /**
         * mime_type 类型
         */
        mime_type: string;
        /**
         * 媒体类型
         */
        media_type: string;
        /**
         * 文件大小
         */
        size: number;
        /**
         * 文件名
         */
        name: string;
        /**
         * 文件状态
         */
        status: string;
        /**
         * 引用
         */
        reference: string;
        /**
         * cdn 中保存的路径
         */
        cdn_path: string;
        /**
         * Integer	更新时间 （格式为 unix 时间戳)
         */
        updated_at: number;
        /**
         * 文件所属类别
         */
        categories: string[];
        /**
         * 本条记录 ID
         */
        _id: string;
    }

    /**
     * 文件参数（文件上传）
     */
    interface FileParams {
        /**
         * 本地资源路径（非 Web）
         */
        filePath?: string;
        /**
         * 本地资源路径（Web）
         */
        fileObj?: object;
        /**
         * 本地资源路径（Alipay）
         */
        fileType?: 'image' | 'video' | 'audio';
    }

    /**
     * 文件元信息（文件上传）
     */
    interface FileMeta {
        /**
         * 文件分类 ID
         */
        categoryID?: string;
        /**
         * 要上传的文件分类名
         */
        categoryName?: string;
    }

    /**
     * 视频截图参数
     */
    interface VideoSnapshotParams {
        /**
         * 视频文件的 id
         */
        source: string;
        /**
         * 截图保存的文件名
         */
        save_as: string;
        /**
         * 截图时间格式，格式：HH:MM:SS
         */
        point: string;
        /**
         * 文件所属类别 ID
         */
        category_id?: string;
        /**
         * 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true
         */
        random_file_link?: boolean;
        /**
         * 截图尺寸，格式为 宽 x 高，默认是视频尺寸
         */
        size?: string;
        /**
         * 截sf格式，可选值为 jpg，png, webp, 默认根据 save_as 的后缀生成
         */
        format?: string;
    }

    /**
     * 视频拼接参数
     */
    interface VideoConcatParams {
        /**
         * 视频件的 id 列表，按提交的顺序进行拼接
         */
        m3u8s: string[];
        /**
         * 视频保存的文件名
         */
        save_as: string;
        /**
         * 文件所属类别 ID
         */
        category_id?: string;
        /**
         * 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true
         */
        random_file_link?: boolean;
    }

    /**
     * 视频剪辑参数
     */
    interface VideoClipParams {
        /**
         * 视频文件的 id 列表，按提交的顺序进行拼接
         */
        m3u8s: string;
        /**
         * 保存的文件名
         */
        save_as: string;
        /**
         * 文件所属类别 ID
         */
        category_id?: string;
        /**
         * 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true
         */
        random_file_link?: boolean;
        /**
         * 包含某段内容的开始结束时间，单位是秒。当 index 为 false 时，为开始结束分片序号
         */
        include?: string[];
        /**
         * 不包含某段内容的开始结束时间，单位是秒。当 index 为 false 时，为开始结束分片序号
         */
        exclude?: string[];
        /**
         * include 或者 exclude 中的值是否为 ts 分片序号，默认为 false
         */
        index?: boolean;
    }

    /**
     * M3U8 时长和分片信息参数
     */
    interface VideoMetaParams {
        /**
         * 视频文件的 id 列表，按提交的顺序进行拼接
         */
        m3u8s: string;
    }

    /**
     * 视频元信息
     */
    interface VideoMeta {
        /**
         * m3u8 时长
         */
        duartion: number;
        /**
         * 时间点
         */
        points: number[];
    }

    /**
     * M3U8 时长和分片信息请求结果
     */
    interface VideoMetaResult {
        /**
         * 状态码
         */
        status_code: number;
        /**
         * 返回信息
         */
        message: string;
        /**
         * 元信息
         */
        meta: BaaS.VideoMeta;
    }

    /**
     * 音视频的元信息请求参数
     */
    interface VideoAudioMetaParams {
        /**
         * 文件的 ID
         */
        source: string;
    }

    /**
     * 音视频格式信息
     */
    interface VideoAudioMetaFormat {
        /**
         * 比特率
         */
        bitrate: number;
        /**
         * 时长
         */
        duration: number;
        /**
         * 容器格式
         */
        format: string;
        /**
         * 容器格式全称
         */
        fullname: string;
    }

    /**
     * 音视频流
     */
    interface VideoAudioMetaStreams {
        /**
         * 表示第几路流
         */
        index: number;
        /**
         * 一般情况下, video 或 audio
         */
        type: string;
        /**
         * 流码率
         */
        bitrate: number;
        /**
         * 流编码
         */
        codec: string;
        /**
         * 流编码说明
         */
        codec_desc: string;
        /**
         * 流时长
         */
        duration: number;
        /**
         * (视频流)视频帧数
         */
        video_fps: number;
        /**
         * (视频流)视频高度
         */
        video_height: number;
        /**
         * (视频流)视频宽度
         */
        video_width: number;
        /**
         * (音频流)音频通道数
         */
        audio_channels: number;
        /**
         * (音频流)音频采样率
         */
        audio_samplerate: number;
    }

    /**
     * 音视频的元信息请求结果
     */
    interface VideoAudioMetaResult {
        /**
         * 音视频格式信息
         */
        format: BaaS.VideoAudioMetaFormat;
        /**
         * stream 列表
         */
        streams: any[];
    }

    /**
     * GeoJson
     */
    interface GeoJson {
        /**
         * 类型
         */
        type: string;
        /**
         * 坐标
         */
        coordinates: number[];
    }

    /**
     * 获取支付订单参数
     */
    interface GetOrderListParams {
        /**
         * 商品记录 ID，可用于定位用户购买的物品
         */
        merchandise_record_id?: string;
        /**
         * 商品表 ID，可用于定位用户购买的物品
         */
        merchandise_schema_id?: string;
        /**
         * 订单支付状态
         */
        status?: 'complete' | 'pending' | 'success' | 'partial';
        /**
         * 真正的交易 ID, 业务方在服务方后台对账时可看到此字段
         */
        trade_no?: string;
        /**
         * 知晓云平台所记录的流水号
         */
        transactionID?: string;
        /**
         * 支付方法，可选值有：weixin_tenpay（微信支付）、alipay（支付宝支付）等
         */
        gateway_type?: string;
    }

    /**
     * 批量创建参数
     */
    interface CreateManyParams {
        /**
         * 是否触发触发器
         */
        enableTrigger?: boolean;
    }

    /**
     * 查询参数
     */
    interface FindOptions {
        /**
         * 是否返回 total_count
         */
        withCount?: boolean;
    }

    /**
     * 批量更新参数
     */
    interface BatchUpdateParams {
        /**
         * 是否触发触发器
         */
        enableTrigger?: boolean;
        /**
         * 是否返回 total_count
         */
        withCount?: boolean;
    }

    /**
     * 设置账号参数
     */
    interface SetAccountParmas {
        /**
         * 用户名
         */
        username?: string | null;
        /**
         * 邮箱
         */
        email?: string | null;
        /**
         * 密码
         */
        password?: string | null;
    }

    /**
     * 更新密码
     */
    interface UpdatePasswordParams {
        /**
         * 旧密码
         */
        password: string;
        /**
         * 新密码
         */
        newPassword: string;
    }

    interface CensorAsyncResult {
        /**
         * 文件 ID
         */
        id: string;
        /**
         * 错误码，=0 时不返回此字段
         */
        error_code?: string;
        /**
         * 错误信息，error_code=0 时不返回此字段
         */
        error_message?: string;
        /**
         * 默认为：0，4294966288(-1008)为链接无法下载
         */
        status_code: number;
        /**
         * 是否为违规内容，true 为风险，false 为未检测到风险，null 为微信尚未推送检查结果
         */
        risky: boolean;
    }

    /**
     * 请求参数
     */
    interface RequestParams {
        /**
         * 请求的 URL
         */
        url: string;
        /**
         * HTTP 请求方法，默认为 'GET'
         */
        method?: string;
        /**
         * 请求的参数
         */
        data?: object;
        /**
         * 请求的 header
         */
        header?: object;
        /**
         * 返回的数据格式
         */
        dataType?: string;
    }

    /**
     * 关联支付宝账号参数
     */
    interface LinkAlipayParams {
        /**
         * 是否强制登录
         */
        forceLogin?: boolean;
        /**
         * 是否同步第一层级用户信息，默认为 'setnx'。值说明：
         *     'overwrite' - 强制更新
         *     'setnx' - 仅当字段从未被赋值时才更新
         *     'false' - 不更新
         */
        syncUserProfile?: 'overwrite' | 'setnx' | 'false';
    }

    interface LinkThirdPartyParams {
        /**
         * 是否同步第一层级用户信息，默认为 'setnx'。值说明：
         *     'overwrite' - 强制更新
         *     'setnx' - 仅当字段从未被赋值时才更新
         *     'false' - 不更新
         */
        syncUserProfile?: 'overwrite' | 'setnx' | 'false';
        /**
         * 是否开启 debug 模式
         */
        debug?: boolean;
        /**
         * 授权窗口打开模式
         */
        mode?: 'popup-window' | 'popup-iframe' | 'redirect';
        /**
         * popup-iframe 模式下，授权模态框的样式
         */
        authModalStyle?: Object;
        /**
         * 微信 web 授权，在 popup-iframe 模式下，微信授权页面的样式
         */
        wechatIframeContentStyle?: Object;
        /**
         * popup-window 模式下，授权窗口的特性，详见 {@link https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open}
         */
        windowFeatures?: string;
    }

    interface SetEmailOptions {
        /**
         * 是否发送验证邮件
         */
        sendVerificationEmail: boolean;
    }

    interface PasswordResetParam {
        /**
         * email 地址
         */
        email: string;
    }

    /**
     * 微信登录（仅支持静默登录）
     * @deprecated since v2.0.0
     * @param forceLogin 是否是强制登录
     */
    function login(forceLogin: boolean): Promise<any>;

    /**
     * 获取用户信息
     * @deprecated since v2.0.0
     * @param options 参数
     */
    function handleUserInfo(options: BaaS.handleUserInfoOptions): Promise<any>;

    /**
     * 退出登录状态
     * @deprecated since v2.0.0
     */
    function logout(): Promise<any>;

    /**
     * 检测违规图片
     * @param filePath 带检测的图片路径
     */
    function wxCensorImage(filePath: string): Promise<any>;

    /**
     * 检测违规文本
     * @param text 带检测的文本内容
     */
    function wxCensorText(text: string): Promise<any>;

    /**
     * 异步检测图片、音频
     * @param fileID 文件 ID
     */
    function censorAsync(fileID: string): Promise<BaaS.Response<BaaS.CensorAsyncResult>>;

    /**
     * 获取异步检测结果
     * @param id 检测记录 ID
     */
    function getCensorResult(id: string | number): Promise<BaaS.Response<BaaS.CensorAsyncResult>>;

    /**
     * 获取二维码
     * @param type 类型
     * @param params 参数
     * @param cdn 是否上传二维码到文件存储并返回图片链接，默认为 false
     * @param categoryName 指定上传文件分类名，cdn 为 true 时有效，不指定该参数或分类名不存在，则默认上传到根目录
     */
    function getWXACode(type: string, params: object, cdn?: boolean, categoryName?: string): Promise<BaaS.Response<any>>;

    /**
     * 获取支付订单
     * @deprecated
     * @param params 参数
     */
    function order(params: BaaS.OrderParams): Promise<any>;

    /**
     * 微信支付
     * @param params 参数
     */
    function pay(params: BaaS.PaymentParams): Promise<any>;

    /**
     * 上报模板消息卡片点击事件
     * @param options onShow 方法中的 options 参数
     */
    function reportTemplateMsgAnalytics(options: any): void;

    /**
     * 网络请求
     * @param params 参数
     */
    function request(params: BaaS.RequestParams): Promise<BaaS.Response<any>>;

    /**
     * 上报订阅消息订阅关系
     * @param options 参数
     */
    function subscribeMessage(options: BaaS.SubscribeMessageOptions): Promise<BaaS.Response<any>>;

    /**
     * 网络请求返回值
     */
    interface Response<T> {
        /**
         * HTTP Response Header
         */
        header: object;
        /**
         * 数据
         */
        data: T;
        /**
         * HTTP 状态码
         */
        statusCode: number;
    }

    /**
     * 支付参数
     */
    interface PaymentParams {
        /**
         * 微信支付凭证-商品详情的内容
         */
        merchandiseDescription: string;
        /**
         * 支付总额，单位：元
         */
        totalCost: number;
        /**
         * 商品数据表 ID，可用于定位用户购买的物品
         */
        merchandiseSchemaID?: string;
        /**
         * 商品数据行 ID，可用于定位用户购买的物品
         */
        merchandiseRecordID?: string;
        /**
         * 根据业务需求自定义的数据
         */
        merchandiseSnapshot?: Object;
        /**
         * 当前订单是否需要分账
         */
        profitSharing?: boolean;
    }

    interface OrderParams {
        /**
         * 支付流水号
         */
        transactionID: string;
    }

    interface Subscription {
        /**
         * 模版 ID
         */
        template_id: string;
        /**
         * 模版类型
         */
        subscription_type: string;
    }

    interface SubscribeMessageOptions {
        /**
         * 订阅关系
         */
        subscription: any[];
    }

    /**
     * 上传文件。
     * @param fileParams 文件参数
     * @param metaData 文件元信息
     * @param type 文件类型
     */
    function uploadFile(fileParams: FileParams, metaData: FileMeta, type: string): Promise<any>;

    /**
     * 微信加密数据解密
     * @param encryptedData 加密的数据
     * @param iv 加密算法的初始向量
     * @param type 数据类型
     */
    function wxDecryptData(encryptedData: string, iv: string, type: string): Promise<any>;

    /**
     * 上报模板消息所需 formID
     * @param formID formID
     */
    function wxReportTicket(formID: string): Promise<BaaS.Response<any>>;

}


declare namespace wx {
    interface Wx {
        /**
         * 知晓云 SDK 命名空间
         */
        BaaS: typeof BaaS;
    }
}

