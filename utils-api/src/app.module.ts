import { Module } from '@nestjs/common';
import { WebhookModule } from './webhook/webhook.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveStaticOptions: { index: false },
    }),
    WebhookModule,
    MailModule,
  ],
})
export class AppModule {}
