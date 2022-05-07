<template>
     <div class="col-md-3 my-3">
        <div class="border border-dark">
        <h4>{{towerEvent.name}}</h4>
        <p>{{towerEvent.description}}</p>
        <p>Booked for: {{towerEvent.startDate.substring(0, 10)}}</p>
        <i>Remaining tickets: {{towerEvent.capacity}} </i>
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

