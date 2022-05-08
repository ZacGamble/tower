<template>
<div class="d-flex my-3">
    <img :src="account.picture" alt="profile image" class="picture">
    <div class="d-flex flex-column border-light bg-grey p-2 rounded my-4 mx-5 flex-grow-1">
      <h5 class="bg-dark p-2">{{account.name}} says:</h5>  
        Hello/comment body
    </div>
</div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
    setup(){
        return {
            account: computed(()=> AppState.account),
            activeEvent: computed(()=> AppState.activeEvent)
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