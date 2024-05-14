import { Body, Controller, Post, Res } from '@nestjs/common';
import { MailService } from './mail.service';
import ContactFormDto from 'shared/src/interfaces/contactForm.dto';
import { ConfigService } from '@nestjs/config';
import type { FastifyReply } from 'fastify';
import contactFormMailTemplate from './templates/contactForm.mail.template';

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
      from: this.configService.get<string>('MAIL_SENDER'),
      to: [this.configService.get<string>('CONTACT_FORM_RECEIVER') ?? ''],
      cc: [requestBody.email.toLowerCase()],
      subject: `[FORMULAIRE CONTACT] nouveau message de ${requestBody.email}`,
      html: contactFormMailTemplate(requestBody),
    });
    res.status(204).send();
  }
}
