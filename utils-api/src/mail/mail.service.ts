import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  private readonly smtpTransport: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  constructor(private readonly configService: ConfigService) {
    this.smtpTransport = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT' ?? 547),
      secure: false,
      requireTLS: true,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
      connectionTimeout: 8000
    });
  }

  async sendMail(options: Mail.Options) {
    await this.smtpTransport.sendMail(options);
  }
}
