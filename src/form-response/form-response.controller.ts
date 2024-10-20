import { Controller, Post, Body, Param } from '@nestjs/common';
import { FormResponseService } from './form-response.service';
import { FormResponseDto } from './dto/form-response.dto';

@Controller('formsResponse')
export class FormResponseController {
  constructor(private readonly formResponseService: FormResponseService) {}

  @Post(':formId/responses')
  async submitResponse(
    @Param('formId') formId: string,
    @Body() body: FormResponseDto
  ) {
    return await this.formResponseService.submitFormResponse(formId, body.fields);
  }
}