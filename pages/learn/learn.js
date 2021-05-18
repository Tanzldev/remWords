// pages/learn/learn.js 
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    english:'',
    chinese:'',
    orderIndex:0,         //背诵单词的此刻顺序，退出页面时，需要记录
    rightIndex:0,         //此刻单词在数组中正确的索引
    resultArray:[],             //从服务端接收的单词数组
    chineseArray:[],
    tipCover:false
  },

  //用户选择
  select:function(e){
    var that = this;
    let index = e.currentTarget.dataset.index;    //得到用户的选择
    console.log(that.data.orderIndex)
 
    // if(index == that.data.rightIndex && that.data.orderIndex == that.data.resultArray.length-1){
      
    //   //return;
    // }

    //用户选择了正确答案
    if(index == that.data.rightIndex){
      let temp = that.data.orderIndex + 1;              //使用临时变量使背词数+1
      let tempChineseArr = that.data.chineseArray;  //为了设置选择数组的正确选项的颜色
      tempChineseArr[index].borderColor = "#20c000";
      tempChineseArr[index].bgd = "#c4f5b9";
      that.setData({
        orderIndex:temp,
        chineseArray:tempChineseArr
      })
      this.sleep(500);        //开启线程休眠0.5秒

      //判断是加载本地数据，还是发起网络请求，加载下一个数据
      this.isRequest();
      app.globalData.recitedCount++;           //已背单词数+1             
    }
    else{
      /**
       * TODO 用户回答错误，将弹出半屏弹框，提示用户是否将单词标记为生词。
       * 若要标记生词，且若是第一次将需要建立用户的生词表
       */
      that.setData({
        tipCover:true
      })
      app.globalData.recitedCount++;          //已背单词数+1 
    }
       
  },
  //用户点击继续学习函数
  continueLearn:function(){
    let that = this;
    let temp = that.data.orderIndex + 1; 
    that.setData({
      tipCover:false,         //隐藏错误信息提示层
      orderIndex:temp
    })
    //判断是加载本地数据，还是发起网络请求，加载下一个数据。
    this.isRequest();
    
  },

  //添加生词本函数
  addNewWord:function(){
    let that = this;
    let temp = that.data.orderIndex + 1; 
    that.setData({
      tipCover:false,         //隐藏错误信息提示层
      orderIndex:temp
    })
    let english = that.data.resultArray[that.data.orderIndex].english;
    let chinese = that.data.resultArray[that.data.orderIndex].chinese;
    console.log(english + chinese)
    wx.request({
      url: app.globalData.netUrl + 'serLearn.php',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      data:{
        type:2,
        english:that.data.resultArray[that.data.orderIndex].english,
        chinese:that.data.resultArray[that.data.orderIndex].chinese,
        userName:app.globalData.userInfo.nickName
      },
      success:function(res){
        if(res.data == "1"){
          wx.showToast({
            title: '添加成功',
            icon:'none'
          })
        }
        console.log(res.data)
      },
      fail:function(res){
        console.log(res.data)
      }
    })
    //判断是加载本地数据，还是发起网络请求，加载下一个数据。
    this.isRequest();
  
  },
  //判断是加载本地数据，加载下一个数据。还是发起网络请求
  isRequest:function(){
    let that = this;
    //判断是否到达结果数组的最后
    if(that.data.orderIndex != that.data.resultArray.length){
      this.getSelectArray() 
    }else{
      that.setData({
        orderIndex:0            //从结果数组的下标0开始，归0操作
      })
      
      wx.showModal({
        cancelColor: 'cancelColor',
        title:'恭喜完成本阶段学习',
        content:'是否进入下一阶段？',
        success(res){
          //用户点击确定事件
          if(res.confirm){   
            app.globalData.orderNum = app.globalData.orderNum + that.data.resultArray.length;
            console.log("发起请求"+app.globalData.orderNum)
            that.getResultArray();
          }
          //用户点击取消事件
          else if (res.cancel) {
            that.setData({
              orderIndex:that.data.resultArray.length-1
            })
            //console.log('用户点击取消')
          }
        }
      })
    }
  },
  
  //线程停止函数
  sleep:function(sleepTime){
    var now = new Date(); 
    var exitTime = now.getTime() + sleepTime; 
    while (true) { 
        now = new Date(); 
        if (now.getTime() > exitTime) 
        return;
    }
  },

  //选择数组编排函数
  getSelectArray:function(){
    var that = this;
    that.setData({
      rightIndex:Math.floor(Math.random() * 4),
    })
    //let rightIndex = Math.floor(Math.random() * 4);   //正确选择的索引，存储正确的意思
    let tArray = [
    {borderColor:"#b5b1b0",chinese:""},
    {borderColor:"#b5b1b0",chinese:""},
    {borderColor:"#b5b1b0",chinese:""},
    {borderColor:"#b5b1b0",chinese:""}];
    //当前正在背诵单词索引
    //let orderIndex = 0;
    that.setData({
      english:that.data.resultArray[that.data.orderIndex].english,
      chinese:that.data.resultArray[that.data.orderIndex].chinese
    })
    tArray[that.data.rightIndex].chinese = that.data.resultArray[that.data.orderIndex].chinese;   //设置翻译
    //console.log(tArray[that.data.rightIndex].chinese)
    //从结果数组中选择除正确选项的三个中文，即结果数组中产生3个索引
    let tempArray = [-1,-1,-1];

    for(let i = 0;i < 3;i++){
      let randomIndex = Math.floor(Math.random() * that.data.resultArray.length-1);     
      //避免与当前单词意思重复
      while(randomIndex == that.data.orderIndex || tempArray.indexOf(randomIndex) != -1){    
        //console.log(randomIndex)  
        randomIndex = Math.floor(Math.random() * this.data.resultArray.length);
      }
      tempArray[i] = randomIndex;
      //console.log(tempArray)
      //console.log(randomIndex)
      for(let j = 0;j < 4;j++){
        if(tArray[j].chinese == ""){
          tArray[j].chinese = that.data.resultArray[randomIndex].chinese;
          break;
        } 
      }
    }
    that.setData({
      chineseArray:tArray
    }) 
  },

  //向服务端请求结果数组，请求数据orderNum为背词的顺序号
  getResultArray:function(){
    let that = this;
    wx.request({
      url: app.globalData.netUrl + 'serLearn.php',
      method:"POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data:{
        type:1,
        orderNum:app.globalData.orderNum,
        bookName:app.globalData.recitedBook.bookName,
        roundCount:app.globalData.roundCount
      },
      success:function(res){
        that.setData({
          resultArray:res.data
        })
        that.getSelectArray();     //为解决请求响应时间，将接收数组放在服务器结果返回之后
        console.log(res.data)
      },
      fail:function(){
        wx.showToast({
          title: '遇到错误' + res.errMsg,
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this;
    that.setData({
      //页面加载时，从全局变量中获取背诵单词表中的序号,-1是因为得到的结果数组下标是从0开始的
      orderIndex:app.globalData.selectArrayOrder      
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
    this.getResultArray();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function(){
    let that = this;
    //非tabBar页面，退出页面后，将直接被卸载。不会被页面栈保留
    console.log("页面卸载函数执行") 
    app.globalData.selectArrayOrder = that.data.orderIndex;
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