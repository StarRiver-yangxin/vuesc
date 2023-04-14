<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h4 class="title">Vue-Shop</h4>
        <p class="title-text">vue-shop 专为vue提供商城后台模板</p>
      </div>
      <!-- el-form-item 表单项组件 -->
      <!-- prop 校验的字段名 -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <!-- 显示密码按钮 -->
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- native 原生时间  prevent 阻止默认行为-->
      <!-- 重置 -->
      <!-- <el-button
        type="info"
        style="width:15%;margin-left:15px;margin-bottom:30px;float: right;"
        @click="$refs.loginForm.resetFields()"
      >重置</el-button> -->
      <!-- 登录 -->
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;
         margin-bottom:30px;
         "
        @click.native.prevent="handleLogin"
      >登录</el-button>

    </el-form>
  </div>
</template>

<script>
// import { setToken } from '../../utils/auth'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // 显示密码
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      // 等待密码框类型设置完毕后 再设置密码框获取焦点
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 1 进行表单校验 validate校验方法 => true 校验成功 false 校验失败
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        // 2 判断校验是否成功
        if (valid) {
          // 3 开启按钮加载状态
          this.loading = true
          const { username, password } = this.loginForm
          // 4 派发action 进行登录
          await this.$store.dispatch('user/login', { username: username, password: password })
          this.$router.push('/')
          this.$message.success('登录成功')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // this.$router.push({ path: this.redirect || '/' })
      //       this.$message.success('登录成功')
      //       //   6 关闭按钮
      //       this.loading = false
      //     }).catch(() => {
      //       //   7登录失败关闭按钮
      //       this.loading = false
      //     })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#fff;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: black;
      height: 47px;
      // caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        // -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #ccc;
    // background: #FFF;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#fff;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  background-image: url(http://it.zeng.pub/vshop/static/img/antd.5825f033.svg);
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    // color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    text-align: center;
    margin: 0 0 40px;
    .title {
      font-size: 30px;
      color: black;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
    }
    .title-text {
      color: #c0c4cc;
      font-size: 14px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
