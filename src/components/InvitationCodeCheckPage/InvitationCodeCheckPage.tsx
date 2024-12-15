import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { checkCode } from '../../common/api.ts'
import { useDispatch } from 'react-redux'
import { operateGlobal } from '../../redux'

export function InvitationCodeCheckPage() {
    const [code, setCode] = useState('')
    const dispatch = useDispatch()

    function handleClick() {
        checkCode(code).then(isCorrect => {
            if (isCorrect) {
                dispatch(operateGlobal.setIsInvited(true))
            } else {
                alert('The invitation code is incorrect.')
            }
        })
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100% !important',
        }}>
            <Box sx={{ width: '250px', height: 'auto' }}>
                <TextField label="Invitation Code" fullWidth variant="outlined"
                           sx={{ mb: 2 }} value={code}
                           onChange={(e) => setCode(e.target.value)} />
                <Button variant="contained" fullWidth
                        onClick={handleClick}>Confirm</Button>
            </Box>
        </Box>
    )
}
