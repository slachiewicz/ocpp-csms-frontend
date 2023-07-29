// Utilities
import { defineStore } from 'pinia'
import {ref} from 'vue';


export const useSSEStore = defineStore("sse", {
  // const sseEventSource = ref(null);
  // const listener = ref(null);
  // const eventType = "message";
  //
  // function initEventSource(){
  //   if (!sseEventSource.value) {
  //     sseEventSource.value = new EventSource("http://localhost:8000/stream");
  //   }
  // }
  //
  // const updateEventListener = (func) => {
  //   if (!listener.value) {
  //     listener.value = (event) => {
  //       let response = JSON.parse(event.data)
  //       func(response.data)
  //     }
  //     sseEventSource.value.addEventListener(eventType, listener)
  //   }
  // }
  // return { initEventSource, updateEventListener }

  state: () => ({
    sseEventSource: null,
    listener: null,
    eventType: "message"
  }),
  actions: {
    updateEventType(value) {
      this.eventType = value
    },
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
