import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FieldDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

export class FormResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldDto)
  fields: FieldDto[];
}
