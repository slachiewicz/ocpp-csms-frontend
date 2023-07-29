// Utilities
import { defineStore } from 'pinia'


const useSSEStore = defineStore("sse", {
  state: () => ({
    sseEventSource: null,
    listener: null,
    eventType: "message"
  }),
  actions: {

    initEventSource() {
      if (!this.sseEventSource) {
        this.sseEventSource = new EventSource("http://localhost:8000/stream");
      }},

    updateEventListener(func) {
      if (this.listener) {
        this.sseEventSource.removeEventListener(this.eventType, this.listener)
      }
      this.listener = (event) => {
        let response = JSON.parse(event.data)
        func(response.data)
      }
      this.sseEventSource.addEventListener(this.eventType, this.listener)
    }

  }
})

export const { initEventSource, updateEventListener } = useSSEStore()
