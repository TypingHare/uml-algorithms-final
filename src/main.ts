import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'
import { Logger } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // Enable CORS
    app.enableCors()

    // API prefix
    app.setGlobalPrefix('algorithms-final')

    const port = process.env.PORT
    await app.listen(port)

    Logger.log(`Server running on port: ${port}`, 'Bootstrap')
}

bootstrap().then()
