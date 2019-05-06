<template>
  <div>
    <div class="text-right">
      <RouterLink
        class="btn btn-success"
        to="/new"
      >
        Add
      </RouterLink>
    </div>
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
import axios from 'axios'

export default {
  components: {
    ListItem
  },
  mixins: [
    // HTTPステータスチェックmixin
    require('../mixins/statusCodeCheck').default,
    // ローダーmixin
    require('../mixins/loader').default
  ],
  data: () => ({
    list: []
  }),
  methods: {
    async load () {
      this.showLoader()

      try {
        const response = await axios.get('/api/tests')
        const success = this.checkStatusCode200(response.status)

        if (success) {
          this.list = response.data
        }
      } catch (e) {
        alert('データを読み込めませんでした。')
      } finally {
        this.hideLoader()
      }
    }
  },
  mounted () {
    this.load()
  }
}
</script>
