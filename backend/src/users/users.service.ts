// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new this.userModel({
      ...rest,
      password: hashedPassword,
    });

    return createdUser.save();
  }

  // Nueva función de login
  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    // Buscar al usuario por el email
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new Error('Correo electrónico o contraseña incorrectos');
    }

    // Comparar la contraseña ingresada con la encriptada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Correo electrónico o contraseña incorrectos');
    }

    // Generar un token JWT
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, 'tu_secreto', { expiresIn: '1h' });

    return {
      message: 'Inicio de sesión exitoso',
      token,
      role: user.role, // Regresamos el rol para redirigir al frontend
    };
  }
  async getUserById(userId: string): Promise<User> {
    return this.userModel.findById(userId).select('-password'); // Excluye la contraseña
  }
  async updateUserById(userId: string, updateData: Partial<User>): Promise<User> {
    if (updateData.password) {
      // Encriptar la nueva contraseña
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
  }
  
  async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().select('-password'); // Excluir contraseña
  }  
}
