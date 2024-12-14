import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common'
import { AppService } from './app.service.js'
import { Response } from './response.js'
import { Question } from './entity/question.js'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('topics')
    public getTopics(): Response<string[]> {
        return {
            status: HttpStatus.OK,
            message: 'Got topics successfully.',
            data: this.appService.getTopics(),
        }
    }

    @Get('questions')
    public getQuestions(): Response<Question[]> {
        return {
            status: HttpStatus.OK,
            message: 'Got questions successfully.',
            data: this.appService.getQuestions(),
        }
    }

    @Post('questions')
    public postQuestion(
        @Body() question: Partial<Question>
    ): Response<Question> {
        if (!question.question) {
            throw new HttpException(
                'Question is not specified.',
                HttpStatus.BAD_REQUEST
            )
        }

        const createdQuestion = this.appService.createQuestion(question)
        return {
            status: HttpStatus.OK,
            message: 'Added question successfully',
            data: createdQuestion,
        }
    }
}
