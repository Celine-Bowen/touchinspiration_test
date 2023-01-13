import { combineReducers } from 'redux'
import UserReducer from './user/userReducer'

const rootReducer = combineReducers({
    user: UserReducer
})

export default rootReducer