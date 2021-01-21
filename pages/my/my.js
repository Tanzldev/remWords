// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   login:"登录",
   userName:"XXX",
   userGender:-1,
   versionNum:"v1.0.0",
   userInfo: {},
   hasUserInfo: false,
   firstLogin:1,
   canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {      //检测本地是否有用户信息
      this.setData({
        userInfo: app.globalData.userInfo,
        
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,        
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,           
          })
        }
      })
    }

  },

  toFondBooks:function(){
    wx.navigateTo({
      url: '../fondBooks/fondBooks',
    })
  },

  toNewWords:function(){
    wx.navigateTo({
      url: '../newWords/newWords',
    })
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
 
  //用户信息获取
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    if(app.globalData.userInfo && this.data.userInfo){    //判断是否获取用户信息成功
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }

    //判断用户是否连接网络
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

    if(this.data.hasUserInfo == true){        //获取用户信息成功，则修改界面内容
      this.setData({
        login:"你好",
       
      })
    }

    //向服务器提交用户信息
    // var db = 0;               
    wx.getUserInfo({
      success: function (res) {
        //用户是第一次登录，则向服务器提交用户信息
        if (app.globalData.firstLogin == 1) {         
          var name=res.userInfo.nickName;
          var gender=0;
          var province = res.userInfo.province;
          var city = res.userInfo.city;
          var country = res.userInfo.country
          wx.request({                                      //request请求
            url:app.globalData.netUrl+'add_users.php',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST",
            data: {                                         //数据项
              name: res.userInfo.nickName,
              gender:res.userInfo.gender,
              country: res.userInfo.country,
              province: res.userInfo.province,
              city:res.userInfo.city
             
            },
            success: function () {            //向服务器提交用户信息成功
              console.log("success")
            },

            fail: function () {               //提交用户信息失败
              console.log("fail"),
                console.log(name),
                console.log(gender),
                console.log(province),
                console.log(city),
                console.log(country)
            }
           
          })
          
        }
        //修改全局变量，标记用户已经登录过，不能再向服务器提信息
        app.globalData.firstLogin=0;      
      }
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