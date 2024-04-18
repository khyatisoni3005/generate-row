import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CommonButton from './CommonButton'
import { getTableRow } from "../redux/action/tableAction"
import CloseIcon from '@mui/icons-material/Close';
import { getUser } from '../redux/action/userAction';
import { useDispatch, useSelector } from "react-redux"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { deleteRows } from "../redux/action/tableAction"

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

function TableData() {
    const { table } = useSelector((state) => state.table)
    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function deleteRow(id) {
        setOpen(true)
    }
    function confirmDelete(id) {
        console.log(id, "id confirm");
        dispatch(deleteRows(id))
        setOpen(false)
    }



    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTableRow())
        console.log(table, "uf");
    }, [dispatch])

    return (
        <>



            <TableContainer>
                <div className="col-8 mt-5">
                    <Table style={{ textTransform: "capitalize" }}>
                        <TableHead>
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
                                                                Are You Sure That You Want  To Delete The Row ? if yes , click Delete!
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
                                <TableCell><b>Action</b></TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {userData.map((user, ind) => (
                                <TableRow key={ind}>
                                    <TableCell component="th" scope="row">
                                        {ind + 1}
                                    </TableCell>
                                    <TableCell> {user.name}</TableCell>
                                    <TableCell >{user.email}</TableCell>

                                    {/* <TableCell ><CommonButton content={"deleteData"} /></TableCell>
                                    <TableCell ><CommonButton content={"editData"} /></TableCell> */}



                                </TableRow>
                            ))}
                        </TableBody>




                    </Table>
                </div>

            </TableContainer>
        </>
    );
}

export default TableData