
import axios from "axios"
import { EMPTY_ID, GET_USER, VIEW_USER, POST_SUBMITED_DATA, DELETE_USER } from "../type"
import { Update } from "@mui/icons-material"


export const getUser = () => {
    return (dispatch) => {
        axios.get("http://localhost:3001/user")
            .then((res) => {
                dispatch({
                    type: GET_USER,
                    payload: res.data
                })
            })
    }
}

export const viewUserDataAction = (id) => {
    return {
        type: VIEW_USER,
        payload: id
    }
}

export const emptyId = (id) => {
    return {
        type: EMPTY_ID,
        payload: id
    }
}

export const submitNewData = (objectUpdate) => {


    return (dispatch) => {
        axios.put(`http://localhost:3001/user/${objectUpdate.id}`, objectUpdate)
            .then((res) => {
                let resData = res.data
                let userId = objectUpdate.id
                console.log("submitNewData resData", resData);
                const updateUser = {
                    ...resData
                }
                dispatch({
                    type: POST_SUBMITED_DATA,
                    payload: updateUser
                })
            })
    }

}

export const deleteUserData = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3001/user/${id}`)
            .then((res) => {
                dispatch({
                    type: DELETE_USER,
                    payload: id
                })
            })
    }

}