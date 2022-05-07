<template>
  <div class="container">
    <div class="row">
      A headline card and text
    </div>
    <div class="row">
      Some filtering options
    </div>
    <div class="row">
      <!-- Dynamically draw events here -->
    <TowerEvent v-for="t in towerEvents" :key="t.id" towerEvent="t"/>
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
    
    watchEffect(async ()=> {
      let list = AppState.towerEvents
      if(filterBy.value) {
        list = list.filter(l => l.status == filterBy.value)
      }
      filteredTowerEvents.value = list
    })

    watchEffect(async ()=> {
      try {
        await towerEventsService.getTowerEvents()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })

    // onMounted(async()=>{
      //   try {
        //     await towerEventsService.getTowerEvents()
    //   } catch (error) {
      //     logger.error(error)
    //     Pop.toast(error.message, 'error')
    //   }
    // })
    return {
      
      towerEvents : computed(() => AppState.towerEvents)
    }
  }

}
</script>

<style>

</style>