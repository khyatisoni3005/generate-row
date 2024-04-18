import { combineReducers } from "redux"
import userReducer from "./userReducer"
import tableReducer from "./tableReducer"


const rootReducer = combineReducers({
    user: userReducer,
    table: tableReducer

})

export default rootReducer