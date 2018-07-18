// pages/detail/detail.js
let datas = require('../../datas/list-data')
let appDatas = getApp()
console.log(appDatas);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollected:false,// 标识用户是否收藏文章
    isMusicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('detail页面接收的数据：' , options);
    let index = options.id;
    let detailObj = datas.list_data[index];
    // 更新data中的数据
    this.setData({
      index,detailObj
    })
    // 读取本地缓存的是否收藏的数据
    wx.getStorage({
      key:'isCollected',
      success:(event)=>{
        console.log('页面初始化的时候获取的数据： ', event);
        let isCollected = event.data[index] ?event.data[index] :false
          // 更新data中isCollected的状态值
        this.setData({
          isCollected
        })

      }
    })
    // 读取app中的数据判断当前页面的音乐是否播放
    if(appDatas.data.isPlay && appDatas.data.pageIndex===index){
      this.setData({
        isMusicPlay:true
      })
    }

    //监听音乐播放和暂停
    wx.onBackgroundAudioPlay(()=>{
      console.log('音乐播放');
      this.setData({
        isMusicPlay:true
      })
      // 更新app中的数据
      appDatas.data.pageIndex=index;
      appDatas.data.isPlay=true

    })

    wx.onBackgroundAudioPause(()=>{
      console.log("音乐暂停");
      this.setData({
        isMusicPlay:false
      })
      // 更新app中的数据
      appDatas.data.pageIndex = index;
      appDatas.data.isPlay = false;
    })
  },
  handleShare(){
    wx.showActionSheet({
      itemList:[
        '分享到朋友圈','分享给微信好友','分享到QQ好友'
      ]
    })
  },
  handleCollection(){
    // 处理收藏文章的方法
    // 修改 isCollected的状态值
    let isCollected=!this.data.isCollected
    this.setData({
      isCollected
    })
    // 设置对应的提示框
    let title=isCollected?'收藏成功' : '取消收藏';
    wx.showToast({
      title,
      icon:'success'
    })
    // 缓存当前的状态值到本地
    // 准备工作： 集成一个对象
    // let obj = {'0': true, '1': false};
    let obj=wx.getStorageSync('isCollected')
    console.log(obj);
    if(!obj){
      obj={}
    }
    let index=this.data.index
    obj[index]=isCollected
    wx.setStorageSync('isCollected',obj)
  },
  handleMusicPlay(){
    let isMusicPlay=!this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    });
    // 控制音乐的播放
    let {dataUrl,title}=this.data.detailObj.music
    if(isMusicPlay){
      wx.playBackgroundAudio({
        dataUrl,title
      })

    }else{
      wx.pauseBackgroundAudio()
    }
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