<template>
    <div class="component p-1">
       <img class="img-clamp" :src="attendee?.account.picture" alt="attendee photo" :title="attendee?.account.name"> 
    </div>
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