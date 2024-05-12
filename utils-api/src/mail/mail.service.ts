import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly smtpTransport: nodemailer.Transporter<SMTPTransport.SentMessageInfo>,
  ) {
    this.smtpTransport = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT' ?? 547),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  sendMail(options: Mail.Options) {
    this.smtpTransport.sendMail(options);
  }
}
