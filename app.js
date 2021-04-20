//app.js
App({
  globalData: {
    userInfo:null,
    netUrl: 'http://127.0.0.1/remWords/server/',   
    fondBookArr:[],           //用户点击登录后，存储用户已经收藏的词书id
    orderNum:1,            //记录此刻用户所背单词的编号,数据库的id是从1开始的，为0时将报错
    selectArrayOrder:0,   //记录用户未完成一轮学习，退出学习页面，记录此刻单词数组中的顺序
    recitedBook:{bookName:""},   //用户选择正在背诵的词书,需要存储id、bookName和count
    recitedCount:0,         //已经背诵的单词数
    roundCount:9
  },

  //根据用户名获取用户收藏词书id数组
  getUserFondBook:function(userName){
    //console.log("进入函数")
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
        console.log(that.globalData.fondBookArr)
        //console.log(typeof(that.globalData.fondBookArr[0]))
      },
      fail:function(res){
        console.log(res.errMsg)
      }
    })
  }
})