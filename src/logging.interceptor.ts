import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name)

    public intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>()
        const { method, url } = request

        this.logger.log(`Receive a request: [${method.toUpperCase()}] ${url}`)

        return next.handle()
    }
}
