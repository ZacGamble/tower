<template>
     <div class="col-md-3 my-3">
        <div class="border border-dark">
        <h4></h4>
        <p>A description</p>
        <p>date of the event</p>
        <i>(capacity) How many spots left </i>
        </div>
      </div>
</template>

<script>
export default {
    props: {
        towerEvent: {
            type: Object,
            required: true
        }
    },

setup(props){

},

return: {

    }
}
</script>

<style>

</style>

