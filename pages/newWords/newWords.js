// pages/newWords/newWords.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMeanTip:'显示释义',
    translate:false ,         //开始进入生词本，不显示释义
    all:0,
    forgeting:0,
    scrollviewArray:[],
    
  },

  showMean:function(){
    if(this.data.translate == false){
      this.setData({
        showMeanTip:'关闭释义',
        translate:true
      })
    }else{
      this.setData({
        showMeanTip:'显示释义',
        translate:false
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
    let that = this;
    wx.request({
      url: app.globalData.netUrl + 'serReview.php',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method:"POST",
      data:{
        type:1,                   //得到用户的生词表
        userName:app.globalData.userInfo.nickName
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          scrollviewArray:res.data.words
        })
        if(res.data.words.length == 0){
          wx.showToast({
            title: '目前没有需要复习的单词',
            icon:'none'
          })
        }else{
          that.setData({
            all:res.data.all,
            forgeting:res.data.forgeting
          })
        }
      },
      fail:function(res){

      }
    })
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