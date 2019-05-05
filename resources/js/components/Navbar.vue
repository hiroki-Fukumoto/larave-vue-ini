<template>
  <!--Navbar -->
  <nav class="mb-1 navbar navbar-expand-lg navbar-dark blue">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
      aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent-333">
      <ul
        class="navbar-nav mr-auto"
        v-if="isLogin"
      >
        <li class="nav-item active">
          <a class="nav-link" href="#">Home
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
      </ul>
      <ul
        class="navbar-nav ml-auto"
        v-if="isLogin"
      >
        <li class="nav-item">
          <p class="text-white">{{ username }}</p>
        </li>
        <li class="nav-item">
          <button
            class="btn btn-outline-white btn-md my-2 my-sm-0 ml-3"
            @click="logout"
          >
            Logout
          </button>
        </li>
      </ul>
      <ul
        class="navbar-nav ml-auto nav-flex-icons"
        v-else
      >
        <li class="nav-item">
          <RouterLink class="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" to="/login">
            Login / Register
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  <!--/.Navbar -->
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      apiStatus: state => state.auth.apiStatus
    }),
    ...mapGetters({
      isLogin: 'auth/check'
    }),
    isLogin () {
      return this.$store.getters['auth/check']
    },
    username () {
      return this.$store.getters['auth/username']
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')

      if (this.apiStatus) {
        this.$router.push('/login')
      }
    }
  }
}
</script>
