<template>
  <form
    class="text-center p-5 col-6 mx-auto"
    @submit.prevent="register"
  >
      <p class="h4 mb-4">新規登録</p>

      <div v-if="registerErrors" class="text-danger text-left">
        <ul v-if="registerErrors.name">
          <li v-for="msg in registerErrors.name" :key="msg">{{ msg }}</li>
        </ul>
        <ul v-if="registerErrors.email">
          <li v-for="msg in registerErrors.email" :key="msg">{{ msg }}</li>
        </ul>
        <ul v-if="registerErrors.password">
          <li v-for="msg in registerErrors.password" :key="msg">{{ msg }}</li>
        </ul>
      </div>

      <div class="form-row mb-4">
          <div class="col">
            <input
              type="text"
              id="registerFormName"
              class="form-control"
              placeholder="名前"
              v-model="registerForm.name"
            >
          </div>
      </div>

      <input
        type="email"
        id="registerFormEmail"
        class="form-control mb-4"
        placeholder="メールアドレス"
        v-model="registerForm.email"
      >

      <input
        type="password"
        id="registerFormPassword"
        class="form-control mb-4"
        placeholder="パスワード"
        aria-describedby="defaultRegisterFormPasswordHelpBlock"
        v-model="registerForm.password"
      >

      <input
        type="password"
        id="registerFormPasswordConfirm"
        class="form-control"
        placeholder="パスワード確認"
        aria-describedby="defaultRegisterFormPasswordHelpBlock"
        v-model="registerForm.password_confirmation"
      >

      <button
        type="submit"
        class="btn btn-info my-4 btn-block text-white"
      >
        新規登録
      </button>

  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    ...mapState({
      apiStatus: state => state.auth.apiStatus,
      registerErrors: state => state.auth.registerErrorMessages
    })
  },
  methods: {
    async register () {
      // authストアのresigterアクションを呼び出す
      await this.$store.dispatch('auth/register', this.registerForm)

      if (this.apiStatus) {
        // トップページに移動する
        this.$router.push('/')
      }
    },
    clearError () {
      this.$store.commit('auth/setLoginErrorMessages', null)
      this.$store.commit('auth/setRegisterErrorMessages', null)
    }
  },
  created () {
    this.clearError()
  }
}
</script>
