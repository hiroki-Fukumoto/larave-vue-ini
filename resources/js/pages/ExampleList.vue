<template>
  <div>
    <ListItem
      v-for="item in list"
      :key="item.id"
      :item-id="item.id"
      :item-value="item.value"
    />
  </div>
</template>

<script>
import ListItem from '../components/ListItem.vue'
const api = require('../api')

export default {
  components: {
    ListItem
  },
  mixins: [
    // HTTPステータスチェックmixin
    require('../mixins/statusCodeCheck').default
  ],
  data: () => ({
    list: []
  }),
  methods: {
    async load () {
      const response = await api.getIndex('tests')

      this.checkGetResponseStatusCode(response.status)

      this.list = response.data
    }
  },
  mounted () {
    this.load()
  }
}
</script>
