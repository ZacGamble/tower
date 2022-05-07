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
                    <span><button class="btn btn-warning">Attend {{activeEvent?.type}} <i class="mdi mdi-account"></i></button></span>
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
                <form class="d-flex flex-column">
                    <div class="d-flex justify-content-end"><small>Join the conversation</small></div>
                      <textarea name="comment-field" id="comment-field" title="leave a comment" placeholder="Tell the people..."></textarea>
                      <div class="d-flex justify-content-end">
                        <button class="btn btn-success" type="submit" title="submit comment">post comment</button>
                      </div>
                 
                </form>
                <!-- Comment component here -->
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted, watchEffect } from '@vue/runtime-core'
export default {
    setup(){
        // onMounted(()=> {
        //     activeEvent
            
        //     })
        return {
            activeEvent: computed(()=> AppState.activeEvent),
        }
    }
}
</script>


<style lang="scss" scoped>

</style>