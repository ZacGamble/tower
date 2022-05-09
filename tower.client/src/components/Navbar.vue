<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary px-3">
    <router-link :to="{ name: 'Home' }">
      <div class="navbar-brand d-flex selectable">
        <!-- @click="navigateTo()" -->
        <div class="d-flex align-items-center fs-1">
          T<i class="mdi mdi-bird"></i>wer
        </div>
      </div>
    </router-link>
    <button
      class="btn btn-primary mx-5 my-3"
      data-bs-toggle="modal"
      data-bs-target="#eventModal"
      title="create event"
    >
      Create Event
    </button>
    <button
      title="access account"
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
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
  <!-- Modal -->
  <div
    class="modal fade"
    id="eventModal"
    tabindex="-1"
    aria-labelledby="eventModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="eventModalLabel">Create event</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="event-modal-body">
          <form class="p-4" @submit.prevent="createTowerEvent()">
            <div class="d-flex">
              <input
                class="m-2 p-2 rounded"
                type="text"
                placeholder="name..."
                v-model="editable.name"
              />
              <input
                class="m-2 p-2 rounded"
                type="url"
                placeholder="cover image URL..."
                v-model="editable.coverImg"
              />
            </div>
            <div class="d-flex">
              <input
                class="m-2 p-2 rounded"
                type="text"
                placeholder="location..."
                v-model="editable.location"
              />
              <input
                class="m-2 p-2 rounded"
                type="number"
                placeholder="capacity"
                v-model="editable.capacity"
              />
            </div>
            <div class="d-flex flex-column">
              <div class="d-flex">
                <input
                  class="m-2 p-2 rounded"
                  type="date"
                  v-model="editable.startDate"
                />
                <select name="type" id="type-select" v-model="editable.type">
                  <option value="concert" selected>Concert</option>
                  <option value="convention">Convention</option>
                  <option value="sport">Sport</option>
                  <option value="digital">Digital</option>
                </select>
              </div>
              <textarea
                type="text"
                placeholder="description..."
                v-model="editable.description"
              />
            </div>
            <div class="d-flex justify-content-between">
              <button
                type="button"
                class="btn btn-secondary mt-2"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary mt-2">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';
import { towerEventsService } from '../services/TowerEventsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { Modal } from 'bootstrap';
import { AppState } from '../AppState';
export default {

  setup() {

    const editable = ref({});
    const router = useRouter();

    return {
      editable,

      // async navigateTo() {
      //   router.push({ name: 'Home' })
      //   await towerEventsService.getTowerEvents()
      // },

      async createTowerEvent() {
        try {
          const newEvent = await towerEventsService.createTowerEvent(editable.value)
          Modal.getOrCreateInstance(document.getElementById("eventModal")).hide()
          Pop.toast('Event created successfully', 'success')
          editable = {}
          router.push({ name: 'EventDetailsPage', params: { eventId: AppState.activeEvent.id } })
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
