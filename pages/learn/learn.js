// pages/learn/learn.js 
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    english:'',
    orderIndex:0,         //背诵单词的此刻顺序，退出页面时，需要记录
    rightIndex:0,         //此刻单词在数组中正确的索引
    resultArray:[],             //从服务端接收的单词数组
    chineseArray:[],
    borderColor:"#000000"
  },

  //用户选择事件
  select:function(e){
    var that = this;
    let index = e.currentTarget.dataset.index;    //得到用户的选择
    console.log(that.data.orderIndex)
    if(that.data.orderIndex == that.data.resultArray.length-1){
      that.setData({
        orderIndex:-1
      })
      app.globalData.orderNum = app.globalData.orderNum + that.data.resultArray.length;
      console.log("发起请求"+app.globalData.orderNum)
      wx.showModal({
        cancelColor: 'cancelColor',
        title:'恭喜完成本阶段学习',
        content:'是否进入下一阶段？',
        success(res){
          //用户点击确定事件
          if(res.confirm){   
            that.getResultArray();
          }
        }
      })
      //return;
    }
    //用户选择了正确答案
    if(index == that.data.rightIndex){
      let temp = that.data.orderIndex + 1;      //使用临时变量使背词数+1
      that.setData({
        orderIndex:temp,
        borderColor:"aqua"
      })
      // wx.showToast({
      //   title: '回答正确',
      //   icon:'none'
      // })
      //调用选择编排函数，重新显示界面数据
      //TODO 采用动画淡入、淡出效果提升用户的体用感
      this.getSelectArray()                     
    }else{
      /**
       * TODO 用户回答错误，将弹出半屏弹框，提示用户是否将单词标记为生词。
       * 若要标记生词，且若是第一次将需要建立用户的生词表
       */
      wx.showToast({
        title: '回答错误',
        icon:'none'
      })
    }
  },

  //选择数组编排函数
  getSelectArray:function(){
    var that = this;
    that.setData({
      rightIndex:Math.floor(Math.random() * 4),
    })
    //let rightIndex = Math.floor(Math.random() * 4);   //正确选择的索引，存储正确的意思
    let tArray = [{chinese:""},{chinese:""},{chinese:""},{chinese:""}];
    //当前正在背诵单词索引
    //let orderIndex = 0;
    that.setData({
      english:that.data.resultArray[that.data.orderIndex].english
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
        orderNum:app.globalData.orderNum
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