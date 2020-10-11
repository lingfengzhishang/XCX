// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainActiveIndex:0,
    activeId: null,
    items:[]
  },

  onClickNav(e) {
    this.setData({
      mainActiveIndex: e.detail.index || 0,
    });
    var id = this.data.items[e.detail.index]['id']
    var that = this
    wx.request({
      url: 'https://www.lingfengzhishang.cn/tp_lsj/public/index.php/api/goodCate/getGoodCatePid/id/'+id,
      success:function(res){
        if (res.data.data) {
          wx.navigateTo({
            url:'/pages/goods/goods?cate_id='+id,
          })
        }
      }
    })
  },

  onClickItem(e) {
    this.setData({ 
     activeId : e.detail.id
     });
     wx.navigateTo({
      url: '/pages/goods/goods?cate_id='+e.detail.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getgoodcate()
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

  },
  getgoodcate:function(){
    var that = this
      wx.request({
        url: 'https://www.lingfengzhishang.cn/tp_lsj/public/index.php/api/goodCate/getgoodcate',
        success:function (res){
          that.setData({
            items:res.data.data
          })
        }
      })
    }
  }
)