import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";
import io from "socket.io-client";

const store = createStore(rootReducer, composeWithDevTools());
// this code is responsible for receiving the message from the broadcast by the server
let socket;
if (!socket) {
  socket = io(":3001");
  socket.on("chat message", function (msg) {
    console.log({ msg });
    store.dispatch({
      type: "RECEIVE_MSG",
      payload: msg,
    });
  });
}
const user = "Steve" + Math.random(100).toFixed(2);

// to emet events to server
export function sendChatAction(value) {
  socket.emit("chat message", { from: user, msg: value });
}
export default store;
