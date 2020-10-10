// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "adImg":[],
    "goodNew":[],
    "goodHot":[],
    "goodRecommend":[],
    "goods":[],
    showloding: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    this.getAd()
    this.getNew()
    this.getHot()
    this.getRecommend()
    this.getList()
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
    if(this.data.showloding){
      this.getList()
    }else{
      wx.showToast({
        title: '暂无数据',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getAd: function(){
    var that = this
    wx.request({
      url: 'https://www.lingfengzhishang.cn/tp_lsj/public/index.php/api/ad/getad',
      success: function(res){
        that.setData({
          adImg:res.data.data
        })
      }
    })
  },
  getGoodsCate: function(id){
    var that = this
    wx.request({
      url: 'https://www.lingfengzhishang.cn/tp_lsj/public/index.php/api/ad/getGoodsCate/id/'+id,
      success: function(res){
        switch (id) {
          case 1:
            that.setData({
              goodRecommend:res.data.data
            })
              break;
          case 2:
            that.setData({
              goodNew:res.data.data
            })
              break;
          case 3:
            that.setData({
              goodHot:res.data.data
            })
              break;
        }
      }
    })
  },
  getList: function(){
    var that = this

    wx.showLoading({
      title: '加载中...',
    })

    wx.request({
      url: 'https://www.lingfengzhishang.cn/tp_lsj/public/index.php/api/ad/getList/page/'+ that.data.goods.length,
      success: function(res){ 
        if(res.data.data.length == 0){
          that.setData({
            showloding : false
          })
        }else{
          that.setData({
            goods: that.data.goods.concat(res.data.data)
          })
        }
  
        wx.hideLoading()
      }
    })
  },
  getNew:function(){
    this.getGoodsCate(2)
  },
  getHot:function(){
    this.getGoodsCate(3)
  },
  getRecommend:function(){
    this.getGoodsCate(1)
  }
})