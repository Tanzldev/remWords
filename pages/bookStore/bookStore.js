// pages/complete/complete.js
const app = getApp();             //要访问app.js中的全局变量的必要代码
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
   
   bookItem:"基础阶段",
   booksTypeImgSrc:"../source/image/tipBookTypeDown.jpg",
   array: ['基础阶段', '强化阶段', '冲刺阶段'],               //普通选择器的选择数组
   scrollHeight:0,    

   scrollviewArray: [{              //滑动选择器的结果数组   应根据所选等级从数据库中获取
    id: 1,     
    bookImg:"../source/image/booksImg/lianci.jpg",
    bookName:"考研词汇基础",
    publisher:"高教社出版",
    wordsCount:1024,
    bookLabel:"最新·原版",
    intr:"2021恋练有词考研英语词汇识记与应用大全，精选5500个词汇和词组，辅以真题例句解析，力助考生提高记词效率，更科学、更高效地学词。",
    fondImgSrc:"../source/image/fondImg.jpg",       //收藏❤图标路径 
    hasFond:false,                                  //是否已选择标记
    tipSelect:"选择词书",                            //是否已选择文字显示
    bgd:"#ffffff"                                   //是否已选择文字背景
  },
  {              //滑动选择器的结果数组   应根据所选等级从数据库中获取
    id: 2,     
    bookImg:"../source/image/booksImg/chuzhong.jpg",
    bookName:"初中词汇基础",
    publisher:"青海人民教育出版",
    wordsCount:2423,
    bookLabel:"最新·原版·免费",
    intr:"在2020年2月1日由青海人民出版社出版的图书。作者是刘宗寅。本书内容包括单词及背单词的方法。",
    fondImgSrc:"../source/image/fondImg.jpg",       //收藏❤图标路径 
    hasFond:false,                                  //是否已选择标记
    tipSelect:"选择词书",                            //是否已选择文字显示
    bgd:"#ffffff"                                   //是否已选择文字背景
  },
  {              //滑动选择器的结果数组   应根据所选等级从数据库中获取
    id: 3,     
    bookImg:"../source/image/booksImg/hbs.jpg",
    bookName:"考研红宝书",
    publisher:"西北工业大学出版",
    wordsCount:1024,
    bookLabel:"最新·原版",
    intr:"《红宝书·考研英语词汇》是由考研英语命题研究组编写，西北大学出版社在2014年出版的书籍。",
    fondImgSrc:"../source/image/fondImg.jpg",       //收藏❤图标路径 
    hasFond:false,                                  //是否已选择标记
    tipSelect:"选择词书",                            //是否已选择文字显示
    bgd:"#ffffff"                                   //是否已选择文字背景
  }
  ],
  
  boxBook:{}
  },

  //词书类型按钮事件
  booksTypeBtn:function() {
    
    this.setData({
      booksTypeImgSrc:"../source/image/tipBookTypeUp.jpg"
    })
  },
  //词书类型展开后，用户点击确定事件
  bindPickerChange:function name(e) {
    this.setData({
      //使tipImg图标朝上
      booksTypeImgSrc:"../source/image/tipBookTypeDown.jpg",
      bookItem:this.data.array[e.detail.value]      
    })
    let bookRank = e.detail.value;      //根据选择，得出选择的词书等级，并向服务器提交申请
    console.log(e.detail.value)
  },

  ///词书类型展开后，用户点击取消事件
  bindPickerCancel:function name(params) {
    this.setData({
      //使tipImg图标朝下
      booksTypeImgSrc:"../source/image/tipBookTypeDown.jpg"
    })
  },

  //词书详情
  bookDetail:function(e){
    var that = this;
    let index = e.currentTarget.dataset.index;    //局级变量，函数结束系统收回
    let bookItem = {};
    bookItem.img = this.data.scrollviewArray[index].bookImg;
    bookItem.name = this.data.scrollviewArray[index].bookName;
    bookItem.count = this.data.scrollviewArray[index].wordsCount;
    bookItem.publisher = this.data.scrollviewArray[index].publisher;
    bookItem.intr = this.data.scrollviewArray[index].intr;
    that.setData({
      boxBook:bookItem
    })
    //点击我显示底部弹出框
    this.showModal();      //将获取的scrollview数组索引传入showModal函数
  },

  //选择词书  
  fondBook:function(e){
    if(app.globalData.userInfo == null){
      wx.showToast({
        title: '未登录',
        icon:'none'
      })
      return;
    }
    var that = this;
    var index = e.currentTarget.dataset.index;      //获取用户点击位置
    // console.log(index);
    //定义新的对象数据类型，获取值后，讲newBook对象压入app.js全局变量对象数组中
    let newBook = {};
    newBook.id = this.data.scrollviewArray[index].id;
    newBook.bookImg = this.data.scrollviewArray[index].bookImg;
    newBook.bookName = this.data.scrollviewArray[index].bookName;
    newBook.publisher = this.data.scrollviewArray[index].publisher;
    newBook.wordsCount = this.data.scrollviewArray[index].wordsCount;
    
    //获取滑块数组中的index的img的路径变量
    let src = "scrollviewArray["+index+"].fondImgSrc"; 
    let hasFond = "scrollviewArray["+index+"].hasFond";
    let tipSelect =  "scrollviewArray["+index+"].tipSelect";
    let bgd = "scrollviewArray["+index+"].bgd";
    
    if(this.data.scrollviewArray[index].hasFond == false){            
      app.globalData.fondBookArray.push(newBook);        //向app.js全局变量中压入newBook对象
      wx.showToast({
        title: '添加成功',
        icon:'none',
        duration:1500
      })
      that.setData({
        [src]:"../source/image/SelectFondImg.jpg",
        [hasFond]:true,
        [tipSelect]:"取消选择",
        [bgd]:"#eb6877"
       })
    } else{
      //★★★★★    取消选择后的操作，根据id删除已选词书数组中的数据
      let id = this.data.scrollviewArray[index].id;
      console.log(id)
      //js中splice方法根据数组索引删除数组中的对象
      app.globalData.fondBookArray.splice(id-1,1);        //删除app.js中已选词书数组对象
      
      that.setData({
        [src]:"../source/image/fondImg.jpg",
        [hasFond]:false,
        [tipSelect]:"选择词书",
        [bgd]:"#ffffff"
       })
    } 
     
  },


//显示对话框
showModal: function () {
  // 显示遮罩层
  var animation = wx.createAnimation({
    duration: 500,                   //滑动持续时间
    timingFunction: "linear",
    delay: 0
  })
  this.animation = animation
  animation.translateY(800).step()   //滑动速度
  this.setData({
    animationData: animation.export(),
    showModalStatus: true
  })
  setTimeout(function () {
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export()
    })
  }.bind(this), 30)
},

//隐藏对话框
hideModal: function () {
  // 隐藏遮罩层
  var animation = wx.createAnimation({
    duration: 100,
    timingFunction: "linear",
    delay: 0
  })
  this.animation = animation
  animation.translateY(0).step()
  this.setData({
    animationData: animation.export(),
  })
  setTimeout(function () {
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: false
    })
  }.bind(this), 200)
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