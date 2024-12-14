import { Grid2 } from '@mui/material'
import { selectGlobal, useAppSelector } from '../../redux'
import { QuestionCard } from './QuestionCard.tsx'

export function QuestionsPanel() {
    const questions = useAppSelector(selectGlobal.questions)

    return (
        <Grid2 container spacing={2} sx={{ padding: '2rem 1rem' }}>
            {questions.map((question) => (
                <Grid2
                    key={question.id}
                    size={{
                        md: 4,
                        sm: 6,
                        xs: 12,
                    }}
                >
                    <QuestionCard question={question} />
                </Grid2>
            ))}
        </Grid2>
    )
}
