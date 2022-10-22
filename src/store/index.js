import reducer from './reducer.js'
import {legacy_createStore as createStore} from 'redux'

const store = createStore(reducer)
export default store