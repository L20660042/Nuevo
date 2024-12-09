// src/users/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, IsEnum, MinLength, IsString } from 'class-validator';
import { Role } from '../schemas/user.schema';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEnum(Role)
  role: Role;
}
