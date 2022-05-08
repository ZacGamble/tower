<template>
    <div class="container-fluid">
        <div class="row bg-light text-dark">
            <!-- Details -->
            <div class="col-md-4 p-4">
             <img :src="activeEvent?.coverImg" alt="cover image" class="img-fluid">
            </div>
            <div class="col-md-8 p-4">
                <div class="d-flex justify-content-between">
                    <h4>{{activeEvent?.name}}</h4>
                    <h6>On {{activeEvent?.startDate.substring(5, 10)}}</h6>
                </div>
                <div class="d-flex justify-content-between">
                    <h6>{{activeEvent?.location}}</h6>
                    
                </div>
                <p>{{activeEvent?.description}}</p>
                <div class="d-flex justify-content-between my-4">
                    <span><b class="text-danger">{{activeEvent?.capacity}}</b> spots left</span>
                    <span><button :title="'attend '+activeEvent?.type" class="btn btn-warning">Attend {{activeEvent?.type}} <i class="mdi mdi-account"></i></button></span>
                </div>
            </div>
        </div>
        <div class="row">
            <!-- Attendees -->
            <div class="col-md-12">
            <small>See who is attending</small>
            </div>
        </div>
        <div class="row">
            <!-- Comments -->
            <div class="col-md-12 px-5 bg-secondary">
                      <small>What are people saying</small>
                <form class="d-flex flex-column border border-dark p-3 rounded" @submit.prevent="submitComment()">
                    <div class="d-flex justify-content-end"><small>Join the conversation</small></div>
                      <textarea class="bg-grey" name="comment-field" id="comment-field" title="leave a comment" placeholder="Tell the people..." v-model="comment.body"></textarea>
                      <div class="d-flex justify-content-end">
                        <button class="btn btn-success mt-4" type="submit" title="submit comment">post comment</button>
                      </div>
                </form>
                <!-- Comment component here -->
                <Comment v-for="c in activeComments" :key="c.id" :comment="c"/>
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
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
export default {  

    setup(){

        const route = useRoute()
        const comment = ref({eventId: route.params.eventId})
        onMounted(async()=> {
            try {
                // logger.log(route.params.eventId)
                AppState.activeEvent = null;
                await towerEventsService.getActiveEvent(route.params.eventId)
                await towerEventsService.getCommentsByEvent(route.params.eventId)
            } catch (error) {
              logger.error(error)
              Pop.toast(error.message, 'error')
            }
        
            }),

             watchEffect(async()=> {
        })

        return {
            comment,
            activeEvent: computed(()=> AppState.activeEvent),
            activeComments: computed(()=> AppState.activeComments),

            async submitComment(){
                try {
                  await commentsService.createComment(comment.value, route.params.eventId)
                } catch (error) {
                  logger.error(error)
                  Pop.toast(error.message, 'error')
                }
            }

            //     async getActiveEvent(){
            //     try {
            //     await towerEventsService.getActiveEvent(route.params.id)
            //     } catch (error) {
            //       logger.error(error)
            //       Pop.toast(error.message, 'error')
            //     }
            // },
          
        }
    }
}
</script>
<style lang="scss" scoped>

</style>