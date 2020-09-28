import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './authReducer'

export default createStore(
    reducer,
    composeWithDevTools(applyMiddleware(promiseMiddleware))
)