import {createStore,applyMiddleware} from "redux";
import {persistStore,persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from "redux-thunk";
import {reducer}  from '../reducer/reducer';
import { createLogger } from 'redux-logger'

const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const logger=createLogger({});

// export const store=createStore(reducer, withDevTools(applyMiddleware(thunk,logger)));

const persistConfig = {
    key: 'root',
    storage:storage,
    stateReconciler: autoMergeLevel2
};
const persistedReducer = persistReducer(persistConfig, reducer);
export const store=createStore(persistedReducer,{}, withDevTools(applyMiddleware(thunk,logger)));
export const persistor=persistStore(store);


//saga store
// import { createStore , applyMiddleware} from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import rootReducer from '../reducer/rootReducer';
// import rootSaga from '../saga/rootSaga';

// const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore( rootReducer, withDevTools(applyMiddleware(sagaMiddleware)));

// sagaMiddleware.run(rootSaga);

// export default store;