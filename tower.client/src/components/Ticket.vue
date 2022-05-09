<template>
  <div class="d-flex justify-content-between me-5 col-md-3 p-3 rounded">
    <div class="bg-grey rounded p-3">
      <img
        class="img-fluid img-clamp"
        :src="ticket?.event.coverImg"
        alt="event picture"
        title="event photo"
      />
      <div class="ms-2">
        <h5>
          <!-- {{ ticket?.TowerEvents.name }} -->
        </h5>
        <p>
          Begins
          {{ ticket?.event.startDate.substring(11, 16) + " o'clock" }},
          {{ ticket?.event.startDate.substring(5, 10) }}
          <br />
          {{ ticket?.event.location }}
        </p>
        <i
          @click="destroyTicket(ticket?.id)"
          class="mdi mdi-delete selectable"
          title="delete ticket"
          aria-label="delete ticket"
          >Destroy</i
        >
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { ticketsService } from '../services/TicketsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { watchEffect } from '@vue/runtime-core'
export default {
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    return {
      towers: computed(() => AppState.myTickets.TowerEvents),

      async destroyTicket(ticketId) {
        try {
          if (await Pop.confirm()) {
            await ticketsService.destroyTicket(ticketId)
            Pop.toast('Ticket shredded', 'success')
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.img-clamp {
  height: 8em;
  width: 8em;
  border-radius: 15%;
}
</style>