import { Question } from '../../common/entities/question.ts'
import { Card, CardContent } from '@mui/material'
import { useState } from 'react'

export function QuestionCard(props: QuestionCardProps) {
    const { question } = props
    const [showAnswer, setShowAnswer] = useState(false)

    function handleClick() {
        setShowAnswer(it => !it)
    }

    return (
        <Card sx={{
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '7rem',
            userSelect: 'none',
            webkitUserSelect: 'none',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#e2eafc',
            },
        }} onClick={handleClick}>
            <CardContent>
                {showAnswer ? question.answer : question.question}
            </CardContent>
        </Card>
    )
}

export interface QuestionCardProps {
    question: Question
}
