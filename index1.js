// import redux from "redux"
const redux = require("redux");
const createStore = redux.createStore;
const combineReducer = redux.combineReducers;

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

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
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

const rootReducer = combineReducer({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer);
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
