import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CommonButton from './CommonButton'
import { getTableRow } from "../redux/action/tableAction"
import CloseIcon from '@mui/icons-material/Close';
import { emptyId, getUser, viewUserDataAction } from '../redux/action/userAction';
import { useDispatch, useSelector } from "react-redux"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteRows } from "../redux/action/tableAction"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Label } from '@mui/icons-material';
import axios from 'axios';
import { submitNewData, deleteUserData } from "../redux/action/userAction"
import { useStepperContext } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function TableData() {
    const [rowData, setrowData] = useState({})
    const [viewData, setViewData] = useState({})
    const { table } = useSelector((state) => state.table)
    const { userData, userId } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [deleteId, setDeleteId] = React.useState()

    // add input modle
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };


    // edit data modle

    const [editModleOpen, setEditModleOpen] = useState(false)

    const editModlehandleClose = () => {
        setEditModleOpen(false);
    };



    function deleteRow(id) {
        setOpen(true)
        setDeleteId(id)
    }
    function confirmDelete(id) {
        dispatch(deleteRows(deleteId))
        setOpen(false)
    }

    // update 

    function viewUserData(id) {
        dispatch(viewUserDataAction(id))

    }
    useEffect(() => {
        dispatch(getUser())
    }, [])

    useEffect(() => {
        dispatch(getTableRow())
    }, [])

    function handleRowData(e) {
        setrowData({ ...rowData, [e.target.name]: e.target.value })
    }

    function deleteUser(id) {
        dispatch(deleteUserData(id))
    }

    // function submitUserData(id) {
    //     console.log(userData, "userdara");
    //     let updateData = userData.find((data) => data.id == id)
    //     const objectUpdate = {
    //         updateData,
    //         rowData,
    //         id
    //     }
    //     console.log(" submitUserData objectUpdate ", objectUpdate);
    //     setEditModleOpen(false);
    //     dispatch(submitNewData(objectUpdate))
    // }
    function submitUserData(id) {
        // Assume rowData contains the edited fields like { dob: 'newDOB', address: 'newAddress' }
        let existingData = userData.find((data) => data.id === id);

        // Merge the edited rowData into existingData.rowdata
        const updatedRowData = {
            ...existingData,
            rowdata: {
                ...existingData.rowdata,
                ...rowData
            }
        };

        const objectUpdate = {
            ...updatedRowData,
            id
        };

        console.log("submitUserData objectUpdate", objectUpdate);
        setEditModleOpen(false);
        dispatch(submitNewData(objectUpdate));
    }

    useEffect(() => {
        if (userId) {
            setEditModleOpen(true)
            axios.get(`http://localhost:3001/user/${userId}`)
                .then((res) => {
                    setViewData(res.data)
                })
        }

    }, [userId])



    useEffect(() => {
        if (!editModleOpen) {
            dispatch(emptyId(userId))
            setViewData({
                name: "",
                email: "",
                id: ""
            })

        }
    }, [editModleOpen])
    return (
        <>
            <TableContainer>
                <div className="col-8 mt-5">
                    <Table >
                        <TableHead style={{ textTransform: "capitalize" }}>
                            <TableRow>
                                <TableCell><b>Number</b></TableCell>
                                <TableCell ><b>Name</b></TableCell>
                                <TableCell><b>Email</b></TableCell>
                                {
                                    table.map((val, ind) => {
                                        return (
                                            <React.Fragment key={ind}>
                                                <TableCell><b>{val.row}
                                                    <CloseIcon style={{ fontSize: "20px", color: "red", marginLeft: "5px" }} variant="outlined" onClick={() => deleteRow(val.id)} />
                                                    <Dialog
                                                        open={open}
                                                        onClose={handleClose}
                                                        BackdropProps={{ style: { backgroundColor: 'transparent' } }}
                                                        disableBackdropClick
                                                        aria-labelledby="draggable-dialog-title"
                                                    >
                                                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                                            Confirm
                                                        </DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                Are You Sure That You Want  To Delete The ROW? if yes , click Delete!
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleClose}>
                                                                Cancel
                                                            </Button>
                                                            <Button onClick={() => confirmDelete(val.id)}>Delete</Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </b>
                                                </TableCell>
                                            </React.Fragment>
                                        )
                                    })
                                }
                                <TableCell style={{ textAlign: "center" }}><b style={{ marginLeft: "-90px" }}>Action</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {userData.map((user, ind) => (
                                <TableRow key={ind}>
                                    <TableCell component="th" scope="row">
                                        {ind + 1}
                                    </TableCell>
                                    <TableCell> {user.name}</TableCell>
                                    <TableCell >{user.email}</TableCell>
                                    {
                                        table.map((val, ind) => {
                                            console.log(val, "vallllll");
                                            return (
                                                <React.Fragment key={ind}>
                                                    <TableCell key={val.id}>
                                                        {user.rowdata && user.rowdata[val.row] ? user.rowdata[val.row] : ''}
                                                    </TableCell>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                    <TableCell >
                                        <div className="row" style={{ textAlign: "center" }}>
                                            <div className="col-5">
                                                <CommonButton content={"deleteData"} onClick={() => deleteUser(user.id)} />
                                            </div>
                                            <div className="col-5 ">
                                                <CommonButton content={"editData"} onClick={() => viewUserData(user.id)} />
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>
            {/* modle */}

            <div>
                <Modal
                    open={editModleOpen}
                    onClose={editModlehandleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} >
                        <h5>USER DATA</h5>
                        <label htmlFor="">name</label><br />
                        <input type="text" placeholder='name' name='name' disabled
                            id="filled-disabled"
                            label="Disabled" value={viewData.name} /><br /><br />
                        <label htmlFor="">email</label><br />
                        <input type="text" placeholder='email' disabled
                            id="filled-disabled"
                            label="Disabled" name='email' value={viewData.email} /><br />
                        {
                            table.map((val, ind) => {
                                return (
                                    < React.Fragment key={ind}>
                                        <br />
                                        <label htmlFor="">{val.row}</label><br />
                                        <input type="text" placeholder={val.row} name={val.row} onChange={handleRowData} />
                                        <br />
                                    </React.Fragment>
                                )
                            })
                        }
                        <div className="row mt-3">
                            <div className="col-4">
                                <CommonButton content={"submit"} onClick={() => submitUserData(viewData.id)} />
                            </div>
                            <div className="col-4" style={{ marginLeft: "-30px" }}>
                                <CommonButton content={"cancle"} onClick={editModlehandleClose} />

                            </div>
                        </div>



                    </Box>
                </Modal>
            </div >
        </>
    );
}

export default TableData
// export updateObj