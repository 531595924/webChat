import store from "../store";

const token = store.state.token;
const url = 'ws://localhost:5757'
let ws = new WebSocket(url, [token]);


export default ws;