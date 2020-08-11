import store from "../store";

const token = store.state.token;
const url = 'ws://localhost:5757'

class ws {
  constructor() {
    this.wsEvent = [];
    this.client = null;
  }

  static getInstance() {
    if (!ws.instance) {
      ws.instance = new ws();
    }
    return ws.instance;
  }

  async connect() {
    const wsClient = new WebSocket(url, [token]);
    this.client = wsClient;
    wsClient.onmessage = (msg => {
      let data = JSON.parse(msg.data);
      this.emit(data.type, data);
    });
    wsClient.onopen = (() => {
      this.emit("wsOpen");
    });
    wsClient.onclose = (() => {
      this.emit("wsClose");
    });
    wsClient.onerror = (() => {
      this.emit("wsClose");
    });
  }

  close(){
    this.client.close();
    this.wsEvent = [];
  }

  on(type, callback) {
    this.wsEvent.push({
      type: type,
      callback
    })
  }

  emit(type, data) {
    this.wsEvent.forEach(item => {
      if (item.type == type) {
        item.callback(data);
      }
    })
  }
}

export default ws.getInstance()