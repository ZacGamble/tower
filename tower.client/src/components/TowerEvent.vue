<template>
  <div class="col-lg-3 col-md-4 col-sm-6 my-3 p-3">
    <div
      @click.stop="
        openEventPage('EventDetailsPage', { eventId: towerEvent.id })
      "
      class="border border-dark selectable p-2 tower-event"
      :title="'open details for ' + towerEvent.name"
    >
      <img
        class="img-fluid background my-3 rounded img-clamp"
        :src="towerEvent.coverImg"
        :alt="towerEvent.name"
      />
      <div
        class="fs-6 fw-bold text-danger"
        v-show="towerEvent?.capacity <= 0 || towerEvent?.isCanceled"
      >
        EVENT NO LONGER AVAILABLE
      </div>
      <h4>{{ towerEvent.name }}</h4>
      <p>
        Booked on <b>{{ towerEvent?.startDate.substring(5, 10) }}</b
        ><br />
        {{ towerEvent?.location }}
      </p>
      <h6></h6>
      <i> {{ towerEvent?.capacity }} tickets remaining </i>
      <hr />
    </div>
  </div>
</template>

<script>
import { watchEffect } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  props: {
    towerEvent: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const router = useRouter()
    const route = useRoute()
    watchEffect(() => {
      AppState.activeEvent = props.towerEvent
    })

    return {

      openEventPage(name, params) {
        AppState.activeEvent = props.towerEvent
        router.push({ name, params })
        logger.log('TowerEvent.vue > Appstate.activeEvent(page) ', AppState.activeEvent)

      }
    }
  }
}
</script>

<style>
.img-clamp {
  width: 15em;
  height: 12em;
  border-radius: 20%;
}

.background {
  background-image: url();
  background-size: cover;
}

.tower-event {
  border-radius: 3%;
  background-color: #8392ab;
  color: white;
  text-shadow: 1px 4px 3px black;
}
</style>

