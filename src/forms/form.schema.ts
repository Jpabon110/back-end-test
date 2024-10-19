import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FormDocument = Form & Document;

export enum FieldType {
  TEXT = 'text',
  EMAIL = 'email',
  DATE = 'date',
  TEXTAREA = 'textarea',
  SELECT = 'select'
}

@Schema({_id: false})
class Field {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true, enum: FieldType })
  type: string;

  @Prop({ required: true })
  required: boolean;

  @Prop({ type: [String] })
  values?: string[];

  @Prop()
  defaultValue?: string;
}

@Schema({ timestamps: true })
export class Form {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [Field], required: true })
  fields: Field[];
}

export const FormSchema = SchemaFactory.createForClass(Form);
