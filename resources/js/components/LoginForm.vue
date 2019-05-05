<template>
  <form
    class="text-center p-5 col-6 mx-auto"
    @submit.prevent="login"
  >
    <p class="h4 mb-4">ログイン</p>

    <div v-if="loginErrors" class="errors">
      <ul v-if="loginErrors.email">
        <li v-for="msg in loginErrors.email" :key="msg">{{ msg }}</li>
      </ul>
      <ul v-if="loginErrors.password">
        <li v-for="msg in loginErrors.password" :key="msg">{{ msg }}</li>
      </ul>
    </div>

    <input
      type="email"
      id="loginFormEmail"
      class="form-control mb-4"
      placeholder="E-mail"
      v-model="loginForm.email"
    >

    <input
      type="password"
      id="loginFormPassword"
      class="form-control mb-4"
      placeholder="Password"
      v-model="loginForm.password"
    >

    <div class="d-flex justify-content-around">
      <div>
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="defaultLoginFormRemember"
          >
          <label class="custom-control-label" for="defaultLoginFormRemember">ログイン情報を記憶する</label>
        </div>
      </div>

      <div>
        <a href="">パスワードを忘れた場合はこちら</a>
      </div>
    </div>

    <button
      type="submit"
      class="btn btn-info btn-block my-4 text-white"
    >
      ログイン
    </button>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    loginForm: {
      email: '',
      password: ''
    }
  }),
  computed: {
    ...mapState({
      apiStatus: state => state.auth.apiStatus,
      loginErrors: state => state.auth.loginErrorMessages
    })
  },
  methods: {
    async login () {
      // authストアのloginアクション呼び出し
      await this.$store.dispatch('auth/login', this.loginForm)

      if (this.apiStatus) {
        // トップページに遷移
        this.$router.push('/')
      }
    },
    clearError () {
      this.$store.commit('auth/setLoginErrorMessages', null)
    }
  }
}
</script>
