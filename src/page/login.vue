<template>
  <div class="loginPanel">
    <div class="logoWrapper">
      <img src="../assets/logo.png" />
    </div>
    <div class="container">
      <div class="loginContainer clearfix">
        <div class="loginIcon">
          <img src="../assets/login_img.png" />
        </div>
        <div class="loginForm">
          <img src="../assets/login_title.png" class="loginTitle" />
          <div class="loginContent">
            <ul>
              <li class="username">
                <label></label>
                <input type="text" placeholder="用户名" v-model="username" />
              </li>
              <li class="pwd">
                <label></label>
                <input type="password" placeholder="密码" v-model="password" />
              </li>
              <li class="code">
                <label></label>
                <input type="text" placeholder="验证码" />
              </li>
            </ul>
            <div class="loginOption">
              <label>
                <input type="checkbox" />
                保存密码
              </label>
              <a @click="login()">登录</a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
          <div>首次登录即注册</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background-color:rgb(28, 119, 172);')
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style');
  },
  methods: {
    login() {
      let that = this;
      let data = {
        username: this.username,
        password: this.password
      };

      axios({
        method: "post",
        url: "/api/index.php/admin/UserInfo/login",
        data: qs.stringify(data)
      })
        .then(function(response) {
          console.log(response);
          if(response.data.response=='success'){
            that.$message({
              message: response.data.result,
              type: "success"
            });
            setTimeout(function(){
              that.$router.push({name:'UserList'});
            },1000);
          }else{
            that.$message({
              message: response.data.result,
              type: "error"
            });
          }
          
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
input {
  border: none;
  outline: none;
}
.loginPanel {
  width: 850px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .logoWrapper {
    text-align: center;
  }
  .container {
    background-color: #fff;
    &:after{
            display: block;
            content: "";
            height: 10px;
            margin-top: 1px;
            background-color: #1c77ac;
            background-size: 10px 20px;
            background-image: linear-gradient(
                45deg,
              #fff 25%,
                transparent 25%,
                transparent
            ),
            linear-gradient(-45deg, #fff 25%, transparent 25%, transparent),
            linear-gradient(45deg, transparent 75%, #fff 75%),
            linear-gradient(-45deg, transparent 75%, #fff 75%);
        }
    .loginContainer {
      .loginIcon {
        float: left;
        margin-left: 20px;
      }
      .loginForm {
        float: left;
        width: 300px;
        margin-left: 80px;
        .loginTitle {
          margin: 10px 0;
        }
        .loginContent {
          ul {
            li {
              width: 100%;
              height: 40px;
              line-height: 40px;
              border: 1px solid #ddd;
              margin-bottom: 10px;
              label {
                width: 35px;
                height: 35px;
                display: inline-block;
                vertical-align: middle;
                border-right: 1px solid #ddd;
              }
              input {
                vertical-align: middle;
                width: 200px;
                height: 35px;
                padding: 0 5px;
              }
            }
          }
          li.username {
            label {
              background: url(../assets/avatar.png) center no-repeat;
              background-size: 70%;
            }
          }
          li.pwd {
            label {
              background: url(../assets/pwd.png) center no-repeat;
              background-size: 70%;
            }
          }
          li.code {
            label {
              background: url(../assets/code.png) center no-repeat;
              background-size: 70%;
            }
          }
          .loginOption {
            color: #888;
            font-size: 14px;
            label {
              position: relative;
              padding-left: 20px;
              input {
                width: 15px;
                height: 15px;
                position: absolute;
                left: 0;
                top: 0;
                border: 1px solid #ddd;
                -webkit-appearance: none;
              }

              input:checked::before {
                content: "\2713";
                background-color: #fff;
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
                border: 1px solid #2e6eba;
                color: #2e6eba;
                font-size: 12px;
                font-weight: bold;
              }
            }
            a {
              width: 100px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              background-color: #2e6eba;
              color: #fff;
              float: right;
              cursor: pointer;
            }
          }
        }
      }
    }
    .footer{
        position: relative;
        div{
            border-top: 1px solid #a6c4db;
            line-height: 46px;
            text-align: center;
            color: #888888;
            font-size: 12px;
        }
        &:after{
            content: "❤❤❤❤❤❤❤❤";
            color: #1c77ac;
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
  }

  
}
</style>