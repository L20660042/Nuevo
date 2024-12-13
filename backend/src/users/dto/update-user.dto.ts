import { IsOptional, IsString, IsEmail, Matches } from 'class-validator';
import { Role } from '../schemas/user.schema';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName?: string; // Nombre completo del usuario

  @IsOptional()
  @IsEmail()
  email?: string; // Correo electrónico

  @IsOptional()
  @IsString()
  role?: Role; // Rol del usuario (usando el enum Role)

  @IsOptional()
  @IsString()
  carrera?: string; // Carrera (opcional)

  @IsOptional()
  @Matches(/^[0-9]+$/, {
    message: 'El teléfono solo debe contener números',
  })
  telefono?: string; // Teléfono (opcional, solo números)
}
