import { IsEmail, IsNotEmpty } from 'class-validator';

export default class NewsletterSubscriberDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
