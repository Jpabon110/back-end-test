import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FormResponseDocument = FormResponse & Document;

@Schema({_id: false})
class FieldResponse {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: string;
}

@Schema({ timestamps: true })
export class FormResponse {
  @Prop({ type: Types.ObjectId, ref: 'Form', required: true })
  form_id: Types.ObjectId;

  @Prop({ type: [FieldResponse], required: true })
  fields: FieldResponse[];
}

export const FormResponseSchema = SchemaFactory.createForClass(FormResponse);
