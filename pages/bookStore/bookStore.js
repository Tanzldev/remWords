// pages/complete/complete.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
   
   bookItem:"初中",
   booksTypeImgSrc:"../source/image/tipBookTypeDown.jpg",
   array: ['初中', '高中', '大学', '考研'],               //普通选择器的选择数组
   scrollHeight:0,
   //滑动选择器的结果数组
   scrollviewArray: [{
    message: '1',     
    fondImgSrc:"../source/image/fondImg.jpg",       //收藏❤图标路径 
    hasFond:false,                                  //是否已选择标记
    tipSelect:"选择词书",                            //是否已选择文字显示
    bgd:"#ffffff"                                   //是否已选择文字背景
  }, {
    message: '2',
    fondImgSrc:"../source/image/fondImg.jpg",
    hasFond:false,
    tipSelect:"选择词书",
    bgd:"#ffffff"
  },{
    message:'3',
    fondImgSrc:"../source/image/fondImg.jpg",
    hasFond:false,
    tipSelect:"选择词书",
    bgd:"#ffffff"
  },{
    message:'4',
    fondImgSrc:"../source/image/fondImg.jpg",
    hasFond:false,
    tipSelect:"选择词书",
    bgd:"#ffffff"
  },{
    message: '5',
    fondImgSrc:"../source/image/fondImg.jpg",
    hasFond:false,
    tipSelect:"选择词书",
    bgd:"#ffffff"
  },{
    message:'6',
    fondImgSrc:"../source/image/fondImg.jpg",
    hasFond:false,
    tipSelect:"选择词书",
    bgd:"#ffffff"
  },{
    message:'7',
    fondImgSrc:"../source/image/fondImg.jpg",
    hasFond:false,
    tipSelect:"选择词书",
    bgd:"#ffffff"
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

  //点击srcollview子元素空白处，弹出词书详情
  bookDetail:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    wx.showToast({
      title: '你点击了' + index +"图书详情",
      icon:'none'
    })
  },

  //选择词书  
  fondBook:function(e){
    
    var that = this;
    var index = e.currentTarget.dataset.index;      //获取用户点击位置
    console.log(index);
    //获取滑块数组中的index的img的路径变量
    var src = "scrollviewArray["+index+"].fondImgSrc"; 
    var hasFond = "scrollviewArray["+index+"].hasFond";
    var tipSelect =  "scrollviewArray["+index+"].tipSelect";
    var bgd = "scrollviewArray["+index+"].bgd";
    // console.log(src);
    // console.log(hasFond);
    if(this.data.scrollviewArray[index].hasFond == false){
      that.setData({
        [src]:"../source/image/SelectFondImg.jpg",
        [hasFond]:true,
        [tipSelect]:"已选择",
        [bgd]:"#eb6877"
       })
    } else{
      that.setData({
        [src]:"../source/image/fondImg.jpg",
        [hasFond]:false,
        [tipSelect]:"选择词书",
        [bgd]:"#ffffff"
       })
    } 
    
    
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