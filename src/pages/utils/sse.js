
var sse;
var listener;

function useEventSource(func) {
  let type = "message"

    if (!sse) {
      sse = new EventSource("http://localhost:8000/stream");
    }
    // listener is not appended if it has the same type as previous listener
    // keep previous listener and remove it before adding a new one
    if (listener) {
      sse.removeEventListener(type, listener)
    }
    listener = (e) => {
      let response = JSON.parse(e.data)
      let data = response.data
      func(data);
    }
    sse.addEventListener(type, listener)
}


export { useEventSource }
