import { Grid2 } from '@mui/material'
import { selectGlobal, useAppSelector } from '../../redux'
import { QuestionCard } from './QuestionCard.tsx'
import { Question } from '../../common/entities/question.ts'

export function QuestionsPanel() {
    const questions: Question[] = useAppSelector(selectGlobal.questions)
    const questionTypeIndex: number = useAppSelector(selectGlobal.questionTypeIndex)

    function shouldBeDisplayed(question: Question): boolean {
        return questionTypeIndex == -1 || question.questionTypeIndex == questionTypeIndex
    }

    return (
        <Grid2 container spacing={2}
               sx={{
                   padding: '2rem 1rem',
                   height: 'auto',
               }}>
            {questions.filter(shouldBeDisplayed).map((question) => (
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
