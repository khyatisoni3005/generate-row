import { EMPTY_ID, GET_USER, VIEW_USER, POST_SUBMITED_DATA, DELETE_USER } from "../type"

let initinalState = {
    userData: [],
    userId: null,

}

const userReducer = (state = initinalState, action) => {
    switch (action.type) {
        case GET_USER: {
            return {
                ...state,
                userData: action.payload
            }
        }
        case VIEW_USER: {
            return {
                ...state,
                userId: action.payload
            }
        }
        case EMPTY_ID: {
            return {
                ...state,
                userId: null
            }
        }
        case POST_SUBMITED_DATA: {
            return {
                ...state,
                userData: state.userData.map((val) => {
                    if (val.id === action.payload.id) {
                        return action.payload
                    }
                    return val
                })

            }
        }

        case DELETE_USER: {
            return {
                ...state,
                userData: state.userData.filter((val) => val.id !== action.payload)
            }
        }
        default:
            return {
                ...state
            }
    }
}
export default userReducer