const redux = require("redux");
const { createLogger } = require("redux-logger");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data;
        dispatch(
          fetchUsersSuccess(
            users.map((user) => {
              return user.id;
            })
          )
        );
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

// Create logger middleware
const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
); // Apply thunk and logger middleware

store.subscribe(() => {
  console.log(store.getState());
});
try {
  store.dispatch(fetchUsers()); // Call fetchUsers as a function
} catch (error) {
  console.log(error);
}
