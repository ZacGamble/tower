<template>
  <div class="container-fluid">
    <div class="row">
      <Ticket v-for="m in myTickets" :key="m.id" :ticket="m" />
    </div>
    <div class="row">
      <h5 class="py-3">My Events</h5>
      <!-- Inject events by account -->
      <TowerEvent v-for="t in myEvents" :key="t.id" :towerEvent="t" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { towerEventsService } from '../services/TowerEventsService'
import { accountService } from '../services/AccountService'
import Ticket from '../components/Ticket.vue'
export default {
  components: { Ticket },
  name: 'Account',
  setup() {
    onMounted(async () => {
      await towerEventsService.getMyEvents(AppState.account)
      await accountService.getAccount()
      await accountService.getMyTickets()
      // await towerEventsService.getUpcomingEvents()
    })
    return {
      account: computed(() => AppState.account),
      myEvents: computed(() => AppState.myEvents),
      myTickets: computed(() => AppState.myTickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
  max-height: 100px;
}
</style>
