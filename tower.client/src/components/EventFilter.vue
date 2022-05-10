<template>
  <div class="row mt-3 bg-light text-dark fs-4 fw-bold d-flex justify-content-center">
      <div class="col-md-2 text-center">
        <p class="selectable pop" title="view all" @click="getTowerEvents()">
          All Events
        </p>
      </div>
      <div class="col-md-2 text-center">
        <p
          class="selectable pop"
          title="filter for concerts"
          @click="getTowerConcerts()"
        >
          Concerts
        </p>
      </div>
      <div class="col-md-2 text-center">
        <p
          class="selectable pop"
          title="filter for conventions"
          @click="getTowerConventions()"
        >
          Conventions
        </p>
      </div>
      <div class="col-md-2 text-center">
        <p
          class="selectable pop"
          title="filter for digital"
          @click="getTowerDigital()"
        >
          Digital
        </p>
      </div>
      <div class="col-md-2 text-center">
        <p
          class="selectable pop"
          title="filter for sports"
          @click="getTowerSports()"
        >
          Sports
        </p>
      </div>
    </div>
</template>


<script>
import { towerEventsService } from '../services/TowerEventsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  setup() {
    return {
      async getTowerEvents() {
        try {
          await towerEventsService.getTowerEvents()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async getTowerConcerts() {
        try {
          await towerEventsService.getTowerConcerts()

        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async getTowerConventions() {
        try {
          await towerEventsService.getTowerConventions()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async getTowerDigital() {
        try {
          await towerEventsService.getTowerDigital()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async getTowerSports() {
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