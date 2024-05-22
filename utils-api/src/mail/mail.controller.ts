import { Body, Controller, Post, Res, Delete, Param } from '@nestjs/common';
import { MailService } from './mail.service';
import ContactFormDto from '../dto/contactForm.dto';
import { ConfigService } from '@nestjs/config';
import type { FastifyReply } from 'fastify';
import contactFormMailTemplate from './templates/contactForm.mail.template';
import NewsletterSubscriberDto from '../dto/newsletterSubscriber.dto';
import NewsletterSubscriber from './models/newsletterSubscriber.model';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  @Post('contact-form')
  async sendContactForm(
    @Body() requestBody: ContactFormDto,
    @Res() res: FastifyReply,
  ) {
    await this.mailService.sendMail({
      from: `H2VL <${this.configService.get<string>('MAIL_SENDER')}>`,
      to: [this.configService.get<string>('CONTACT_FORM_RECEIVER') ?? ''],
      cc: [requestBody.email.toLowerCase()],
      subject: `[FORMULAIRE CONTACT] nouveau message de ${requestBody.email}`,
      html: contactFormMailTemplate(requestBody),
    });
    res.status(204).send();
  }

  @Post('newsletter-subscribe')
  async subscribeToNewsletter(
    @Body() requestBody: NewsletterSubscriberDto,
    @Res() res: FastifyReply,
  ) {
    const newSubscriber: NewsletterSubscriber = new NewsletterSubscriber();
    newSubscriber.name = requestBody.name;
    newSubscriber.email = requestBody.email;
    newSubscriber.subscribeDate = new Date();
    await this.mailService.subscribeToNewsletter(newSubscriber);
    await this.mailService.sendNewsletter();
    res.status(204).send();
  }

  @Delete('newsletter-unsubscribe/:email')
  async unsubscribeFromNewsletter(
    @Param('email') email: string,
    @Res() res: FastifyReply,
  ) {
    await this.mailService.unsubscribeFromNewsletter(email);
    res.status(204).send();
  }
}
