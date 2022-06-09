<template>
  <div class="container">
    <div class="row background text-light fw-bold p-3 rounded">
      <!-- Filter homepage component here? -->
      <p class="text-center mt-4">
        Get ahead of the scalpers -<br />
        Reserve your seat now with <br />
        real events for real people
      </p>
    </div>
    <EventFilter />
    <div class="row">
      <!-- Dynamically draw events here -->
      <TowerEvent v-for="t in towerEvents" :key="t.id" :towerEvent="t" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted, watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { towerEventsService } from '../services/TowerEventsService.js'
export default {

  setup() {
    const filteredTowerEvents = ref([])
    const filterBy = ref('')

    watchEffect(async () => {
      let list = AppState.towerEvents
      if (filterBy.value) {
        list = list.filter(l => l.status == filterBy.value)
      }
      filteredTowerEvents.value = list
    })

    onMounted(async () => {
      try {
        await towerEventsService.getTowerEvents()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })

    return {
      // return computed
      towerEvents: computed(() => AppState.activeEvents),
      // methods
    }
  }
}
</script>

<style>
.background {
  background-image: url(https://wallpapercave.com/wp/v5R405z.jpg);
  background-size: cover;
  background-position-y: -1em;
  min-height: 20vh;
  margin-top: 2em;
}

.pop:hover {
  transform: scale(1.03);
}
</style>