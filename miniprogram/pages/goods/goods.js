// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodCateName:[],
    activeKey: 0,
    cateListType:true,
    goods:[],
    showloding:true,
    cate_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCateList(options.cate_id)
    this.getGoodsList(options.cate_id)
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
      var cate_id = this.data.cate_id
      this.getGoodsList(cate_id)
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
  getCateList: function(cate_id){
    var that = this

    wx.showLoading({
      title: '加载中...',
    })

      wx.request({
        url: 'https://www.lingfengzhishang.cn/tp_lsj/public/index.php/api/goodCate/goodsCateList',
        success:function(res){
          for(var i=0; i<res.data.data.length; i++){
            if(res.data.data[i].id == cate_id){
              that.setData({
                activeKey: i
              })
              break
            }
          }
          that.setData({
            goodCateName: res.data.data
          })
          wx.hideLoading()
        }
      })
  },
  onChange: function(event){
    var id = this.data.goodCateName[event.detail].id
    this.setData({
      goods: []
    })
    this.getGoodsList(id)
    this.goTop()
  },
   //商品
   getGoodsList: function(cate_id){
    var that = this
    wx.request({
      url: 'https://www.lingfengzhishang.cn/tp_lsj/public/index.php/api/goods/goodsList/page/'+that.data.goods.length+'/cate_id/'+cate_id,
      success: function(res){
        if(res.data.data.length == 0){
          that.setData({
            showloding : false
          })
        }else{
          that.setData({
            goods: that.data.goods.concat(res.data.data),
            showloding : true
          })
        }

        if(res.data.data.length  ||  that.data.goods.length){
          that.setData({
            cateListType : true
          })
        }else{
          that.setData({
            cateListType : false,
            showloding : true
          })
        }

        that.setData({
          cate_id: cate_id,
        })
      }
    })
  },
  goTop: function (e) { // 一键回到顶部
    if (wx.pageScrollTo) {
     wx.pageScrollTo({
      scrollTop: 0
     })
    } else {
     wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
     })
    }
   },
})