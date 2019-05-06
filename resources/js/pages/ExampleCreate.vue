<template>
  <div>
    <div class="card pmd-card">
      <div class="card-body">
        <form
          class="text-center p-5 col-6 mx-auto"
          @submit.prevent="onCreate"
        >
          <p class="h4 mb-4">新規登録</p>

          <div v-if="errors" class="text-danger text-left">
            <ul>
              <li v-for="msg in errors" :key="msg">{{ msg }}</li>
            </ul>
          </div>

          <input
            type="text"
            id="createFormValue"
            class="form-control mb-4"
            name="value"
            placeholder="Value"
            v-model="createForm.value"
          >

          <button
            type="submit"
            class="btn btn-info btn-block my-4 text-white"
          >
            登録
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  mixins: [
    // HTTPステータスチェックmixin
    require('../mixins/statusCodeCheck').default,
    // ローダーmixin
    require('../mixins/loader').default
  ],
  data: () => ({
    createForm: {
      value: ''
    },
    errors: []
  }),
  methods: {
    /**
     * 登録処理
     */
    async onCreate () {
      this.showLoader()

      try {
        // APIに渡すデータ
        let apiParams = {}
        apiParams = {
          value: this.createForm.value
        }
        const response = await axios.post('/api/tests', apiParams)
        const success = this.checkStatusCode201(response.status)

        if (success) {
          // トップページに遷移
          this.$router.push('/')
        } else {
          this.errors = response.data.errors.value
        }
      } catch (e) {
        alert('NG')
      } finally {
        this.hideLoader()
      }
    },
    clearError () {
      this.errors = null
    }
  },
  created () {
    this.clearError()
  }
}
</script>
