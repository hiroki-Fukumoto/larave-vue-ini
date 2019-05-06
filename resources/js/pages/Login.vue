<template>
  <div class="card pmd-card">
    <div class="pmd-tabs">
        <ul role="tablist" class="nav nav-tabs nav-fill">
          <li class="nav-item" role="presentation" @click="tab = 1">
            <a class="nav-link active" data-toggle="tab" role="tab" aria-controls="home" href="#home-fixed">ログイン</a>
          </li>
          <li class="nav-item" @click="tab = 2">
            <a class="nav-link" data-toggle="tab" role="tab" aria-controls="profile" href="#about-fixed">新規登録</a>
          </li>
        </ul>
    </div>
    <div class="card-body">
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="home-fixed">
            <LoginForm />
          </div>
          <div role="tabpanel" class="tab-pane" id="about-fixed">
            <UserRegisterForm />
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import UserRegisterForm from '../components/UserRegisterForm.vue'

export default {
  components: {
    LoginForm,
    UserRegisterForm
  },
  data () {
    return {
      tab: 1
    }
  }
}
</script>
