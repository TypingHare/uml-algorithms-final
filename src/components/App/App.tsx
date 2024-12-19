import { Box, Container, Tab, Tabs } from '@mui/material'
import { SyntheticEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { operateGlobal, selectGlobal, useAppSelector } from '../../redux'
import { getQuestions, getTopics } from '../../common/api.ts'
import { TypesPanel } from '../TypesPanel'
import { QuestionsPanel } from '../QuestionsPanel'
import { CreateQuestionsPanel } from '../CreateQuestionsPanel'
import { AboutPanel } from '../AboutPanel'
import { InvitationCodeCheckPage } from '../InvitationCodeCheckPage'
import {
    getUrlSearchParams,
    QueryStringKey,
    setUrlSearchParams,
    updateUrlSearchParams,
} from '../../common/window.ts'

export function App() {
    const dispatch = useDispatch()
    const tabIndex = useAppSelector(selectGlobal.tabIndex)
    const isInvited = useAppSelector(selectGlobal.isInvited)

    function checkCurrentUrl() {
        const params = getUrlSearchParams()
        params.forEach((value, key) => {
            if (key == QueryStringKey.TAB) {
                const tabIndex = Number(value) || 0
                params.set(QueryStringKey.TAB, tabIndex.toString())
                dispatch(operateGlobal.setTabIndex(tabIndex))
            }
            if (key === QueryStringKey.QUESTION_TYPE_INDEX) {
                const index = Number(value) || -1
                params.set(QueryStringKey.QUESTION_TYPE_INDEX, index.toString())
                dispatch(operateGlobal.setQuestionTypeIndex(index))
            }
        })

        if (!params.has(QueryStringKey.TAB)) {
            params.set(QueryStringKey.TAB, '0')
        }
        if (!params.has(QueryStringKey.QUESTION_TYPE_INDEX)) {
            params.set(QueryStringKey.QUESTION_TYPE_INDEX, '-1')
        }

        setUrlSearchParams(params)
    }

    useEffect(() => {
        getTopics().then(topics => {
            dispatch(operateGlobal.setTopics(topics))
        })
        getQuestions().then(questions => {
            dispatch(operateGlobal.setQuestions(questions))
        })

        checkCurrentUrl()

        window.addEventListener('popstate', () => {
            checkCurrentUrl()
        })
    }, [])

    function handleTabClick(
        _event: SyntheticEvent<Element, Event>,
        tabIndex: number,
    ) {
        updateUrlSearchParams(params => {
            params.set(QueryStringKey.TAB, tabIndex.toString())
        })
        dispatch(operateGlobal.setTabIndex(tabIndex))
    }

    if (!isInvited) {
        return (
            <Container sx={{
                height: '100vh',
                backgroundColor: '#edf2fb',
                padding: '1rem 0',
            }}>
                <InvitationCodeCheckPage />
            </Container>
        )
    }

    return (
        <Container sx={{
            height: 'auto',
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
