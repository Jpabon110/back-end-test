import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Form, FormSchema } from './forms.schema';
import { FormsController } from './forms.controller';
import { FormService } from './forms.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Form.name, schema: FormSchema },
  ])],
  controllers: [FormsController],
  providers: [FormService],
})
export class FormsModule {}
