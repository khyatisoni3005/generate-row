import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
function CommonButton({ onClick, content }) {
    return (
        <>
            <Stack spacing={2} direction="row">

                <Button variant="contained" onClick={onClick} style={{ padding: "6px 12px" }}>{content}</Button>

            </Stack>
        </>
    )
}

export default CommonButton