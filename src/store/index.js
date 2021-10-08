import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import galleryReducer from './reducers/galleryReducer';
import errorReducer from './reducers/errorReducer';

const allReducers = combineReducers({
  galleryReducer,
  errorReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancer(applyMiddleware(thunk));
const store = createStore(allReducers, middleware);

export default store;
