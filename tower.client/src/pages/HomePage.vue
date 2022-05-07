<template>
  <div class="container">
    <div class="row background text-light fw-bold p-3">
      <!-- Filter homepage component here? -->
      A headline card and text <br>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
      Adipisci, reiciendis.  <br>
      Obcaecati reprehenderit esse perspiciatis praesentium modi alias ratione. <br>
      Ducimus dolorum minus nam autem atque soluta rerum ex eos perspiciatis est!
    </div>

   <EventFilter/>

    <div class="row">
      <!-- Dynamically draw events here -->
    <TowerEvent v-for="t in towerEvents" :key="t.id" :towerEvent="t"/>
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
// return computed
      towerEvents : computed(() => AppState.activeEvents),
// methods

    }
  }

}
</script>

<style>
.background{
  background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsabwBkqqKoScQIEGo5S1CzUm3GxJS4XRIiA&usqp=CAU);
  background-size: cover;
}

.pop:hover{
  transform: scale(1.03);
}
</style>