<template>
     <div class="col-md-4 my-3 p-3" >
        <div @click.stop="openEventPage('EventDetailsPage', {eventId: towerEvent.id})" class="border border-dark selectable mb-4" :title="'open details for ' + towerEvent.name">
        <img class="img-fluid background my-3 rounded img-clamp" :src="towerEvent.coverImg" />
        <div class="fs-6 fw-bold text-danger" v-show="towerEvent?.capacity <= 0 || towerEvent.isCanceled">EVENT NO LONGER AVAILABLE</div>
        <h4>{{towerEvent.name}}</h4>
        <p>Booked on <b>{{towerEvent.startDate.substring(5, 10)}}</b><br> {{towerEvent.location}}</p>
        <h6></h6>
        <i > {{towerEvent.capacity}} tickets remaining </i>
        <hr>
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

setup(props){
    const router = useRouter()
    const route = useRoute()
    watchEffect(()=> {
        AppState.activeEvent = props.towerEvent
    })

return {

    openEventPage(name, params) {
        AppState.activeEvent = props.towerEvent
        router.push({name, params})
        logger.log('TowerEvent.vue > Appstate.activeEvent(page) ', AppState.activeEvent)

            }
        }
    }
}
</script>

<style>
.img-clamp{
    width: 15em;
    height: 12em;
}

.background{
    background-image: url();
    background-size: cover;
}

</style>

