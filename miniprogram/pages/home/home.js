
import {getUserInfo} from '../../js/user.js'
// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iShidden: false,
    userInfo: []
  },

//点击授权  弹窗提示
  goPages:function(){
      this.setData({ iShidden: true })
  },

  //点击在想想
  onClose:function(){
    getUserInfo()
    this.setData({ iShidden: false })
  },

  //点击授权按钮  
  bindGetUserInfo:function(event){
      var that = this
      // 查询一下用户是否授权
      wx.getSetting({
        success(res) {
          if(res.authSetting['scope.userInfo']){
            //授权了
            // 必须是在用户已经授权的情况下调用
            wx.getUserInfo({
              success: function(res) {
                that.setData({
                  userInfo : res.userInfo,
                  iShidden: false
                })
                wx.login({
                  success (loginres) {
                    if (loginres.code) {
                      //发起网络请求
                      wx.request({
                        url: 'https://www.lingfengzhishang.cn/tp_lsj/public/index.php/api/login/getOpenId/code/'+loginres.code+'/name/'+that.data.userInfo.nickName+'/img/'+that.data.userInfo.avatarUrl,
                        success: function(successres){
                            console.log(successres)
                        }
                      })
                    } else {
                      console.log('登录失败！' + res.errMsg)
                    }
                  }
                })
              }
            })
          }else{
            wx.authorize({
              scope: 'scope.userInfo',
              success: function(res){
                //授权
              }
            })
          }
        }
      })
     
  },

  // getUserInfos:function(){
  //   //登录提示
  //   wx.showLoading({
  //     title: '登陆中...',
  //   })
  //   var that = this
  //   wx.login({
  //     success (res) {
  //       if (res.code) {
  //         //发起网络请求
  //         wx.request({
  //           url: 'https://www.lingfengzhishang.cn/tp_lsj/public/index.php/api/login/getuserinfo/code/'+res.code,
  //           success: function(res){
  //               that.setData({
  //                 userInfo:res.data.data
  //               })
  //               wx.hideLoading( )
  //           }
  //         })
  //       } else {
  //         console.log('登录失败！' + res.errMsg)
  //       }
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfos();
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