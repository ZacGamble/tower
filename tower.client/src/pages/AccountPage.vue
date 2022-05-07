<template>
<div class="container">
  <div class="row">
     <!-- <div class="about text-center">
     <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
     <p>{{ account.email }}</p> 
     </div> -->
    <div class="col-md-12">
      <h5>My Events</h5>
      <!-- Inject events by account -->
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <h5>Upcoming events</h5>
      <!-- inject my upcoming events/ events I hold tickets for -->
    </div>
  </div>
</div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
