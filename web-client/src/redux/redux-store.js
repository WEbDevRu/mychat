import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import authReducer from "./auth-reducer"
import appReducer from "./app-reducer"
import chatReducer from './chat-reducer'
import thunk from 'redux-thunk'

let reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    chat: chatReducer,

});


const  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

window.store = store
export default store