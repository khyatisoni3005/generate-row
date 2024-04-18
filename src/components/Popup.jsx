import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CommonButton from './CommonButton';
import { useState } from 'react';
import { ADD_ROW } from '../redux/type';
import { addRow } from "../redux/action/tableAction"
import { useDispatch } from "react-redux"

const style = {
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Popup() {

    const [inputValue, setInputValue] = useState({})
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    function submit() {
        dispatch(addRow(inputValue))
        setOpen(false)
    }

    function handleInput(e) {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })

    }
    return (
        <>
            <div style={{ marginTop: "20px", marginLeft: "20px" }}>
                <CommonButton onClick={handleOpen} content={"add row"} />
            </div>

            <Modal
                keepMounted
                open={open}

                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        <input type="text" placeholder='enter row' name='row' onChange={handleInput} />
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        <div className="row">
                            <div className="col-4">
                                <CommonButton content={"submit"} onClick={submit} />
                            </div>
                            <div className="col-4" style={{ marginLeft: "-30px" }}>
                                <CommonButton content={"cancle"} onClick={handleClose} />

                            </div>
                        </div>

                    </Typography>
                </Box>
            </Modal>
        </>
    );
}