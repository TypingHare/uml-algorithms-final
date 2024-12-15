import { Injectable, Logger } from '@nestjs/common'
import * as fs from 'node:fs'
import { QUESTION_FILE_PATH, TOPICS_FILE_PATH } from './constant.js'
import { Question } from './entity/question.js'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name)
    private readonly topics: string[] = []
    private readonly questions: Question[] = []

    public constructor() {
        this.loadTopics()
        this.loadQuestions()

        setInterval(() => {
            this.persistQuestions()
            this.logger.log('Persisted questions.')
        }, HourMinuteSecond.ofMinutes(5).ms)
    }

    /**
     * Returns all the topics specified in Blackboard.
     */
    public getTopics(): string[] {
        return this.topics
    }

    /**
     * Returns all questions.
     */
    public getQuestions(): Question[] {
        return this.questions.filter((question) => !!question)
    }

    /**
     * Creates a new question.
     */
    public createQuestion(question: Partial<Question>): Question {
        const id = this.questions.length
        const newQuestion: Question = {
            id,
            question: question.question,
            answer: question.answer || '',
            questionTypeIndex: question.questionTypeIndex || 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            contributors: question.contributors
                ? [...question.contributors]
                : [],
        }

        this.questions.push(newQuestion)
        setTimeout(() => {
            this.persistQuestions()
        }, HourMinuteSecond.ofSeconds(1).ms)

        return newQuestion
    }

    public updateQuestion(newQuestion: Partial<Question>): Question | null {
        const { id } = newQuestion
        if (id === undefined || id < 0 || id > this.questions.length) {
            return null
        }

        const question = this.questions[id]
        if (!question) return null

        Object.assign(question, newQuestion)
        question.updatedAt = new Date()

        return question
    }

    public deleteQuestion(id: number): Question {
        if (id < 0 || id > this.questions.length) {
            return
        }

        const question = this.questions[id]
        this.questions[id] = null

        return question
    }

    private loadTopics(): void {
        const content: string = fs.readFileSync(TOPICS_FILE_PATH, 'utf8')
        const topics: string[] = JSON.parse(content)
        topics.forEach((it) => this.topics.push(it))

        this.logger.log('Loaded all topics.')
    }

    private loadQuestions(): void {
        const content: string = fs.readFileSync(QUESTION_FILE_PATH, 'utf8')
        const questions: Question[] = JSON.parse(content)
        questions.forEach((it) => this.questions.push(it))

        this.logger.log('Loaded all questions.')
    }

    private persistQuestions(): void {
        const savedQuestions: Question[] = this.questions.sort(
            (q1, q2) => q1.id - q2.id
        )
        const content: string = JSON.stringify(savedQuestions)
        fs.writeFileSync(QUESTION_FILE_PATH, content)
    }
}
