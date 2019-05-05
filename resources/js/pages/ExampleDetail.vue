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
      id: null,
      value: ''
    }
  }),
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    async load () {
      const item = await api.getDetail('tests', this.id)
      this.item.id = item.id
      this.item.value = item.value
    }
  },
  mounted () {
    this.load()
  }
}
</script>
