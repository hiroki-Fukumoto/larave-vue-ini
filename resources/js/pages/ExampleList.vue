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
// import { OK } from '../util'
import ListItem from '../components/ListItem.vue'
const api = require('../api')

export default {
  components: {
    ListItem
  },
  data: () => ({
    list: []
  }),
  methods: {
    async load () {
      const response = await api.getIndex('tests')
      // if (response.status !== OK) {
      //   this.$store.commit('error/setCode', response.status)
      //   return false
      // }

      this.list = response
    }
  },
  mounted () {
    this.load()
  }
}
</script>
