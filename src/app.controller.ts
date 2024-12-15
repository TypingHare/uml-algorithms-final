import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Put, Query,
} from '@nestjs/common'
import { AppService } from './app.service.js'
import { Response } from './response.js'
import { Question } from './entity/question.js'
import { ConfigService } from '@nestjs/config'
import { Invitation } from './entity/invitation.js'

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly configService: ConfigService
    ) {}

    @Get('invitation-code')
    public check(@Query() invitation: Invitation): Response<boolean> {
        const isCorrect = invitation.code === process.env.INVITATION_CODE

        return isCorrect
            ? {
                  status: HttpStatus.OK,
                  message: 'Invitation Code is correct',
                  data: true,
              }
            : {
                  status: HttpStatus.FORBIDDEN,
                  message: 'Invitation Code is incorrect',
                  data: false,
              }
    }

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

    @Put('questions')
    public updateQuestion(
        @Body() question: Partial<Question>
    ): Response<Question> {
        const newQuestion = this.appService.updateQuestion(question)
        if (newQuestion == null) {
            throw new HttpException(
                'Question ID is not specified',
                HttpStatus.BAD_REQUEST
            )
        }

        return {
            status: HttpStatus.OK,
            message: 'Updated question successfully',
            data: newQuestion,
        }
    }

    @Delete('questions')
    public deleteQuestion(
        @Body() question: Partial<Question>
    ): Response<Question> {
        const { id } = question
        if (!id) {
            throw new HttpException(
                'Question ID is not specified',
                HttpStatus.BAD_REQUEST
            )
        }

        const deletedQuestion = this.appService.deleteQuestion(id)

        return {
            status: HttpStatus.OK,
            message: 'Updated question successfully',
            data: deletedQuestion,
        }
    }
}
