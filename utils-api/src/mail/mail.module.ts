import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import NewsletterSubscriber from "./models/newsletterSubscriber.model";

@Module({
  imports: [TypeOrmModule.forFeature([NewsletterSubscriber])],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {

}
