
import axios from "axios"
import { GET_USER } from "../type"


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