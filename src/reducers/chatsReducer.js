const initialState = [
  { from: "steve", msg: "hey" },
  { from: "torres", msg: "hey" },
  { from: "jamie", msg: "hey" },
];

export default function chatsReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_MSG":
      return [...state, { from: action.payload.from, msg: action.payload.msg }];
    default:
      return state;
  }
}
