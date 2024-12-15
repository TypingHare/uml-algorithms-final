import { Alert, Box } from '@mui/material'

export function AboutPanel() {
    return (
        <Box sx={{ padding: '2rem 1rem' }}>
            <Alert severity="info">
                This website was created by&nbsp;
                <a href="mailto:zhuojian_chen@student.uml.edu">James Chen</a>.
                It serves as a platform for sharing practice exercises for
                the&nbsp;<b>Analysis of Algorithms</b> final exam.
            </Alert>
            <br/>
            <Alert severity="warning">
                In the final class, Professor Wang mentioned that we are
                encouraged to share questions and discuss them with one another.
            </Alert>
        </Box>
    )
}
