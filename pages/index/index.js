//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    progressTxt: '0/0', 
    count:0, // 设置 计数器 初始为0
    countTimer: null, 
    hasUserInfo: false,
    bookName:"你还未选择词书",            //正在背诵词书的书名
    bookCount:0,            //词书总的单词数
    roundPercent:0,          //环型进度条百分比
    array: [10,20,30,40,50]
  },

//设置picker选择器事件
bindPickerChange:function name(e) {
  let that = this;
  app.globalData.roundCount = that.data.array[e.detail.value]-1;
  console.log(app.globalData.roundCount)
},

  changeBook:function(){
    wx.navigateTo({
      url: '../fondBooks/fondBooks',
    })
  },

  //启动canvas画图，画出内环作为背景
  drawProgressbg: function(){
    // 使用 wx.createContext 获取页面的canvas主键，通过主键获得
    var ctx = wx.createCanvasContext('canvasProgressbg',this)
    ctx.setLineWidth(4);// 设置圆环的宽度
    ctx.setStrokeStyle('#aaaaaa'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
    //设置一个原点(110,110)，半径为100的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  //画圆环
  drawCircle: function (step){  
    var context = wx.createCanvasContext('canvasProgress',this);  //2019/07更新后的配置写法
      // 设置渐变
      var gradient = context.createLinearGradient(200, 100, 100, 200);
      gradient.addColorStop("0", "#2661DD");
      gradient.addColorStop("0.5", "#40ED94");
      gradient.addColorStop("1.0", "#5956CC");
      
      context.setLineWidth(10);
      context.setStrokeStyle(gradient);
      context.setLineCap('round')
      context.beginPath(); 
      // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
      context.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
      context.stroke(); 
      context.draw() 
  },
  countInterval: function () {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    this.countTimer = setInterval(() => {
      if (this.data.count <= 60) {
        /* 绘制彩色圆环进度条  
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
        */
         this.drawCircle(this.data.count / (60/2))
        this.data.count++;
      } else {
        this.setData({
          progress_txt: "已完成"
        }); 
        clearInterval(this.countTimer);
      }
    }, 100)
  },
  //复习单词
  review:function(){  
      wx.navigateTo({
        url: '../newWords/newWords',
      })       
  },
  //学习单词
  learn:function(){
    let that = this;
    if(that.data.bookCount == 0){
      wx.navigateTo({
        url: '../fondBooks/fondBooks',
      })
    }else{
      wx.navigateTo({
        url: '../learn/learn',
      })
    }    
  },
  toLogin:function(){
    wx.switchTab({
      url: '../my/my',
    })
  },

  // 页面创建完成时执行
  onLoad: function () {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    console.log("页面显示中")
    //如果用户已经选择了想要背诵的词书
    if(app.globalData.recitedBook.bookName != ""){
      that.setData({
        bookName:app.globalData.recitedBook.bookName,
        bookCount:app.globalData.recitedBook.bookCount,  
      })

      //显示背词百分比
      let percent = (app.globalData.recitedCount/that.data.bookCount)*2;
      
      let process = app.globalData.recitedCount + "/" + that.data.bookCount;
      that.setData({
        progressTxt:process,
        roundPercent:percent
      })
      this.drawCircle(that.data.roundPercent);        //根据参数进行画圆
    }
    
    //若页面不存在用户信息，即用户没有登录，则显示遮罩层
    if(app.globalData.userInfo != null){
      this.setData({
        hasUserInfo:true 
      })
    }else{
      this.drawProgressbg();     
      //this.countInterval()                    //计时效果画进度条
      this.setData({
        hasUserInfo:false
      })
    }
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
  
})
