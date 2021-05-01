import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth'
import salesReducer from '../reducers/sales';
import storageReducer from '../reducers/storage'
import storageFilterReducer from '../reducers/storageFilter';
import setAuthToken from '../utils/setAuthToken';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
        combineReducers({
      
            auth: authReducer,
            storage: storageReducer,
            storageFilter: storageFilterReducer,
            sales: salesReducer
       
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

let currentState = store.getState();

store.subscribe(() => {
  console.log(' 111logout')
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  console.log('previsou', previousState.auth.token, 'current', currentState.auth.token)
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    console.log('logout')
    setAuthToken(token);
  }
});
    


export default store