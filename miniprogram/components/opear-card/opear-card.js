var opearItem = require('./opear-item')

Component({
  behaviors: [opearItem],
  data: {},
  properties: {
    tripInfo:{
      type: Object,
      value:{
        avatar:{
          type:String,
          value:""
        },
        nickName:{
          type:String,
          value:"昵称"
        },
        pushTime:{
          type:String,
          value:""
        },
        preTime:{
          type:String,
          value:""
        },
        start:{
          type:String,
          value:""
        },
        end:{
          type:String,
          value:""
        },
        peoNum:{
          type:Number,
          value:1
        },
        peoTotalNum:{
          type:Number,
          value:1
        }
      }
    },
  },
  lifetimes:{
      attached(){
        console.log(this.data)
      }
  },
  methods: {
    
  }
})