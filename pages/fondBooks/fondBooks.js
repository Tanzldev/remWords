// pages/fondBooks/fondBooks.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fondBooksArray:[{
      bookImg:"../source/image/booksImg/lianci.jpg",
      name:"2020恋恋有词",
      publisher:"高教社出版",
      wordsCount:1024     
    }, {
      bookImg:"../source/image/booksImg/lianci.jpg",
      name:"2020恋恋有词",
      publisher:"高教社出版",
      wordsCount:1024
    },{
      bookImg:"../source/image/booksImg/lianci.jpg",
      name:"2020恋恋有词",
      publisher:"高教社出版",
      wordsCount:1024
    }
  ]
  },
  
  toBookStore:function(){
    wx.switchTab({
      url: '../bookStore/bookStore',
    })
  },

  deleteBookBtn:function(){
    wx.showToast({
      title: '你点击了删除图书按钮',
      icon:'none'
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