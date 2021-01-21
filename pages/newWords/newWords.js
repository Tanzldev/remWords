// pages/newWords/newWords.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMeanTip:'显示释义',
    hasShowMean:false ,         //开始进入生词本，不显示释义

    scrollviewArray:[{
      message:0
    },{
      message:1
    },{
      message:2
    },{
      message:3
    },{
      message:4
    },{
      message:5
    },{
      message:6
    },{
      message:7
    }],
    
  },

  showMean:function(){
    if(this.data.hasShowMean == false){
      this.setData({
        showMeanTip:'关闭释义',
        hasShowMean:true
      })
    }else{
      this.setData({
        showMeanTip:'显示释义',
        hasShowMean:false
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