// pages/fondBooks/fondBooks.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //已选词书数组
    localFondArray:[]
  },
  
  //跳转至tabBar界面，添加更多图书
  toBookStore:function(){
    wx.switchTab({
      url: '../bookStore/bookStore',
    })
  },

  //删除词书
  deleteBookBtn:function(e){
    var that = this;                         //未解决showModal中不能使用this.data删除数据
    var index = e.currentTarget.dataset.index;        //得到此时点击的图书索引
    var id = this.data.localFondArray[index].id;
    //★★★★★  似乎定义的array数组并没有开辟新的存储空间，而是通过类似指针的形式，指向了赋值数组
    var array = this.data.localFondArray;          //局部变量接收已选词书数组
    
    wx.showModal({
      title:'温馨提示',
      content:'确定删除？',
      success(res){
        if(res.confirm){
          array.splice(index,1);                    //这里应该根据词书对象中的id删除词书
          that.setData({
            localFondArray:array              //局部变量数组赋给已选词书数组
          })
        }
      }
      
    })
    
  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({               //页面加载时，将app.js中全局变量的值赋给scrollview选择器数组
      localFondArray:app.globalData.fondBookArray
    })
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