// pages/set/set.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    

  },

 //清除缓存
 clear:function(){
   wx.showToast({
     title: '清除成功！',
     icon:'none',
     duration:1000
   })
 },

 //退出登录
  outLogin:function(){
      var pages = getCurrentPages()    //获取加载的页面( 页面栈 )
    　var currentPage = pages[pages.length - 1]  // 获取当前页面
    　var prevPage = pages[pages.length - 2]    //获取上一个页面
      
      //判断用户是否登录
      if(prevPage.data.hasUserInfo == false){
        wx.showToast({
          title: '亲，你还没有登录！',
          icon:'none',
          duration:1000
        })
      }
      else{
        //温馨提示
        wx.showModal({
          title: '温馨提示',
          content: '确定退出？',
          success(res) {
            //用户点击了确定
            if (res.confirm) {
              app.globalData.userInfo = null
              app.globalData.fondBookArr = []       //退出登录时，清除用户收藏列表
              prevPage.setData({
                login: "登录",
                hasUserInfo: false,   //将hasUserInfo否定
              }),
              wx.navigateBack({
                url: "../my/my"
              })
                //关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层
                
            }
          }

        })

      }
    
  },

//注销账户点击事件
  logout:function(){

    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2]
    //判断用户是否登录
    if(prevPage.data.hasUserInfo == false){
      wx.showToast({
        title: '亲，你还没有登录/注册！',
        icon:'none',
        duration:1000   //持续时间
      })
    }else{
      //用户点击二次确认
      wx.showModal({
        title:"温馨提示",
        content:"确认注销账户？",
        //用户点击确认      
        success(res){
          if(res.confirm){
            //console.log(app.globalData.userInfo.nickName)
            //发起网络请求
            wx.request({
            url: app.globalData.netUrl+'serUser.php',  
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST", 
            //向服务器提交的数据
            data:{
              type:0,
              name:app.globalData.userInfo.nickName            
            },      
            success:function(res){
              console.log(res)        
            },
            fail:function(res){
             wx.showToast({
               title: "注销失败" + res.errMsg,
               icon:'none'
             })
            },
          })
          app.globalData.userInfo = null
          prevPage.setData({
            login: "登录",
            hasUserInfo: false,   //将hasUserInfo否定
            }),
            wx.navigateBack({
              url: "../my/my"
            })
          }           
        }
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