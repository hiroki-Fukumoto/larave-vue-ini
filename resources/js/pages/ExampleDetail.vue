<template>
  <div>
    <div class="text-right">
      <div v-if="isEditing">
        <button
          v-if="isEditing"
          class="btn btn-light"
          @click="onCancel"
        >
          Cancel
        </button>
        <button
          class="btn btn-danger"
          @click="onDelete"
        >
          Delete
        </button>
      </div>
      <button
        v-else
        class="btn btn-success"
        @click="onEdit"
      >
        Edit
      </button>
    </div>

    <div class="card pmd-card">
      <div class="card-body">
        <form
          class="p-5 col-6 mx-auto"
          @submit.prevent="onUpdate"
        >
          <p class="h4 mb-4">ID: {{ id }}</p>

          <div v-if="errors" class="text-danger text-left">
            <ul>
              <li v-for="msg in errors" :key="msg">{{ msg }}</li>
            </ul>
          </div>

          <label for="editFormValue">Value</label>
          <input
            type="text"
            id="editFormValue"
            class="form-control"
            name="value"
            placeholder="Value"
            :disabled="!isEditing"
            v-model="editForm.value"
          >

          <button
            v-if="isEditing"
            type="submit"
            class="btn btn-info btn-block my-4 text-white"
          >
            更新
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
    editForm: {
      value: ''
    },
    isEditing: false,
    errors: []
  }),
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    async load () {
      this.showLoader()

      try {
        const response = await axios.get(`/api/tests/${this.id}`)
        const success = this.checkStatusCode200(response.status)

        if (success) {
          this.editForm.id = response.data.id
          this.editForm.value = response.data.value
        }
      } catch (e) {
        alert('データを読み込めませんでした。')
      } finally {
        this.hideLoader()
      }
    },
    onEdit () {
      this.isEditing = true
    },
    async onUpdate () {
      this.showLoader()

      try {
        // APIに渡すデータ
        let apiParams = {}
        apiParams = {
          value: this.editForm.value
        }
        const response = await axios.patch('/api/tests/' + this.id, apiParams)
        const success = this.checkStatusCode200(response.status)

        if (success) {
          this.isEditing = false
        } else {
          this.errors = response.data.errors.value
        }
      } catch (e) {
        alert('NG')
      } finally {
        this.hideLoader()
      }
    },
    async onDelete () {
      this.showLoader()

      try {
        const response = await axios.delete('/api/tests/' + this.id)
        const success = this.checkStatusCode200(response.status)

        if (success) {
          // トップページに遷移
          this.$router.push('/')
        }
      } catch (e) {
        alert('NG')
      } finally {
        this.hideLoader()
      }
    },
    onCancel () {
      this.isEditing = false
      this.load()
    },
    clearError () {
      this.errors = null
    }
  },
  mounted () {
    this.load()
  },
  created () {
    this.clearError()
  }
}
</script>
