import axios from 'axios'
import { Question } from './entities/question.ts'

export const API_DOMAIN = 'https://www.james-chan.me/algorithms-final'

export interface Response<T> {
    status: number
    message: string
    data: T
}

let topics: string[] | null = null
let questions: Question[] | null = null

export async function getTopics(): Promise<string[]> {
    if (!topics) {
        const response: Response<string[]>
            = (await axios.get(API_DOMAIN + '/topics')).data

        topics = response.data
    }

    return topics
}

export async function getQuestions(): Promise<Question[]> {
    if (!questions) {
        const response: Response<Question[]>
            = (await axios.get(API_DOMAIN + '/questions')).data
        questions = response.data
    }

    return questions
}

export async function submitQuestion(question: Partial<Question>): Promise<void> {
    await axios.post(API_DOMAIN + '/questions', question)
}
