import { Controller, Post } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';

@Controller('webhook-proxy')
export class WebhookController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async sendGithubActionRequest() {
    const githubRequestConfig: AxiosRequestConfig<{
      ref: string;
    }> = {
      method: 'POST',
      url: this.configService.get('GITHUB_WEBHOOK_URL'),
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization:
          'Bearer ' + this.configService.get('GITHUB_WEBHOOK_TOKEN'),
        'X-Github-Api-Version': '2022-11-28',
      },
      data: {
        ref: 'main',
      },
    };

    return this.httpService.request(githubRequestConfig);
  }
}
