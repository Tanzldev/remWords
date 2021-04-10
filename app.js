//app.js
App({
  globalData: {
    userInfo:null,
    netUrl: 'http://localhost/remWords/server/',   
    fondBookArr:[],          //用户点击登录后，存储用户已经收藏的词书id
    fondBookArray:[]         //本地用户收藏图书数组        
  },

  getUserFondBook:function(userName){
    console.log("进入函数")
    let that = this;
    //通过用户id,获取用户已经收藏的词书id
    wx.request({ 
      url: that.globalData.netUrl + 'fondBook.php',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method:"POST",
      data:{
        type:2,         //请求码2 根据用户id返回用户收藏词书id
        name:userName
      },
      success:function(res){
        that.globalData.fondBookArr = res.data,
        console.log(that.globalData.fondBookArr),
        console.log(typeof(that.globalData.fondBookArr[0]))
      },
      fail:function(res){
        console.log(res.errMsg)
      }
    })
  }
})