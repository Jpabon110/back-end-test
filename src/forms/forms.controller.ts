import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import {FormService } from './forms.service';
import { Form } from './form.schema';
import { CreateFormDto } from './dto/create-form.dto'; 
import { UpdateFormDto } from './dto/update-form.dto';  

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormService) {}

  @Post()
  async create(@Body() forms: CreateFormDto): Promise<Form> {
    return this.formsService.create(forms);
  }

  @Get()
  async findAll(): Promise<Form[]> {
    return this.formsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Form> {
    return this.formsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() form: UpdateFormDto): Promise<Form> {
    return this.formsService.update(id, form);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Form> {
    return this.formsService.delete(id);
  }
}