// pages/fourLinkage/fourLinkage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',

    multiArray: [],
    multiIndex: [0, 0, 0, 0],
    chinaData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSiteData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 三级联动
  bindRegionChange: function(e) {
    var value = e.detail.value;
    this.setData({
      region: value
    })
  },
  /*
    四级联动代码
  */
  bindMultiPickerChange: function (e) { //  确认更改
    console.log(e);
  },
  bindMultiPickerColumnChange: function (e) { //  列表滑动
    var move = e.detail;
    var index = move.column;
    var value = move.value;
    if (index == 0) {
      this.setData({
        multiIndex: [value, 0, 0, 0]
      })
      this.getCity();
    }
    if (index == 1) {
      this.setData({
        "multiIndex[1]": value,
        "multiIndex[2]": 0,
        "multiIndex[3]": 0
      })
      this.getXian();
    }
    if (index == 2) {
      this.setData({
        "multiIndex[2]": value,
        "multiIndex[3]": 0,

      })
      this.getZhen();
    }
    if (index == 3) {
      this.setData({
        "multiIndex[3]": value
      })
      this.getZhen();
    }
  },
  getSiteData: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:3000/index.php',
      success: res => {
        console.log(res);
        var chinaData = res.data;
        this.data.chinaData = chinaData;
        var sheng = []; //  设置省数组
        for (var i = 0; i < chinaData.length; i++) {
          sheng.push(chinaData[i].name);
        }
        this.setData({
          "multiArray[0]": sheng
        })
        that.getCity(); // 得到市
      }
    })
  },
  getCity: function () { //  得到市
    var shengNum = this.data.multiIndex[0];
    var chinaData = this.data.chinaData;
    var cityData = chinaData[shengNum].children;
    var city = [];
    for (var i = 0; i < cityData.length; i++) {
      city.push(cityData[i].name)
    }
    this.setData({
      "multiArray[1]": city
    })
    this.getXian();
  },
  getXian: function (e) { //  得到县
    var shengNum = this.data.multiIndex[0];
    var cityNum = this.data.multiIndex[1];
    var chinaData = this.data.chinaData;
    var xianData = chinaData[shengNum].children[cityNum].children;
    var xian = [];
    for (var i = 0; i < xianData.length; i++) {
      xian.push(xianData[i].name)
    }
    this.setData({
      "multiArray[2]": xian
    })
    this.getZhen();
  },
  getZhen: function () { //  得到镇
    var shengNum = this.data.multiIndex[0];
    var cityNum = this.data.multiIndex[1];
    var xianNum = this.data.multiIndex[2];
    var chinaData = this.data.chinaData;
    var zhenData = chinaData[shengNum].children[cityNum].children[xianNum].children;
    var zhen = [];
    for (var i = 0; i < zhenData.length; i++) {
      zhen.push(zhenData[i].name)
    }
    this.setData({
      "multiArray[3]": zhen
    })
  },
})