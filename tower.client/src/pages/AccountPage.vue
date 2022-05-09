<template>
<div class="container-fluid ms-4">
  <div class="row">
    <div class="col-md-6">
      <h5>My Events</h5>
      <div class="row">
      <!-- Inject events by account -->
      <TowerEvent v-for="t in myEvents" :key="t.id" :towerEvent="t"/>
      </div>
    </div>
    <div class="col-md-6">
      <h5>Upcoming events</h5>
      <!-- inject my upcoming events/ events I hold tickets for -->
      <div>
        <Ticket v-for="m in myTickets" :key="m.id" :ticket="m"/>
          <!-- <div v-for="m in myTickets" :key="m.id" :myTicket="m" class="d-flex justify-content-between me-5">
        {{myTicket}}
        <i @click="destroyTicket(ticket?.id)" class="mdi mdi-delete selectable">Destroy</i> -->
         </div>
      </div>
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
    onMounted(async()=> {
      await towerEventsService.getMyEvents(AppState.account)
      await accountService.getAccount()
      await accountService.getMyTickets()
      // await towerEventsService.getUpcomingEvents()
    })
    return {
      account: computed(() => AppState.account),
      myEvents: computed(()=> AppState.myEvents),
      myTickets: computed(()=> AppState.myTickets),
      
      
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
