import { Box, Card } from '@mui/material'
import { useDispatch } from 'react-redux'
import { operateGlobal } from '../../redux'

export function TypeCard(props: TypeCardProps) {
    const { index, type, numQuestions } = props
    const dispatch = useDispatch()

    function handleClick() {
        dispatch(operateGlobal.setTabIndex(1))
        dispatch(operateGlobal.setQuestionTypeIndex(index))
    }

    return (
        <Card sx={{
            padding: '1rem',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#e2eafc',
            },
        }} onClick={handleClick}>
            <Box sx={{
                fontSize: '1.15rem',
                fontWeight: 'bold',
                height: 'auto',
            }}>
                {type}
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
                {numQuestions} questions
            </Box>
        </Card>
    )
}

export interface TypeCardProps {
    index: number
    type: string
    numQuestions: number
}
