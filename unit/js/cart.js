Vue.filter("money",function(value,type){
  return "¥ " + value.toFixed(2) + type;
})
new Vue ({
  el:'#app',
  data:{
    result:{
      "status":1,
      "result":{
        "totalMoney":109,
        "list":[
          {
            "productId":"600100002115",
            "productName":"黄鹤楼香烟",
            "productPrice":19,
            "productQuantity":1,
            "productImage":"img/goods-1.jpg",
            "parts":[
              {
                "partsId":"10001",
                "partsName":"打火机",
                "imgSrc":"img/part-1.jpg"
              }
            ]
          },
          {
            "productId":"600100002120",
            "productName":"加多宝",
            "productPrice":8,
            "productQuantity":5,
            "productImage":"img/goods-2.jpg",
            "parts":[
              {
                "partsId":"20001",
                "partsName":"吸管",
                "imgSrc":"img/part-2.jpg"
              }
            ]
          },
          {
            "productId":"600100002117",
            "productName":"金装黄鹤楼",
            "productPrice":25,
            "productQuantity":2,
            "productImage":"img/goods-1.jpg",
            "parts":[
              {
                "partsId":"10001",
                "partsName":"打火机-1",
                "imgSrc":"img/part-1.jpg"
              },
              {
                "partsId":"10002",
                "partsName":"打火机-2",
                "imgSrc":"img/part-1.jpg"
              }
            ]
          }
        ]
      },
      "message":""
    },
    totalMoney: 0,
    productList:[],
    checkedAllFlag:false,
    delFlag:false,
    curProduct:""
  },
  filters:{
    formatMoney: function (value) {
      return "¥ "+ value.toFixed(2);
    }
  },
  // 代替ready的mounted的钩子,但是并不能保证实例已经插入文档
  mounted: function () {
    this.$nextTick(function() {
      this.cartViem();
    })
  },
  methods:{
    cartViem:function(){
      this.productList = this.result.result.list;
    },
    changeMoney:function(product,way){
      if (way > 0) {
        product.productQuantity++;
      }else {
        product.productQuantity--;
        if (product.productQuantity < 1) {
          product.productQuantity = 1;
        }
      }
      this._calcTotalPrice();
    },
    selectProduct:function(item){
      if (typeof item.checked == 'undefined') {
        this.$set(item,'checked',true);
      }else{
        item.checked = !item.checked;
      }
      this._calcTotalPrice();
    },
    checkedAll:function(flag){
      this.checkedAllFlag = flag;
      // var _this = this;
      // this.productList.forEach(function(item,index){
      // 疑问箭头函数改变了this作用域不需要之前用_this捕捉this?原理......
      this.productList.forEach((item,index) => {
        if (typeof item.checked == 'undefined') {
          this.$set(item,'checked',this.checkedAllFlag);
        }else{
          item.checked = this.checkedAllFlag;
        }
      })
      this._calcTotalPrice();
    },
    delConfirm:function(item){
      this.delFlag = true;
      this.curProduct = item;
    },
    delProduct:function(){
      var index = this.productList.indexOf(this.curProduct);
      this.productList.splice(index,1);
      this.delFlag = false;
      this._calcTotalPrice();
    },
    _calcTotalPrice:function(){
      this.totalMoney = 0;
      this.productList.forEach((item,index) => {
        if (item.checked) {
          this.totalMoney += item.productPrice*item.productQuantity;
        }
      })
    }
  }
})
