<template>
  <div class="body">
    <div class="bodyBox">
      <p class="headerName">科瑞杰云平台</p>
      <div class="wrapBox">
        <div class="box">
      		<form :model="form" autocomplete="off" v-show="flag">
            <p>
              <img src="../assets/user.png" alt="">
              <input type="text" v-model="form.username" @keyup="show()" @keyup.enter="onSubmit" placeholder="请输入用户名" name="username" class="name" required="required" />
            </p>
            <p>
              <img src="../assets/pass.png" alt="">
              <input type="text" v-model="form.password" @keyup="show()" @keyup.enter="onSubmit" onfocus="this.type='password'" autocomplete="off" placeholder="请输入密码" name="password" class="password" required="required" />
            </p>
            <p>
              <span @click="help" class="help">帮助中心</span>
              <button @click="onSubmit" v-if="loginTag" type="button" class="login_button">登&nbsp;&nbsp;录</button>
              <button @click="onSubmit" v-else="loginTag" type="button" class="wraplogin login_button">登&nbsp;&nbsp;录</button>
            </p>
          </form>
          <div v-show="helpBox" class="helpBox">
            <p>如需要帮助，请致电 <span>010-81133843</span> </p>
            <p>或者发送问题到 <span>service@krjrobot.com</span> </p>
            <p>技术人员会24小时内与您联系。</p>
            <p @click="userLogin" class="userLogin"> <span>已有账号</span>&nbsp;马上登录 </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
import $ from 'jquery'
import {saveUserInfo} from '@/assets/js/auth'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      helpBox:false,
      flag:true,
      loginTag:true,
    }
  },
  methods: {
    async onSubmit () {
      // console.log(this.form.username);
      if (this.form.username=='' || this.form.password =='') {
        this.$message({
          message: '请输入用户名或密码',
          type: 'error'
        })
      } else {
        // 将对象序列化成URL的形式，以&进行拼接
        const form = Qs.stringify(this.form)
        const res = await this.$http.post('/signIn', form, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log('登录页面跳转')
        const data = res.data

        if (data.status === '200') {
          saveUserInfo(data.msg)

          var storage=window.localStorage;
          storage.access=data.data.access;
          storage.username=data.data.username;

          localStorage.setItem('sysType',JSON.stringify(data.data.sysType));
          localStorage.setItem('prosItem',JSON.stringify(data.data.pros));

          const {redirect} = this.$route.query
          // console.log(data.data.sysType[0].route);
          // 如果查询字符串中有redirect字段，则直接跳转到这里
          var str = data.data.sysType[0].route;
          str=str.slice(1)

          if (redirect) {
            this.$router.push(redirect.substr(1))
          } else {
            if (localStorage.access == 1 || localStorage.access == 2) {
              this.$router.push({
                name: str
              })
            } else {
              this.$router.push({
                name: str
              })
            }
          }
        } else if (data.status === '500') {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          // console.log(data);
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      }
    },
    show:function(){
      if (this.form.username != '' && this.form.password != '') {
        this.loginTag = false;
      } else {
        this.loginTag = true;
      }
    },
    help : function () {
      this.flag = false;
      this.helpBox = true;
    },
    userLogin : function () {
      this.flag = true;
      this.helpBox = false;
    }
  }
}
</script>
<style>
html,body{
  height: 100%;
}
.body{
  height: 100%;
  background-image: url('../assets/timg.jpg')!important;
  background-size: 100% 100%;
}
.bodyBox{
  height: 100%;
  background: rgba(0,0,0,.8);
  padding-top: 0.1px;
}
.wrapBox{
  width: 483px;
  height: 271px;
  position: absolute;
  top: 32%;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);
  background-image: url('../assets/border.png');
}
.box{
    width: 472px;
    height: 258px;
    position: absolute;
    top: 3%;
    transform: translateY(-50%);
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    /* background-color: rgba(0,0,0,.25); */
    /* background-color: rgba(255,255,255,.15); */
    background-image: url('../assets/login.png');
    /* padding: 45px 72px; */
    background-repeat: no-repeat;
    /* border-radius: 15px; */
}
.headerName{
  width:160px;
  height:40px;
  font-size:26px;
  font-family:SourceHanSansCN-Normal;
  font-weight: bold;
  color:rgba(19,70,246,1);
  background:linear-gradient(-1deg,rgba(66,187,255,1) 0%, rgba(205,236,254,1) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  margin: 0 auto;
  position: relative;
  top: 20%;
}
.box form{
  width: 338px;
  margin: 0 auto;
  padding-top: 45px;
}
.box form p{
  margin-bottom: 20px;
  position: relative;
}
.box form p .help{
  float: right;
  margin-top: -16px;
  opacity: 0.4;
  margin-right: 4px;
  cursor:pointer;
}
.box form p img{
  position: absolute;
  top: 11px;
  left: 26px;
}
.box form p input{
  padding-left: 60px;
  border: none;
  width:338px;
  height:46px;
  background:transparent;
  background-image: url('../assets/inputBg.png');
  background-size: 100% 100%;
  opacity: 0.9;
  box-sizing: border-box;
  color: #fff;
}
/* centered columns styles */
.row-centered {
    text-align:center;
}
.col-centered {
    display:inline-block;
    float:none;
    text-align:left;
    margin-right:-4px;
}
input {
    /* margin-top: 20px; */
    border-radius: 5px;
    outline: none;
    padding-left: 5px;
    /* color: #333; */
}
.login {
    width: 240px;
    background-color: rgba(255,255,255,.15);
    position: relative;
    top: 20px;
    padding: 10px 20px;
    border-radius: 6px;
    text-align: center;
}
.login_button {
    width: 100%;
    height: 47px;
    background-image: url('../assets/innerlogin.png');
    background-size: 100% 100%;
    background-color: transparent;
    border: none;
    color: #fff;
    margin-top: 5px;
    opacity: 0.8;
    outline: none;
    cursor: pointer;
}
.wraplogin{
  width: 100%;
  height: 47px;
  background-image: url('../assets/wraplogin.png');
  background-size: 100% 100%;
  background-color: transparent;
  border: none;
  color: #fff;
  margin-top: 5px;
  opacity: 0.8;
  outline: none;
  cursor: pointer;
}
.helpBox{
  padding-top: 64px;
  margin: 0 auto;
  width: 255px;
  font-size: 14px;
  color: #C5E3FD;
  text-align: center;
}
.helpBox p span{
  color: #FEFFFF;
  cursor: pointer;
}
.helpBox .userLogin{
  margin-top: 45px;
  cursor: pointer;
}
</style>
