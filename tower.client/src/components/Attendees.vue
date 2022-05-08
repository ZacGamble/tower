<template>
       <img class="img-clamp ms-1 my-1" :src="attendee?.account.picture" alt="attendee photo" :title="attendee?.account.name"> 
</template>


<script>
export default {
    props: {
        attendee: {
            type: Object,
            required: true
        }
    },

    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>
.img-clamp{
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
}
</style>