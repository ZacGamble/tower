<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center fs-1">

        T<i class="mdi mdi-bird"></i>wer
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <!-- <router-link
            :to="{ name: 'About' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            About
          </router-link> -->
        </li>
      </ul>
      <button class="btn btn-success me-5 my-3" @click="createEvent()">Create Event</button>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';
import { towerEventsService } from '../services/TowerEventsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
export default {
  
  
  setup() {
    const router = useRouter();
    return {
     async navigateTo(){
       try {
         router.push({name: 'Home'})
         await towerEventsService.getTowerEvents()
       } catch (error) {
         logger.error(error)
         Pop.toast(error.message, 'error')
       }
      }
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
