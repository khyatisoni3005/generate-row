import { GET_USER } from "../type"

let initinalState = {
    userData: [],
    userId: null
}

const userReducer = (state = initinalState, action) => {
    switch (action.type) {
        case GET_USER: {
            return {
                ...state,
                userData: action.payload
            }
        }
        default:
            return {
                ...state
            }
    }
}
export default userReducer