// import redux from "redux"
const redux = require("redux");
const createStore = redux.createStore;

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// action creator
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "first redux action",
  };
}
function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    info: "first redux action",
  };
}

// state (initial State)
const initialState = {
  numOfCakes: 10,
  numOfIceCreams: 20,
};

// const reducer = (state = initialState, action ) => {
//     switch (action.type) {
//         case BUY_CAKE: state.numOfCakes - 1
//     }
// }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return { ...state, numOfCakes: state.numOfCakes - 1 };
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

// redux store

const store = createStore(reducer);
console.log("initial State", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Update State", store.getState())
);

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();
