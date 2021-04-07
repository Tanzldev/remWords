//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    progress_txt: '989/1024', 
    count:0, // 设置 计数器 初始为0
    countTimer: null, 
    hasUserInfo: false,
  },

  changeBook:function(){
    wx.showToast({
      title: '你点击了跟换词书',
      icon:'none'
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
    wx.navigateTo({
      url: '../learn/learn',
    })
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
    console.log("页面显示中")
    //若页面不存在用户信息，即用户没有登录，则显示遮罩层
    if(app.globalData.userInfo!=null){
      this.setData({
        hasUserInfo:true
      })
    }else{
      this.drawProgressbg(); 
      this.drawCircle(1.5);        //根据参数进行画圆
      //this.countInterval()
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
