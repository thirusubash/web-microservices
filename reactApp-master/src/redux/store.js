import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    // Add more reducers here if needed
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
