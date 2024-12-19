import { Question } from '../../common/entities/question.ts'
import { Card, CardContent } from '@mui/material'
import { useState } from 'react'

export function QuestionCard(props: QuestionCardProps) {
    const { question } = props
    const [showAnswer, setShowAnswer] = useState(false)

    function handleMouseDown() {
        setShowAnswer(true)
    }

    function handleMouseUp() {
        setShowAnswer(false)
    }

    return (
        <Card sx={{
            padding: '1rem',
            minHeight: '6rem',
            width: '100%',
            userSelect: 'none',
            webkitUserSelect: 'none',
            cursor: 'pointer',
            color: showAnswer ? '#7251b5' : 'inherit',
            '&:hover': {
                backgroundColor: '#e2eafc',
            },
        }} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            <CardContent>
                {showAnswer ? question.answer : question.question}
            </CardContent>
        </Card>
    )
}

export interface QuestionCardProps {
    question: Question
}
