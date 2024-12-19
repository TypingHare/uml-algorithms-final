import { Box, Grid2, TextField } from '@mui/material'
import { selectGlobal, useAppSelector } from '../../redux'
import { Question } from '../../common/entities/question.ts'
import { QuestionCard } from './QuestionCard.tsx'
import { ChangeEvent, useEffect, useState } from 'react'

export function QuestionsPanel() {
    const questions: Question[] = useAppSelector(selectGlobal.questions)
    const questionTypeIndex: number = useAppSelector(selectGlobal.questionTypeIndex)
    const [lastSearchTime, setLastSearchTime] = useState<number>(new Date().getTime())
    const [displayedQuestions, setDisplayedQuestions] = useState<Question[]>(questions)

    useEffect(() => {
        setDisplayedQuestions(questions)
    }, [questions])

    function handleSearchBoxChange(event: ChangeEvent<HTMLInputElement>) {
        const currentTime = new Date().getTime()
        if (currentTime - lastSearchTime <= 500) {
            return
        }

        setLastSearchTime(currentTime)

        const input = event.target.value
        if (input.trim() === '') {
            setDisplayedQuestions(questions)
            return
        }

        const similarQuestions = searchForSimilarQuestions(questions, input, 0.75)
        setDisplayedQuestions(similarQuestions)
    }

    function shouldBeDisplayed(question: Question): boolean {
        return questionTypeIndex == -1 || question.questionTypeIndex == questionTypeIndex
    }

    return (
        <Box sx={{ padding: '2rem 1rem', height: 'auto' }}>
            <TextField label="Search" fullWidth sx={{ mb: 2 }}
                       onChange={handleSearchBoxChange} />

            <Grid2 container spacing={2}>
                {displayedQuestions.filter(shouldBeDisplayed).map((question) => (
                    <Grid2
                        key={question.id}
                        size={{ md: 4, sm: 6, xs: 12 }}
                        sx={{
                            display: 'flex',
                            alignItems: 'stretch',
                        }}
                    >
                        <QuestionCard question={question} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    )
}

function searchForSimilarQuestions(
    questions: Question[],
    input: string,
    similarityThreshold: number,
): Question[] {
    const resultQuestions: Question[] = []
    const inputMap = getAsciiMap(input)
    for (let i = 0; i < questions.length; i++) {
        const questionMap = getAsciiMap(questions[i].question)
        const similarity = getSimilarity(inputMap, questionMap)
        if (similarity > similarityThreshold) {
            resultQuestions.push(questions[i])
        }
    }

    return resultQuestions
}

function getAsciiMap(string: string): number[] {
    const map = new Array(26).fill(0)
    for (let i = 0; i < string.length; ++i) {
        const charCode = string.charCodeAt(i)
        if (charCode >= 65 && charCode <= 90) {
            map[charCode - 65]++
        }

        if (charCode >= 97 && charCode <= 122) {
            map[charCode - 97]++
        }
    }

    return map
}

function getSimilarity(map1: number[], map2: number[]): number {
    if (map1.length != map2.length) {
        throw new Error('The lengths of two maps are different!')
    }

    let total_max = 0
    let total_min = 0
    for (let i = 0; i < map1.length; i++) {
        let a = map1[i]
        let b = map2[i]
        total_max += Math.max(a, b)
        total_min += Math.min(a, b)
    }

    return total_min / total_max
}
