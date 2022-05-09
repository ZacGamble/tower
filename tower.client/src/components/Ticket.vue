<template>
    <div class="d-flex justify-content-between me-5">
        {{ticket?.id}}
        <i @click="destroyTicket(ticket?.id)" class="mdi mdi-delete selectable">Destroy</i>
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
    props:{
        ticket:{
            type: Object,
            required: true
        }
    },

    setup(props){
        watchEffect(()=>{
            
        })
       const route = useRoute()
        return {
            towers: computed(()=> AppState.myTickets.TowerEvents),
            // TODO delete tickets and get new event populated ones
           async destroyTicket(ticketId){
                try {
                  await ticketsService.destroyTicket(ticketId)
                  logger.log('got this far')
                  Pop.toast('Ticket shredded', 'success')
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