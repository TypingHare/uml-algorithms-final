import { Box, Typography } from '@mui/material'

export function AboutPanel() {
    return (
        <Box sx={{ padding: '2rem 1rem' }}>
            <Typography variant="body1">
                This website is crafted by&nbsp;
                <a href="mailto:zhuojian_chen@student.uml.edu">James Chen</a>.
                It serves as a platform sharing practice exercises for the&nbsp;
                <b>Analysis of Algorithms</b> final exam.
            </Typography>
            <br />
            <Typography variant="body1">
                In the final class, Professor Wang said we are allowed to share
                questions and discuss with each others.
            </Typography>
        </Box>
    )
}
