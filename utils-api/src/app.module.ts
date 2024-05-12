import { Module } from '@nestjs/common';
import { WebhookModule } from './webhook/webhook.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    WebhookModule,
    MailModule,
  ],
})
export class AppModule {}
