<template>
     <div class="col-md-4 my-3 p-3">
        <div @click="openEventPage()" class="border border-dark selectable mb-4" :title="'open details for ' + towerEvent.name">
        <img class="img-fluid background my-3 rounded" :src="towerEvent.coverImg" />
        <h6>{{towerEvent.name}}</h6>
        <p>Booked for: {{towerEvent.startDate.substring(0, 10)}}</p>
        <i> {{towerEvent.capacity}} tickets remaining </i>
        <hr>
        </div>
      </div>
</template>

<script>
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

setup(props){
    const router = useRouter()
    const route = useRoute()


return {

    openEventPage() {
        AppState.activeEvent = props.towerEvent
        router.push({name: 'EventDetailsPage', params: {eventId: props.towerEvent.id}})
        logger.log('TowerEvent.vue > ', AppState.activeEvent)

            }
        }
    }
}
</script>

<style>
.img-clamp{
    max-width: 10em;
    max-height: 10em;
}

.background{
    background-image: url();
    background-size: cover;
}

</style>

