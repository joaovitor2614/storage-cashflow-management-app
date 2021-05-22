import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth'
import clientReducer from '../reducers/client';
import salesReducer from '../reducers/sales';
import storageReducer from '../reducers/storage'
import storageFilterReducer from '../reducers/storageFilter';
import clientFilterReducer from '../reducers/clientFilter';
import setAuthToken from '../utils/setAuthToken';
import billsReducer from '../reducers/bills';
import billsFilterReducer from '../reducers/billsFilter';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
        combineReducers({
      
            auth: authReducer,
            storage: storageReducer,
            storageFilter: storageFilterReducer,
            sales: salesReducer,
            client: clientReducer,
            clientFilter: clientFilterReducer,
            bills: billsReducer,
            billsFilter: billsFilterReducer
       
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

let currentState = store.getState();

store.subscribe(() => {
 
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();

  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;

    setAuthToken(token);
  }
});
    


export default store