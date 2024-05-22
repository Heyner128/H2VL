import {IsEmail, IsNotEmpty} from "class-validator";

export default class ContactFormDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  message: string;
}
