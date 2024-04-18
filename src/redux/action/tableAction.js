import axios from "axios"
import { ADD_ROW, GET_ROW, DELETE_ROW } from "../type"

export const addRow = (rows) => {
    return (dispatch) => {
        axios.post("http://localhost:3001/table", rows)
            .then((res) => {
                console.log(res, "res from action");
                dispatch({
                    type: ADD_ROW,
                    payload: res.data
                })
            })
    }
}

export const getTableRow = () => {
    return (dispatch) => {
        axios.get("http://localhost:3001/table")
            .then((res) => {
                console.log(res, "res from action");
                dispatch({
                    type: GET_ROW,
                    payload: res.data
                })
            })
    }
}
export const deleteRows = (id) => {
    console.log("delete", id);
    return (dispatch) => {
        axios.delete(`http://localhost:3001/table/${id}`)
            .then((res) => {
                dispatch({
                    type: DELETE_ROW,
                    payload: id
                })
            })
    }
}