//src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Enum para los roles disponibles
export enum Role {
  ALUMNO = 'ALUMNO',
  DIVISION = 'DIVISION',
  ASESOR = 'ASESOR',
  JEFECARRERA = 'JEFECARRERA',
  DOCENTE = 'DOCENTE',
  GTIV = 'GTIV',
  ADMIN = 'ADMIN',
}

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ enum: Role, default: Role.ALUMNO })
  role: Role;

  // Campo opcional para la carrera, no es requerido
  @Prop({ required: false })
  carrera?: string;

  // Campo opcional para telefono, con validación para aceptar solo números
  @Prop({ required: false, match: /^[0-9]+$/ })
  telefono?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
