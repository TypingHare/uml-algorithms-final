import { Question } from '../../common/entities/question.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store.ts'
import Cookies from 'js-cookie'
import { CookieKey } from '../../common/invitation.ts'

export interface GlobalState {
    isInvited: boolean,
    tabIndex: number
    topics: string[]
    questions: Question[]
    questionTypeIndex: number
}

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        isInvited: Cookies.get(CookieKey.IS_INVITED) === 'true',
        tabIndex: 0,
        topics: [],
        questions: [],
        questionTypeIndex: -1,
    } as GlobalState,
    reducers: {
        setIsInvited(
            state: GlobalState,
            isInvited: PayloadAction<GlobalState['isInvited']>,
        ) {
            state.isInvited = isInvited.payload
            if (isInvited.payload) {
                Cookies.set(CookieKey.IS_INVITED, 'true', { expires: 7 })
            } else {
                Cookies.remove(CookieKey.IS_INVITED)
            }
        },
        setTabIndex: (
            state: GlobalState,
            tabIndex: PayloadAction<GlobalState['tabIndex']>,
        ) => {
            const index = tabIndex.payload
            if (index == state.tabIndex) {
                return
            }

            state.tabIndex = index
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
            if (index == state.questionTypeIndex) {
                return
            }

            state.questionTypeIndex = index
        },
    },
})

export const selectGlobal = {
    isInvited: (state: RootState) => state.global.isInvited,
    tabIndex: (state: RootState) => state.global.tabIndex,
    topics: (state: RootState) => state.global.topics,
    questions: (state: RootState) => state.global.questions,
    questionTypeIndex: (state: RootState) => state.global.questionTypeIndex,
}

export const operateGlobal = {
    setIsInvited: globalSlice.actions.setIsInvited,
    setTabIndex: globalSlice.actions.setTabIndex,
    setTopics: globalSlice.actions.setTopics,
    setQuestions: globalSlice.actions.setQuestions,
    setQuestionTypeIndex: globalSlice.actions.setQuestionTypeIndex,
}

export const globalReducer = globalSlice.reducer
