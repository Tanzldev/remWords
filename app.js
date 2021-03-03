//app.js
App({
  globalData: {
    userInfo:null,
    netUrl: 'http://localhost/remWords/',       
    firstLogin:1,           //用户是否是第一次登录，若第一次登录则向服务器发送用户基本信息
    fondBookArray:[         //用户收藏图书数组
      {
        id:2,
        bookImg:"../source/image/booksImg/lianci.jpg",
        bookName:"2020恋恋有词",
        publisher:"高教社出版",
        wordsCount:1024  
      }
    ]        
  }
})