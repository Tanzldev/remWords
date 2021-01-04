// pages/complete/complete.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
   bookItem:"大学",
   booksTypeImgSrc:"../source/image/tipBookTypeDown.jpg",
   array: ['初中', '高中', '大学', '考研'],               //普通选择器的选择数组
   //滑动选择器的结果数组
   scrollviewArray: [{
    message: '1',
  }, {
    message: '2'
  },{
    message:'3'
  },{
    message:'4'
  },{
    message: '5'
  },{
    message:'6'
  },{
    message:'7'
  }
  ]
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