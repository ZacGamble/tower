import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  myEvents: [],
  myTickets: [],
  // activeTickets: [],
  // towerEvents: [],
  activeEvent: null,
  activeEvents: [],
  activeComments: []

})
