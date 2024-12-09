// src/users/users.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto'; // Importamos el DTO de Login
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Ruta para registrar un nuevo usuario
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // Ruta para hacer login de usuario
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const loginResponse = await this.usersService.login(loginDto);
      return loginResponse; // Retornamos el token y el rol
    } catch (error) {
      return { message: error.message || 'Error al iniciar sesión' };
    }
  }
}
