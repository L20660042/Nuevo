import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto'; // Importamos el DTO de Login

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
}
