// pages/feedback/feedback.js
var app = getApp()
var Bmob = require("../../dist/Bmob.js");
Bmob.initialize('13108f5551c1077933f78b9b2dec112c', '31a080731df6c05615e616a058fa729d');
var common = require('../../utils/getCode.js')
var that;
Page({
  data:{
    name:'',
    phone:'',
    qq:'',
    time:'',
    content:''
  },
  setName:function(e){
    this.data.name = e.detail.value;
  },
  setPhone:function(e){
    this.data.phone = e.detail.value;
  },
  setQQ:function(e){
    this.data.qq = e.detail.value;
  },
  setTime:function(e){
    this.data.time = e.detail.time;
  },
  setContent:function(e){
    this.data.content = e.detail.content;
  },

  onLoad:function(options){
    that = this;
    that.setData({//初始化数据
      src: "",
      isSrc: false,
      ishide: "0",
      autoFocus: true,
      isLoading: false,
      loading: true,
      isdisabled: false
    })
  },
  onReady:function(){
    wx.hideToast()
  },
  onShow:function(){
    var myInterval = setInterval(getReturn, 500);
    function getReturn() {
      wx.getStorage({
        key: 'user_openid',
        success: function (ress) {
          if (ress.data) {
            clearInterval(myInterval)
            that.setData({
              loading: true
            })
          }
        }
      })
    }
  },
  uploadPic:function(){
    wx.chooseImage({
      count:1,//默认为9
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          isSrc:true,
          src:tempFilePaths
        })
      },
    })
  },
  clearPic:function(){//删除图片
    that.setData({
      isSrc:false,
      src:""
    })
  },
  feedBack:function(){
    var Feedback = Bmob.Object.extend("feedback");
    var feedback = new Feedback();
    if (that.data.name == "" || that.data.phone == "" || that.data.content == "") {
      common.dataLoading("请按规范填写", "loading");
    } else {
      var Feedback = Bmob.Object.extend("feedback");
      var feedback = new Feedback();
      feedback.set("name", that.data.name);
      feedback.set("phone", that.data.phone);
      feedback.set("qq", that.data.qq);
      feedback.set("time", that.data.time);
      feedback.set("content", that.data.content);
      if (that.data.isSrc == true) {
        var picName = that.data.src;
        var file = new Bmob.File(name, that.data.src);
        file.save;
        feedback.set("pic", file);
      }
      feedback.save(null, {
        success: function (result) {
          wx.navigateBack({
            
          })
          console.log(result);
        },
        error: function (object, error) {
          console.log(error);
        }
      });
    }
  },
  onPullDownRefresh:function(){
    wx.stopPullDownRefresh()
  }
})