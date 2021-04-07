// pages/my/my.js
const app = getApp()
Page({
  data: {
   login:"登录",            //界面按钮
   userName:"XXX",
   userGender:-1,
   versionNum:"v1.0.0",
   userInfo: {},
   hasUserInfo: false,
   canIUseGetUserProfile: false,
   firstLogin:1,
   netWorkType:'4g',
   canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // if (app.globalData.userInfo) {      //检测本地是否有用户信息
    //   this.setData({
    //     userInfo: app.globalData.userInfo, 
    //   })
    // } else if (this.data.canIUse) {
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,        
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,           
    //       })
    //     }
    //   })
    // }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  toFondBooks:function(){
    if(this.data.hasUserInfo == true){
      wx.navigateTo({
        url: '../fondBooks/fondBooks',
      })
    }else{
      wx.showToast({
        title: '未登录',
        icon:'none'
      })
    }
   
  },

  toNewWords:function(){
    if(this.data.hasUserInfo == true){
      wx.navigateTo({
        url: '../newWords/newWords',
      })
    }else{
      wx.showToast({
        title: '未登录',
        icon:'none'
      })
    }
    
  },
 
  //跳转到我要反馈界面
  toMyFeedBack:function(){
  
    wx.navigateTo({
      url: '../myFeedBack/myFeedBack', //此路径为相对路径
    })
  },
  
  //跳转设置界面
  toSet:function(){
    wx.navigateTo({
      url: '../set/set',
    })
  },
 
  getUserProfile(e) {
    //本地无用户信息时，发起申请
    if(!this.data.hasUserInfo){
    this.getNetWork();
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        app.globalData.userInfo = res.userInfo,
        console.log("用户信息获取成功")
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(this.data.hasUserInfo)
        if(this.data.hasUserInfo){        //获取用户信息成功，则修改登录按钮提示信息
          this.setData({
            login:"你好" 
          })
        }
        //向服务器提交用户信息             
        wx.request({                                      //request请求
          url:app.globalData.netUrl+'serUser.php',
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          data: {                                         //数据项
            type:1,
            name: res.userInfo.nickName,
            gender:res.userInfo.gender,
            country: res.userInfo.country,
            province: res.userInfo.province,
            city:res.userInfo.city
          },

          success: function (res) {            //向服务器提交用户信息成功
            console.log(res)
          },
          fail: function (res) {               //提交用户信息失败
            console.log(res)
          }    
        })  
      }
    })
    
  } 
  },
//判断用户是否连接网络
  getNetWork:function(){   
  wx.getNetworkType({
    success: function(res) {
      const netWorkType = res.networkType
      //console.log(res);
      if('none' == netWorkType){            //用户无网络连接
        wx.showToast({
          title: '网络连接失败！',
          icon:'none',
          duration:1000
        })
      }
      
      else if('2g' == netWorkType){         //用户接入2g网
        wx.showToast({
          title: '网络堵车中···',
          icon:'none',
          duration:1000
        })
      }
    },
  })
  },

  // //用户信息获取
  // getUserInfo: function (e) {
  //   app.globalData.userInfo = e.detail.userInfo
  //   if(app.globalData.userInfo && this.data.userInfo){    //判断是否获取用户信息成功
  //     this.setData({
  //       userInfo: e.detail.userInfo,
  //       hasUserInfo: true,
  //     })
  //   }
  // },
  

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