import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormResponse, FormResponseSchema } from '../form-response/form-response.schema';
import { FormResponseController } from './form-response.controller';
import { FormResponseService } from './form-response.service';
import { Form, FormSchema } from '../forms/forms.schema';


@Module({
    imports: [MongooseModule.forFeature([
      { name: FormResponse.name, schema: FormResponseSchema },
      { name: Form.name, schema: FormSchema },
    ])],
    controllers: [FormResponseController],
    providers: [FormResponseService],
  })
export class FormResponseModule {}
