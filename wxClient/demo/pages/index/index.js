//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  
  onLoad: function () {
  },
  // 跳转四级联动页
  goFourLinkage: function() {
    wx.navigateTo({
      url: '/pages/fourLinkage/fourLinkage',
    })
  }
})
