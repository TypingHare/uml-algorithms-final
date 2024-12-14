import { Box, Card } from '@mui/material'
import { useDispatch } from 'react-redux'
import { operateGlobal } from '../../redux'

export function TypeCard(props: TypeCardProps) {
    const { index, type } = props
    const dispatch = useDispatch()

    function handleClick() {
        window.history.pushState(null, '', `?type=${index}`)
        dispatch(operateGlobal.setTabIndex(1))
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
            {/*<Box sx={{ marginLeft: 'auto' }}>*/}
            {/*    0 questions*/}
            {/*</Box>*/}
        </Card>
    )
}

export interface TypeCardProps {
    index: number
    type: string
}
