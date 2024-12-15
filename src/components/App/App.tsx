import { Box, Container, Tab, Tabs } from '@mui/material'
import { SyntheticEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { operateGlobal, selectGlobal, useAppSelector } from '../../redux'
import { getQuestions, getTopics } from '../../common/api.ts'
import { TypesPanel } from '../TypesPanel'
import { QuestionsPanel } from '../QuestionsPanel'
import { CreateQuestionsPanel } from '../CreateQuestionsPanel'
import { AboutPanel } from '../AboutPanel'

export function App() {
    const dispatch = useDispatch()
    const tabIndex = useAppSelector(selectGlobal.tabIndex)

    function handleTabClick(
        _event: SyntheticEvent<Element, Event>,
        tabIndex: number,
    ) {
        dispatch(operateGlobal.setTabIndex(tabIndex))
    }

    useEffect(() => {
        getTopics().then(topics => {
            dispatch(operateGlobal.setTopics(topics))
        })
        getQuestions().then(questions => {
            dispatch(operateGlobal.setQuestions(questions))
        })
    }, [])

    return (
        <Container sx={{
            minHeight: '100vh',
            backgroundColor: '#edf2fb',
            padding: '1rem 0',
        }}>
            <Box>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabClick}
                >
                    <Tab label="Types" id="panel-types" />
                    <Tab label="Questions" id="panel-questions" />
                    <Tab label="Contribute" id="panel-create-questions" />
                    <Tab label="About" id="about" />
                </Tabs>
            </Box>

            <Box id="panel-types" hidden={tabIndex !== 0}>
                <TypesPanel />
            </Box>
            <Box id="panel-questions" hidden={tabIndex !== 1}>
                <QuestionsPanel />
            </Box>
            <Box id="panel-create-question" hidden={tabIndex !== 2}>
                <CreateQuestionsPanel />
            </Box>
            <Box id="about" hidden={tabIndex !== 3}>
                <AboutPanel />
            </Box>
        </Container>
    )
}
