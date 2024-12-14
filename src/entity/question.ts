export interface Question {
    id: number
    question: string
    answer: string
    questionTypeIndex: number
    createdAt: Date
    updatedAt: Date
    contributors: string[]
}
