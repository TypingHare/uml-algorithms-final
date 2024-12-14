import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'

export function CreateQuestionsPanel() {
    const [selectedValue, setSelectedValue] = useState('Unknown')

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setSelectedValue(event.target.value)
    }

    return (
        <Box sx={{ padding: '2rem 1rem' }}>
            <Typography sx={{
                fontWeight: 'bold',
                fontSize: '1.15rem',
                paddingBottom: '0.5rem',
            }}>
                Question
            </Typography>
            <TextField
                multiline
                rows={4}
                sx={{ paddingBottom: '1.5rem', width: '100%' }}
            />

            <Typography sx={{
                fontWeight: 'bold',
                fontSize: '1.15rem',
                paddingBottom: '0.5rem',
            }}>
                Answer
            </Typography>
            <FormControl sx={{ paddingBottom: '1.5rem' }}>
                <RadioGroup row value={selectedValue} onChange={handleChange}>
                    <FormControlLabel control={<Radio />} value="True"
                                      label="True" />
                    <FormControlLabel control={<Radio />} value="False"
                                      label="False" />
                    <FormControlLabel control={<Radio />} value="Unknown"
                                      label="Unknown" />
                </RadioGroup>
            </FormControl>

            <Typography sx={{
                fontWeight: 'bold',
                fontSize: '1.15rem',
                paddingBottom: '0.5rem',
            }}>
                Your Name (Optional)
            </Typography>
            <TextField
                variant="standard"
                sx={{ width: '100%', paddingBottom: '1.5rem' }}
            />

            <Button variant="contained">Submit</Button>
        </Box>
    )
}
