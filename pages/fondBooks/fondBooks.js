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
    var that = this;                         //解决showModal中不能使用this.data删除数据
    var index = e.currentTarget.dataset.index;        //得到此时点击的图书索引
    var bookId = this.data.localFondArray[index].id;
   
    wx.showModal({
      title:'温馨提示',
      content:'确定删除？',
      success(res){
        if(res.confirm){
          wx.request({
            url: app.globalData.netUrl + 'fondBook.php',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST", 
            data:{
              type:0,           //请求码0删除词书
              bookId:bookId    
            },   
            success:function(res){
              //用户点击确认后，删除本地的用户收藏数组中词书Id后，向服务器发起请求
              let index = app.globalData.fondBookArr.indexOf(bookId)
              app.globalData.fondBookArr.splice(index,1)  
              console.log(app.globalData.fondBookArr)
              //调用onshow函数，重新显示信息             
              that.onShow()                    
              wx.showToast({
              title: '删除成功',
              icon:'none'
            })
          },
            fail:function(res){
              wx.showToast({
              title: "遇到错误" + res.errMsg,
              icon:'none'
           })
          }, 
          })
        }
        
      }
       
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
    console.log("进入onShow函数")
    let that = this;
    //如果用户收藏词书为空，则不发起请求
    if(app.globalData.fondBookArr.length == 0){
      that.setData({               
        localFondArray:null
      })
      return;
    }
    
    //每次页面显示时，把本地已收藏词书数组提交服务器，请求得到词书其他数据
    wx.request({
      url: app.globalData.netUrl + 'fondBook.php',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method:"POST",
      data:{
        type:3,       //请求码3，根据本地用户收藏数组，向服务端请求词书基本信息
        fondArray:app.globalData.fondBookArr
      },
      success:function(res){
        console.log(res.data)
        if(res.data.length > 0){
          for(let i = 0;i < res.data.length;i++){
            res.data[i].image = "../source/image/booksImg/" + res.data[i].image;
          }
        }        
        that.setData({               
          localFondArray:res.data
        })
        //console.log(that.localFondArray) 
      },
      fail:function(res){
        console.log(res.data)
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
    this.onShow()
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