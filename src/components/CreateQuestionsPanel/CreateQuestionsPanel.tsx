import {
    Alert,
    Box,
    Button,
    Card,
    FormControl,
    FormControlLabel,
    Grid2,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { selectGlobal, useAppSelector } from '../../redux'
import { submitQuestion } from '../../common/api.ts'

export function CreateQuestionsPanel() {
    const topics = useAppSelector(selectGlobal.topics)
    const [question, setQuestion] = useState('')
    const [selectedAnswer, setSelectedAnswer] = useState('Unknown')
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(-1)
    const [contributor, setContributor] = useState('')

    function handleAnswerChange(event: ChangeEvent<HTMLInputElement>) {
        setSelectedAnswer(event.target.value)
    }

    function topicClickProvider(index: number) {
        return function() {
            setSelectedTopicIndex(index)
        }
    }

    function handleSubmit() {
        submitQuestion({
            question: question,
            answer: selectedAnswer,
            questionTypeIndex: selectedTopicIndex,
            contributors: !contributor ? undefined : [contributor],
        }).then(() => {
            alert('Thank you so much for your contribution! Good luck in the final exam!')
            handleClear()
        }).catch(() => {
            alert('Failed to contribute this question! Please contact zhuojian_chen@student.uml.edu.')
        })
    }

    function handleClear() {
        setQuestion('')
        setSelectedAnswer('Unknown')
        setSelectedTopicIndex(-1)
    }

    return (
        <Box sx={{ padding: '2rem 1rem' }}>
            <Alert severity="warning" sx={{ mb: 2 }}>
                Please refrain from submitting questions that already exist!
            </Alert>
            <Typography sx={{
                fontWeight: 'bold',
                fontSize: '1.15rem',
                marginBottom: '0.5rem',
            }}>
                Question
            </Typography>
            <TextField
                multiline
                rows={4}
                sx={{ marginBottom: '1.5rem', width: '100%' }}
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
            />

            <Typography sx={{
                fontWeight: 'bold',
                fontSize: '1.15rem',
                marginBottom: '0.5rem',
            }}>
                Answer
            </Typography>
            <FormControl sx={{ marginBottom: '1.5rem' }}>
                <RadioGroup row value={selectedAnswer}
                            onChange={handleAnswerChange}>
                    <FormControlLabel control={<Radio />} value="True"
                                      label="True" />
                    <FormControlLabel control={<Radio />} value="False"
                                      label="False" />
                    <FormControlLabel control={<Radio />} value="Unknown"
                                      label="Unknown" />
                </RadioGroup>
            </FormControl>

            <Typography sx={{
                fontWeight: 'bold',
                fontSize: '1.15rem',
                marginBottom: '0.5rem',
            }}>
                Question Type
            </Typography>
            <Grid2 container spacing={2} sx={{ marginBottom: '1.5rem' }}>
                {topics.map(((topic, index) => (
                    <Grid2 size={{ md: 4, sm: 6, xs: 12 }} key={index}
                           sx={{ display: 'flex', alignItems: 'stretch' }}>
                        <Card sx={{
                            padding: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: selectedTopicIndex == index ? '#e2eafc' : 'none',
                            cursor: 'pointer',
                            width: '100%',
                        }} onClick={topicClickProvider(index)}>
                            <Box sx={{
                                fontSize: '1.15rem',
                                fontWeight: 'bold',
                                height: 'auto',
                            }}>
                                {topic}
                            </Box>
                        </Card>
                    </Grid2>
                )))}
            </Grid2>

            <Typography sx={{
                fontWeight: 'bold',
                fontSize: '1.15rem',
                marginBottom: '0.5rem',
            }}>
                Your Name (Optional)
            </Typography>
            <TextField
                variant="standard"
                sx={{ width: '100%', marginBottom: '1.5rem' }}
                value={contributor}
                onChange={(event) => setContributor(event.target.value)}
            />

            <Grid2 container spacing={2}>
                <Grid2>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Grid2>
                <Grid2>
                    <Button
                        variant="contained"
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                </Grid2>
            </Grid2>
        </Box>
    )
}
