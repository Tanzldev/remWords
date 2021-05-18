const app = getApp();             //要访问app.js中的全局变量的必要代码
Page({

  data: { 
   bookItem:"所有词书",
   booksTypeImgSrc:"../source/image/tipBookTypeDown.jpg",
   array: ['所有词书','基础阶段', '强化阶段', '冲刺阶段'],             //普通选择器的选择数组
   scrollHeight:0,    
   scrollviewArray:[], 
   boxBook:{}
  },
  //词书类型按钮事件，点击词书类型后，将指引图标朝上
  booksTypeBtn:function() {
    
    this.setData({
      booksTypeImgSrc:"../source/image/tipBookTypeUp.jpg"
    })
  },
  //词书类型展开后，用户点击确定事件
  bindPickerChange:function name(e) {
    var that = this;
    this.setData({
      //使tipImg图标朝上
      booksTypeImgSrc:"../source/image/tipBookTypeDown.jpg",
      bookItem:this.data.array[e.detail.value]      
    })
    var bookRank = e.detail.value;      //根据选择，得出选择的词书等级，并向服务器提交申请
    wx.request({
      url: app.globalData.netUrl + 'serBooks.php',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method:"POST",
      data:{
        rank:bookRank
      },
      success:function(res){
        //对服务端返回的数据组装
        for(let i = 0;i < res.data.length;i++){
          res.data[i].image = app.globalData.netUrl+"images/" + res.data[i].image;
          res.data[i].fondImgSrc = "../source/image/fondImg.jpg";
          res.data[i].hasFond = false;
          res.data[i].tipSelect = "选择词书";
          res.data[i].bgd = "#ffffff";
          
        }
        //判断用户收藏词书数组是否为空，否则进行scrollview数组数据重组
        if(app.globalData.fondBookArr.length != 0){
          for(let i = 0;i < res.data.length;i++){
              if(app.globalData.fondBookArr.indexOf(res.data[i].id) > -1){
                res.data[i].fondImgSrc = "../source/image/SelectFondImg.jpg",
                res.data[i].hasFond = true,
                res.data[i].tipSelect = "取消选择",
                res.data[i].bgd = "#eb6877"
              }
          }
        }
        that.setData({
          scrollviewArray:res.data    
        })
      },
      fail:function(res){
        wx.showToast({
          title: '遇到错误' + res.errMsg,
          icon:'none'
        })
      }
    })
    console.log(bookRank)
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
    let that = this;
    let index = e.currentTarget.dataset.index;    //局级变量，函数结束系统收回
    let bookItem = {};
    bookItem.img = this.data.scrollviewArray[index].image;
    bookItem.name = this.data.scrollviewArray[index].name;
    bookItem.count = this.data.scrollviewArray[index].count;
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
    // let newBook = {};
    // newBook.id = this.data.scrollviewArray[index].id;
   
    //获取滑块数组中的index的img的路径变量
    let src = "scrollviewArray["+index+"].fondImgSrc"; 
    let hasFond = "scrollviewArray["+index+"].hasFond";
    let tipSelect =  "scrollviewArray["+index+"].tipSelect";
    let bgd = "scrollviewArray["+index+"].bgd";
    
    if(this.data.scrollviewArray[index].hasFond == false){            
      wx.request({
        url: app.globalData.netUrl + 'fondBook.php',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST", 
        //向服务器提交的数据
        data:{
            type:1,           //请求码1收藏词书
            bookId:this.data.scrollviewArray[index].id,
            userName:app.globalData.userInfo.nickName           
          },
        success:function(res){
            console.log(res) 
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
             //向app.js全局变量中压入newBook对象  
             //app.globalData.fondBookArray.push(newBook)  
             app.getUserFondBook(app.globalData.userInfo.nickName)
          },
        fail:function(res){
            wx.showToast({
              title: "收藏失败" + res.errMsg,
              icon:'none'
           })
          }, 
      })  
         
    } else{
      //★★★★★    取消选择后的操作，根据id删除已选词书数组中的数据
      wx.request({
        url: app.globalData.netUrl + 'fondBook.php',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST", 
        data:{
          type:0,           //请求码0删除词书
          bookId:this.data.scrollviewArray[index].id    
        },
        
        success:function(res){
          //js中splice方法根据数组索引删除数组中的对象
          //删除app.js中已选词书数组对象
          //app.globalData.fondBookArray.splice(id-1,1) 
          app.getUserFondBook(app.globalData.userInfo.nickName)     
          that.setData({
              [src]:"../source/image/fondImg.jpg",
              [hasFond]:false,
              [tipSelect]:"选择词书",
              [bgd]:"#ffffff"
            })
          wx.showToast({
            title: '删除成功',
            icon:'none'
          })
          },
        fail:function(res){
            wx.showToast({
              title: "遇到错误" + res.errMsg,
              icon:'none'
           })
          }, 
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
  onLoad: function () {
    console.log("生命周期函数--监听页面开始加载")
    var that = this;
    //页面加载时，向服务器发出请求，rank=0显示所用词书
    wx.request({
      url: app.globalData.netUrl + "serBooks.php",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method:"POST",
      //向服务端发送的数据 rank=0为返回所有词书
      data:{
        rank:0
      },
      //服务端响应成功，返回JSON对象，解析成数组由scrollviewArray接收
      success:function(res){
        //res是服务器返回结果集，包括很多信息。需要使用子级对象将数据从中取出来
        /**
         * 对来自服务端的数据进行组装，为了减轻数据库存储压力，提高传输速度
         * 部分词书共同界面参数，没有存到数据库中
         */
        for(let i = 0;i < res.data.length;i++){
          res.data[i].image = app.globalData.netUrl+"images/" + res.data[i].image;
          res.data[i].fondImgSrc = "../source/image/fondImg.jpg";
          res.data[i].hasFond = false;
          res.data[i].tipSelect = "选择词书";
          res.data[i].bgd = "#ffffff";
        }
        //如果用户已经成功登录，并且用户收藏词书数组不为空，则进行数据重新组合
        if(app.globalData.fondBookArr.length != 0){
          for(let i = 0;i < res.data.length;i++){
            //console.log("i="+i)
              if(app.globalData.fondBookArr.indexOf(res.data[i].id) > -1){
                res.data[i].fondImgSrc = "../source/image/SelectFondImg.jpg",
                res.data[i].hasFond = true,
                res.data[i].tipSelect = "取消选择",
                res.data[i].bgd = "#eb6877"
              }
          }
        }
        that.setData({
          scrollviewArray:res.data    
        })
        
        console.log(that.data.scrollviewArray),
        console.log(typeof(that.data.scrollviewArray[0].id))
      },
      fail:function(res){
        wx.showToast({
          title: '遇到错误' + res.errMsg,
          icon:'none'
        })
      }
    })
    console.log("生命周期函数--监听页面加载完成")
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
    console.log("生命周期函数--监听页面显示") 
    //解决用户先进入词库界面，后登录再次返回词库界面时，不能动态显示数据
    //解决用户在已选词书界面对词书删除后，回到词库界面，不能动态显示数据bug
    //得到此刻词库界面词书等级的所有词书，先初始化为都没有  选择词书
    let tempArray = this.data.scrollviewArray;
    for(let i = 0;i < tempArray.length;i++){
      tempArray[i].fondImgSrc = "../source/image/fondImg.jpg";
      tempArray[i].hasFond = false;
      tempArray[i].tipSelect = "选择词书";
      tempArray[i].bgd = "#ffffff";
    }
    //根据全局变量已选词书数组，对tempArray数组数据重组，动态显示数据
    if(app.globalData.fondBookArr.length != 0){
      for(let i = 0;i < tempArray.length;i++){
        console.log("i="+i)
          if(app.globalData.fondBookArr.indexOf(tempArray[i].id) > -1){
            tempArray[i].fondImgSrc = "../source/image/SelectFondImg.jpg",
            tempArray[i].hasFond = true,
            tempArray[i].tipSelect = "取消选择",
            tempArray[i].bgd = "#eb6877"
          }
      }
    }
    this.setData({
      scrollviewArray:tempArray    
    })
    
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