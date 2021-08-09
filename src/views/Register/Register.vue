<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去<router-link to="/login">登录</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          type="text"
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1[34578]\d{9}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="code"
          name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ incalid: errors.has('code') }"
        />
        <input
          type="button"
          :value="codeTest"
          style="padding: 5px; width: 80px; background: #4cb9fc; color: #eef8fe"
          @click="getCode"
        />
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="text"
          placeholder="请输入你的登录密码"
          v-model="password"
          name="password"
          v-validate="{ required: true, regex: /^[0-9 A-Z a-z]{6,20}$/ }"
          :class="{ incalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="text"
          placeholder="请输入确认密码"
          v-model="surePassword"
          name="surePassword"
          v-validate="{ required: true, is: password }"
          :class="{ incalid: errors.has('surePassword') }"
        />
        <span class="error-msg">{{ errors.first("surePassword") }}</span>
      </div>
      <div class="content">
        <label>昵 称:</label>
        <input
          type="text"
          placeholder="请输入你的昵称"
          maxlength="10"
          class="input-xfat input-xlarge"
          v-model="nickName"
        />
      </div>
      <div class="controls">
        <input
          name="isCheck"
          type="checkbox"
          v-model="isCheck"
          :class="{ invalid: errors.has('isCheck') }"
          v-validate="{ agree: true }"
        />&nbsp;
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("isCheck") }}</span>
      </div>
      <div class="btn">
        <button @click="goRegister">{{ registerBtn }}</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      password: "",
      surePassword: "",
      code: "",
      nickName: "",
      isCheck: "",
      registerBtn: "马上注册",
      sending: true, //是否发送验证码
      second: 60, //倒计时间
      codeTest: "获取验证码",
    };
  },
  methods: {
    //发送验证码倒计时
    timeDown() {
      let result = setInterval(() => {
        --this.second;
        this.codeTest = this.second;
        if (this.second < 1) {
          clearInterval(result);
          this.sending = true;
          this.second = 60;
          this.codeTest = "获取验证码";
        }
      }, 1000);
    },
    async getCode() {
      if (!this.sending) return;
      if (!/^1[34578]\d{9}$/.test(this.phone)) {
        this.$message.error("手机号码不正确");
        return;
      }
      try {
        this.sending = false;
        await this.$store.dispatch("getCode", this.phone);
        this.code = this.$store.state.user.code;
        this.timeDown();
      } catch (error) {
        clearInterval(result);
        alert(error);
      }
    },
    async goRegister() {
      //点击完成注册首先对所有的表单做整体验证，验证通过返回true，没通过返回false
      const success = await this.$validator.validateAll();
      if (success) {
        if (this.registerBtn == "正在提交...") {
          this.$message.error("重复提交");
          return;
        }
        try {
          let {code,nickName,password,phone}=this
          this.registerBtn = "正在提交...";
          await this.$store.dispatch("register", {
            code: code,
            nickName: nickName,
            password: password,
            phone: phone,
          });
          alert("注册成功");
          this.$router.push("/login");
        } catch (error) {
          this.registerBtn = "马上注册";
          alert(error);
        }
      } else {
        this.$message.error("输入不允许有空项");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>