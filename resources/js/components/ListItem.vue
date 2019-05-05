<template>
  <div>
    <RouterLink :to="'/items/'+itemId">
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">ID: {{ itemId }}</h4>
          <p class="card-text">{{ itemValue }}</p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script>
export default {
  props: {
    itemId: String,
    itemValue: String
  }
}
</script>
