//index.js
Page({
  data: {
    msg:'你好，明天',
    userInfo:null
  },
  handleclick(){
    wx.switchTab({
      url: '/pages/list/list'
    })

    // wx.redirectTo({
    //   url: '/pages/list/list',
    // })
  },
  onLoad: function (options) {
    wx.getUserInfo({
      success: (data)=>{
        console.log(data)
        this.setData({
          userInfo: data.userInfo
        })
      }
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
