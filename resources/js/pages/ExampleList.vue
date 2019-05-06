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
    <Pagination :current-page="currentPage" :last-page="lastPage" />
  </div>
</template>

<script>
import ListItem from '../components/ListItem.vue'
import Pagination from '../components/Pagination.vue'
import axios from 'axios'

export default {
  components: {
    ListItem,
    Pagination
  },
  mixins: [
    // HTTPステータスチェックmixin
    require('../mixins/statusCodeCheck').default,
    // ローダーmixin
    require('../mixins/loader').default
  ],
  props: {
    page: {
      type: Number,
      required: false,
      default: 1
    }
  },
  data: () => ({
    list: [],
    currentPage: 0,
    lastPage: 0
  }),
  methods: {
    async load () {
      this.showLoader()

      try {
        const response = await axios.get(`/api/tests/?page=${this.page}`)
        const success = this.checkStatusCode200(response.status)

        if (success) {
          this.list = response.data.data
          this.currentPage = response.data.current_page
          this.lastPage = response.data.last_page
        }
      } catch (e) {
        alert('データを読み込めませんでした。')
      } finally {
        this.hideLoader()
      }
    }
  },
  watch: {
    $route: {
      async handler () {
        await this.load()
      },
      immediate: true
    }
  }
}
</script>
