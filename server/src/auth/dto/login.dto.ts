import { IsNotEmpty } from 'class-validator';
export class SignInDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;
}
