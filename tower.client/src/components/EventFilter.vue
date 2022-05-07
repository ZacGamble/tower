<template>
   <div class="row mt-3">
     <div class="d-flex justify-content-evenly bg-secondary fs-4 fw-bold align-items-center pt-2 rounded">
       <p class="selectable pop" title="view all" @click="getTowerEvents()" >All Events</p>
       <p class="selectable pop" title="filter for concerts" @click="getTowerConcerts()" >Concerts</p>
       <p class="selectable pop" title="filter for conventions" @click="getTowerConventions()">Conventions</p>
       <p class="selectable pop" title="filter for digital" @click="getTowerDigital()">Digital</p>
       <p class="selectable pop" title="filter for sports" @click="getTowerSports()">Sports</p>
     </div>
    </div>
</template>


<script>
import { towerEventsService } from '../services/TowerEventsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
    setup(){
        return {
              async getTowerEvents(){
      try {
          await towerEventsService.getTowerEvents()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async getTowerConcerts(){
        try {
          await towerEventsService.getTowerConcerts()
          
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async getTowerConventions(){
        try {
          await towerEventsService.getTowerConventions()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      
      async getTowerDigital(){
        try {
          await towerEventsService.getTowerDigital()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async getTowerSports(){
        try {
          await towerEventsService.getTowerSports()
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