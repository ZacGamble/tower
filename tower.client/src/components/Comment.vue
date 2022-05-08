<template>
<div class="d-flex my-3">
    <img :src="account.picture" alt="profile image" class="picture">
    <div class="d-flex flex-column border-light bg-grey p-2 rounded my-4 mx-5 flex-grow-1">
        <div class="d-flex justify-content-between">

      <h5 class="p-2">{{account.name}}</h5>  
      <i v-show="comment.creatorId == account.id" class="mdi mdi-delete fs-2 action" title="delete comment" @click="deleteComment(comment.id, comment.creatorId)"></i>
        </div>
        <p>{{comment.body}}</p>
    </div>
</div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { Comment, onMounted, watchEffect } from '@vue/runtime-core'
import { towerEventsService } from '../services/TowerEventsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { commentsService } from '../services/CommentsService'
import { useRoute } from 'vue-router'
export default {
    props: {
        comment:{
            type: Object,
            required: true
        }
    },

    setup(props){
        const route = useRoute();

        //  onMounted(()=>{
        //     logger.log('what is a prop?', props.comment)
        //  })
        return {
            account: computed(()=> AppState.account),
            activeEvent: computed(()=> AppState.activeEvent),
            activeComments: computed(()=> AppState.activeComments),

            async deleteComment(commentId, creatorId){
                try {
                    if (await Pop.confirm()) {
                        await commentsService.deleteComment(commentId, creatorId)
                        Pop.toast('Comment deleted!', 'success')
                    }

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
.picture{
    height: 8em;
    width: 8em;
    border-radius: 50%;
}
</style>