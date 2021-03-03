// pages/complete/complete.js
const app = getApp();             //要访问app.js中的全局变量的必要代码
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
   
   bookItem:"初中",
   booksTypeImgSrc:"../source/image/tipBookTypeDown.jpg",
   array: ['初中', '高中', '大学', '考研'],               //普通选择器的选择数组
   scrollHeight:0,    

   scrollviewArray: [{              //滑动选择器的结果数组   应根据所选等级从数据库中获取
    id: 1,     
    bookImg:"../source/image/booksImg/lianci.jpg",
    bookName:"考研词汇基础",
    publisher:"高教社出版",
    wordsCount:1024,
    bookLabel:"最新·原版",
    fondImgSrc:"../source/image/fondImg.jpg",       //收藏❤图标路径 
    hasFond:false,                                  //是否已选择标记
    tipSelect:"选择词书",                            //是否已选择文字显示
    bgd:"#ffffff"                                   //是否已选择文字背景
  }
  ],
  
  },

  //词书类型按钮事件
  booksTypeBtn:function() {
    
    this.setData({
      booksTypeImgSrc:"../source/image/tipBookTypeUp.jpg"
    })
  },
  //词书类型展开后，用户点击确定事件
  bindPickerChange:function name(e) {
    this.setData({
      //使tipImg图标朝上
      booksTypeImgSrc:"../source/image/tipBookTypeDown.jpg",
      bookItem:this.data.array[e.detail.value]
    })
    console.log(e.detail.value)
  },

  ///词书类型展开后，用户点击取消事件
  bindPickerCancel:function name(params) {
    this.setData({
      //使tipImg图标朝下
      booksTypeImgSrc:"../source/image/tipBookTypeDown.jpg"
    })
  },

  //词书详情
  bookDetail:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    //点击我显示底部弹出框
    this.showModal();
    // wx.showToast({
    //   title: '你点击了' + index +"图书详情",
    //   icon:'none'
    // })
  },

  //选择词书  
  fondBook:function(e){
    
    var that = this;
    var index = e.currentTarget.dataset.index;      //获取用户点击位置
    // console.log(index);
    //定义新的对象数据类型，获取值后，讲newBook对象压入app.js全局变量对象数组中
    var newBook = {};
    newBook.id = this.data.scrollviewArray[index].id;
    newBook.bookImg = this.data.scrollviewArray[index].bookImg;
    newBook.bookName = this.data.scrollviewArray[index].bookName;
    newBook.publisher = this.data.scrollviewArray[index].publisher;
    newBook.wordsCount = this.data.scrollviewArray[index].wordsCount;
    
    //获取滑块数组中的index的img的路径变量
    var src = "scrollviewArray["+index+"].fondImgSrc"; 
    var hasFond = "scrollviewArray["+index+"].hasFond";
    var tipSelect =  "scrollviewArray["+index+"].tipSelect";
    var bgd = "scrollviewArray["+index+"].bgd";
    
    if(this.data.scrollviewArray[index].hasFond == false){            
      app.globalData.fondBookArray.push(newBook);        //向app.js全局变量中压入newBook对象
      that.setData({
        [src]:"../source/image/SelectFondImg.jpg",
        [hasFond]:true,
        [tipSelect]:"取消选择",
        [bgd]:"#eb6877"
       })
    } else{
      //★★★★★    取消选择后的操作，根据id删除已选词书数组中的数据
      var id = this.data.scrollviewArray[index].id;
      console.log(id)
      app.globalData.fondBookArray.splice(id,1);        //删除app.js中已选词书数组对象
      
      that.setData({
        [src]:"../source/image/fondImg.jpg",
        [hasFond]:false,
        [tipSelect]:"选择词书",
        [bgd]:"#ffffff"
       })
    } 
     
  },


//显示对话框
showModal: function () {
  // 显示遮罩层
  var animation = wx.createAnimation({
    duration: 500,                   //滑动持续时间
    timingFunction: "linear",
    delay: 0
  })
  this.animation = animation
  animation.translateY(800).step()   //滑档速度
  this.setData({
    animationData: animation.export(),
    showModalStatus: true
  })
  setTimeout(function () {
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export()
    })
  }.bind(this), 30)
},

//隐藏对话框
hideModal: function () {
  // 隐藏遮罩层
  var animation = wx.createAnimation({
    duration: 100,
    timingFunction: "linear",
    delay: 0
  })
  this.animation = animation
  animation.translateY(0).step()
  this.setData({
    animationData: animation.export(),
  })
  setTimeout(function () {
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: false
    })
  }.bind(this), 200)
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})