<template>
  <div class="container-fluid">
    <div class="row bg-light text-dark">
      <!-- Details -->
      <div
        class="col-md-4 p-4"
        :class="
          activeEvent?.capacity <= 0 || activeEvent?.isCanceled
            ? 'bg-danger'
            : 'bg-light'
        "
      >
        <img :src="activeEvent?.coverImg" alt="cover image" class="img-fluid" />
        <button
          @click="cancelEvent()"
          type="button"
          title="cancel event"
          v-show="
            account?.id == activeEvent?.creatorId &&
            activeEvent?.isCanceled == false
          "
          class="btn btn-danger mt-3"
        >
          Cancel event?
        </button>
        <span
          class="fs-1"
          v-show="activeEvent?.capacity <= 0 || activeEvent?.isCanceled"
          >EVENT NO LONGER AVAILABLE</span
        >
      </div>
      <div class="col-md-8 p-4">
        <div class="d-flex justify-content-between">
          <h4>{{ activeEvent?.name }}</h4>
          <h6>On {{ activeEvent?.startDate.substring(5, 10) }}</h6>
        </div>
        <div class="d-flex justify-content-between">
          <h6>{{ activeEvent?.location }}</h6>
        </div>
        <p>{{ activeEvent?.description }}</p>
        <div class="d-flex justify-content-between my-4">
          <span v-if="activeEvent?.capacity > 0"
            ><b class="text-dark">{{ activeEvent?.capacity }}</b> spots
            left</span
          >
          <span v-else><b class="text-dark">NO SPOTS LEFT</b></span>

          <span v-show="!activeEvent?.isCanceled"
            ><button
              @click="createTicket()"
              :title="'attend ' + activeEvent?.type"
              :class="
                activeEvent?.capacity <= 0 || activeEvent?.isCanceled
                  ? 'btn btn-danger'
                  : ''
              "
              class="btn btn-warning"
            >
              Attend {{ activeEvent?.type }}
              <i class="mdi mdi-account"></i></button
          ></span>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- Attendees -->
      <div class="col-md-12">
        <small>See who is attending</small>
        <Attendees v-for="t in activeTickets" :key="t.id" :attendee="t" />
      </div>
    </div>
    <div class="row">
      <!-- Comments -->
      <div class="col-md-12 px-5 bg-secondary">
        <small>What are people saying</small>
        <form
          class="d-flex flex-column border border-dark p-3 rounded"
          @submit.prevent="submitComment()"
        >
          <div class="d-flex justify-content-end">
            <small>Join the conversation</small>
          </div>
          <textarea
            class="bg-grey"
            name="comment-field"
            id="comment-field"
            title="leave a comment"
            placeholder="Tell the people..."
            v-model="comment.body"
          ></textarea>
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-success mt-4"
              type="submit"
              title="submit comment"
            >
              post comment
            </button>
          </div>
        </form>
        <!-- Comment component here -->
        <Comment v-for="c in activeComments" :key="c.id" :comment="c" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted, watchEffect } from '@vue/runtime-core'
import { towerEventsService } from '../services/TowerEventsService'
import { commentsService } from '../services/CommentsService'
import { ticketsService } from '../services/TicketsService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
export default {

  setup() {

    const route = useRoute()
    const comment = ref({ eventId: route.params.eventId })

    onMounted(async () => {
      try {
        // logger.log(route.params.eventId)
        // AppState.activeEvent = null;
        await towerEventsService.getActiveEvent(route.params.eventId)
        await towerEventsService.getCommentsByEvent(route.params.eventId)
        await towerEventsService.getTicketsByEvent(route.params.eventId)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }

    })

    // watchEffect(async () => {
    //   await towerEventsService.getActiveEvent(route.params.eventId)
    //   await towerEventsService.getCommentsByEvent(route.params.eventId)
    //   await towerEventsService.getTicketsByEvent(route.params.eventId)
    // })

    return {

      comment,
      activeEvent: computed(() => AppState.activeEvent),
      activeComments: computed(() => AppState.activeComments),
      activeTickets: computed(() => AppState.activeTickets),
      myTicketsForEvent: computed(() => AppState.activeTickets.find(t => t.eventId == AppState.activeEvent.id)),
      account: computed(() => AppState.account),

      async createTicket() {
        try {
          if (AppState.activeEvent.capacity == 0 || AppState.activeEvent.isCanceled) {
            Pop.toast('This event is now unavailable')
            return
          }
          if (AppState.activeTickets.find(t => t.accountId === this.account.id)) {
            Pop.toast('You already have a ticket', 'info')
            return
          }
          await ticketsService.createTicket(route.params.eventId)
          AppState.activeEvent.capacity--
          await towerEventsService.getTicketsByEvent(route.params.eventId)
          Pop.toast('Ticket generation success', 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async submitComment() {
        try {
          await commentsService.createComment(comment.value)
          await towerEventsService.getActiveEvent(route.params.eventId)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async cancelEvent() {
        try {
          if (await Pop.confirm()) {
            await towerEventsService.cancelEvent(route.params.eventId)
            Pop.toast('event canceled')
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
</style>