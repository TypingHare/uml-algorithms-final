import { Alert, Box } from '@mui/material'

export function AboutPanel() {
    return (
        <Box sx={{ padding: '2rem 1rem' }}>
            <Alert severity="success">
                This website was created by&nbsp;
                <a href="mailto:zhuojian_chen@student.uml.edu">James Chen</a>.
                It serves as a platform for sharing practice exercises for
                the&nbsp;<b>Analysis of Algorithms</b> final exam. I don't have
                time to implement a search function, please use the built-in
                search function of the browser to search for the question.
            </Alert>
            <br />
            <Alert severity="info">
                In the final class, Professor Wang mentioned that we are
                encouraged to share questions and discuss them with one another
                before the exam.
            </Alert>
        </Box>
    )
}
