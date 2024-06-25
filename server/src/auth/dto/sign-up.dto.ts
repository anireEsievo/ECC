import { IsNotEmpty } from 'class-validator';
export class SignUpDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  publicKey: string;

  @IsNotEmpty()
  privateKey: string;
}
