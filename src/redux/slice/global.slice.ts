import { Question } from '../../common/entities/question.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store.ts'

export interface GlobalState {
    tabIndex: number
    topics: string[]
    questions: Question[]
    questionTypeIndex: number
}

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        tabIndex: 0,
        topics: [],
        questions: [],
        questionTypeIndex: -1,
    } as GlobalState,
    reducers: {
        setTabIndex: (state, tabIndex: PayloadAction<GlobalState['tabIndex']>) => {
            state.tabIndex = tabIndex.payload
        },
        setTopics: (
            state: GlobalState,
            topics: PayloadAction<GlobalState['topics']>,
        ) => {
            state.topics = [...topics.payload]
        },
        setQuestions: (
            state: GlobalState,
            questions: PayloadAction<GlobalState['questions']>,
        ) => {
            state.questions = [...questions.payload]
        },
        setQuestionTypeIndex: (
            state: GlobalState,
            questionTypeIndex: PayloadAction<GlobalState['questionTypeIndex']>,
        ) => {
            const index = questionTypeIndex.payload
            state.questionTypeIndex = index
            window.history.pushState(null, '', `?type=${index}`)
        },
    },
})

export const selectGlobal = {
    tabIndex: (state: RootState) => state.global.tabIndex,
    topics: (state: RootState) => state.global.topics,
    questions: (state: RootState) => state.global.questions,
    questionTypeIndex: (state: RootState) => state.global.questionTypeIndex,
}

export const operateGlobal = {
    setTabIndex: globalSlice.actions.setTabIndex,
    setTopics: globalSlice.actions.setTopics,
    setQuestions: globalSlice.actions.setQuestions,
    setQuestionTypeIndex: globalSlice.actions.setQuestionTypeIndex,
}

export const globalReducer = globalSlice.reducer
