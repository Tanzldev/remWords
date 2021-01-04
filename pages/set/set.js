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

//点击登录 函数
  register:function(){
    wx.request({
      /*  
      url路径，就是你的PHP文件在那里，这里也用的是绝对路径
      */
      url: app.globalData.netUrl+'checkLogin.php',      //

      //向服务器存放数据的地方
      data:{
        tel:'123456',      //测试的用户名，请与服务端PHP中的名称一致
        password:'123456',
      },
      method:'GET',   //这里好像不支持POST请求，POST请求会失败，原因还不明白
      header:{
        'content-type':'application/json'     //默认设置
      },
      
      success:function(res){
        //返回的res已经是JSON格式的数据了，因为在服务端用PHP进行了JSON编码
        var obj = JSON.stringify(res)   //将服务器返回的JSON对象解析成字符串
                                        //JSON.parse()是将字符串组成JSON格式的数据
        var resData = JSON.stringify(res.data)  //将返回的data解析


        
        console.log(res.data)     //返回JSON对象的子级JSON对象
        console.log(obj)          //查看服务端返回的JSON对象有那些，发现有很多个JSON对象
        console.log(res.statusCode)
        console.log(res.errMsg)

        if (res.data.icode == -1){
          wx.showToast({
            icon:'none',
            title: '用户没有注册！',
          })
        }
        else if (res.data.icode == 1){
          wx.showToast({
            icon: 'none',
            title: '用户名、密码正确！',
          })
        }
        else{
          wx.showToast({
            icon: 'none',
            title: '用户名、密码错误！',
          })
        }
      
      },
      fail:function(res){
       wx.showToast({
         title: "网络请求失败" + res.errMsg,
         icon:'none'
       })
      },
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