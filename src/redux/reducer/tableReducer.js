import { ADD_ROW, DELETE_ROW, GET_ROW } from "../type"

let initinalState = {
    table: []
}


const tableReducer = (state = initinalState, action) => {
    switch (action.type) {

        case ADD_ROW: {

            let newRow = [...state.table, action.payload]
            console.log(newRow, "newrow from reducer");
            console.log(state.table, "tr redu");
            return {
                ...state,
                table: newRow
            }
        }
        case GET_ROW: {

            return {

                ...state,
                table: action.payload
            }
        }
        case DELETE_ROW: {

            return {

                ...state,
                table: state.table.filter((val) => val.id !== action.payload)
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default tableReducer