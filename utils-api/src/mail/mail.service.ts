import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';
import NewsletterSubscriber from "./models/newsletterSubscriber.model";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Cron, CronExpression} from "@nestjs/schedule";
import fetchApi from "../lib/strapi";
import type Article from "../interfaces/article";
import newsletterMailTemplate from "./templates/newsletter.mail.template";

@Injectable()
export class MailService {
    private readonly smtpTransport: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(NewsletterSubscriber) private readonly newsletterSubscriberRepository: Repository<NewsletterSubscriber>
    ) {

        this.smtpTransport = nodemailer.createTransport({
            host: this.configService.get<string>('SMTP_HOST'),
            port: this.configService.get<number>('SMTP_PORT' ?? 587),
            secure: false,
            requireTLS: true,
            auth: {
                user: this.configService.get<string>('SMTP_USER'),
                pass: this.configService.get<string>('SMTP_PASS'),
            },
            connectionTimeout: 8000,
        });

    }

    async sendMail(options: Mail.Options) {
        await this.smtpTransport.sendMail(options);
    }

    async subscribeToNewsletter(newsletterSubscriber: NewsletterSubscriber) {
        await this.newsletterSubscriberRepository.save<NewsletterSubscriber>(newsletterSubscriber);
    }

    async unsubscribeFromNewsletter(newsletterSubscriber: NewsletterSubscriber) {
        await this.newsletterSubscriberRepository.remove(newsletterSubscriber);
    }

    @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_NOON)
    async sendNewsletter() {
        const articles: Article[] = await fetchApi<Article[]>({
            endpoint: 'articles',
            wrappedByKey: 'data',
            query: {
                populate: "*",
                "pagination[limit]": "4",
                "sort[0]": "createdAt:desc"
            }
        });

        const subscribers: NewsletterSubscriber[] = await this.newsletterSubscriberRepository.find();

        subscribers.forEach(subscriber => {
            this.sendMail({
                from: `H2VL <${this.configService.get<string>('MAIL_SENDER')}>`,
                to: [subscriber.email],
                subject: `[Newsletter] Voici les dernières actualités et événements`,
                html: newsletterMailTemplate(articles),
            })
        });

    }
}
