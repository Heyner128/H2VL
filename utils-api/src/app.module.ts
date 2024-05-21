import { Module } from '@nestjs/common';
import { WebhookModule } from './webhook/webhook.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { TypeOrmModule } from '@nestjs/typeorm';
import NewsletterSubscriber from './mail/models/newsletterSubscriber.model';
import { ScheduleModule } from '@nestjs/schedule';

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
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_FILENAME,
      entities: [NewsletterSubscriber],
      synchronize: false,
    }),
    ScheduleModule.forRoot(),
    WebhookModule,
    MailModule,
  ],
})
export class AppModule {}
