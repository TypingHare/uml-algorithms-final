import { Grid2 } from '@mui/material'
import { selectGlobal, useAppSelector } from '../../redux'
import { TypeCard } from './TypeCard.tsx'
import { Question } from '../../common/entities/question.ts'

export function TypesPanel() {
    const topics: string[] = useAppSelector(selectGlobal.topics)
    const questions: Question[] = useAppSelector(selectGlobal.questions)
    const numQuestionsArray: number[] = new Array(topics.length).fill(0)
    questions.forEach((question) => {
        const { questionTypeIndex } = question
        if (questionTypeIndex >= 0 && questionTypeIndex < topics.length) {
            numQuestionsArray[question.questionTypeIndex]++
        }
    })

    return (
        <Grid2
            container
            spacing={2}
            sx={{ margin: '2rem 1rem' }}
        >
            {topics.map((item, index) => (
                <Grid2 size={11} key={index}>
                    <TypeCard
                        index={index}
                        type={item}
                        numQuestions={numQuestionsArray[index]}
                    />
                </Grid2>
            ))}
            <Grid2 size={11} sx={{ paddingTop: '2rem' }}>
                <TypeCard
                    index={-1}
                    type={'ALL'}
                    numQuestions={questions.length}
                />
            </Grid2>
        </Grid2>
    )
}
