import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';  
import { Form, FormDocument } from './forms.schema';

@Injectable()
export class FormService {
  constructor(@InjectModel(Form.name) private formModel: Model<FormDocument>) {}

  async create(form: CreateFormDto): Promise<Form> {
    return this.formModel.create(form);
  }

  async findAll(): Promise<Form[]> {
    return this.formModel.find().exec();
  }

  async findOne(id: string): Promise<Form> {
    return this.formModel.findById(id).exec();
  }

  async update(id: string, form: UpdateFormDto): Promise<Form> {
    return this.formModel.findByIdAndUpdate(id, form, { new: true }).exec();
  }

  async delete(id: string): Promise<Form> {
    return this.formModel.findByIdAndDelete(id).exec();
  }
}