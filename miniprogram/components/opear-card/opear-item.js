// my-behavior.js
module.exports = Behavior({
    behaviors: [],
    properties: {
        id: {
            type: String,
            value:""
          },
          type: {
            type: String,
            value: 'pre',
          },
          start: {
            type: String,
            value:""
          },
          end: {
            type: String,
            value:""
          },
          time: {
            type: String,
            value:""
          },
          price: {
            type: String,
            value:"0.00"
          },
          payStatus: {
            type: Boolean,
            value: false
          },
          cancel: {
            type: Boolean,
            value: false
          },
          completion: {
            type: Boolean,
            value: false
          },
          isGet: {
            type: Boolean,
            value:false
          },
    },
    data: {
    },
    attached: function () { 
    },
    methods: {
    }
  })