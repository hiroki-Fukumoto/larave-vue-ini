<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">ID: {{ item.id }}</h4>
        <p class="card-text">{{ item.value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const api = require('../api')

export default {
  data: () => ({
    item: {
      id: '',
      value: ''
    }
  }),
  mixins: [
    // HTTPステータスチェックmixin
    require('../mixins/statusCodeCheck').default
  ],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    async load () {
      const response = await api.getDetail('tests', this.id)

      this.checkGetResponseStatusCode(response.status)

      this.item.id = response.data.id
      this.item.value = response.data.value
    }
  },
  mounted () {
    this.load()
  }
}
</script>
