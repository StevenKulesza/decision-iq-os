// Packages
import { combineReducers } from 'redux'

// Reducers
import auth from './auth'
import client from './client'
import messages from './messages'
import flight from './flight'
import templates from './templates'
import blobs from './blobs'

const appReducer = combineReducers({
     auth,
     client,
     messages,
     flight,
     templates,
     blobs
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        localStorage.removeItem('state')
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer;