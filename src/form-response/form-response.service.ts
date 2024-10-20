import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form, FormDocument } from '../forms/forms.schema';
import { FormResponse, FormResponseDocument } from './form-response.schema';

@Injectable()
export class FormResponseService {
  constructor(
    @InjectModel(Form.name) private formModel: Model<FormDocument>,
    @InjectModel(FormResponse.name) private formResponseModel: Model<FormResponseDocument>, // Este también
  ) {}

  // Este método utiliza los modelos para interactuar con la base de datos, pero devuelve documentos
  async submitFormResponse(
    formId: string, 
    fields: { name: string, value: string }[]
  ): Promise<FormResponseDocument> {
    const form: FormDocument | null = await this.formModel.findById(formId).exec();
    if (!form) {
      throw new NotFoundException('Formulario no encontrado');
    }

    const fieldNames = form.fields.map(field => field.name); // form ya es del tipo FormDocument
    const invalidResponses = fields.filter(res => !fieldNames.includes(res.name));

    if (invalidResponses.length > 0) {
      throw new Error('Algunas respuestas no corresponden a los campos del formulario.');
    }

    const formResponse = await this.formResponseModel.create({
      form_id: formId,
      fields
    });

    return formResponse;
  }
}
