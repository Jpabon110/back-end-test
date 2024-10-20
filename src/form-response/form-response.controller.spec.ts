import { Test, TestingModule } from '@nestjs/testing';
import { FormResponseController } from './form-response.controller';
import { FormResponseService } from './form-response.service';
import { FormResponseDto } from './dto/form-response.dto';

describe('FormResponseController', () => {
  let controller: FormResponseController;
  let service: FormResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormResponseController],
      providers: [
        {
          provide: FormResponseService,
          useValue: {
            submitFormResponse: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FormResponseController>(FormResponseController);
    service = module.get<FormResponseService>(FormResponseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('submitResponse', () => {
    it('should call submitFormResponse method with correct parameters and return the result', async () => {
      const formId = 'testFormId';
      const formResponseDto: FormResponseDto = {
        fields: [
          { name: 'field1', value: 'value1' },
          { name: 'field2', value: 'value2' },
        ],
      };
      const mockServiceResponse = {
        _id: 'responseId',
        form_id: formId,
        fields: formResponseDto.fields,
      };

      jest.spyOn(service, 'submitFormResponse').mockResolvedValue(mockServiceResponse as any);

      const result = await controller.submitResponse(formId, formResponseDto);

      expect(service.submitFormResponse).toHaveBeenCalledWith(formId, formResponseDto.fields);
      expect(result).toEqual(mockServiceResponse);
    });

    it('should throw an error if service throws an error', async () => {
      const formId = 'testFormId';
      const formResponseDto: FormResponseDto = {
        fields: [
          { name: 'field1', value: 'value1' },
        ],
      };
      const errorMessage = 'Error submitting form response';

      jest.spyOn(service, 'submitFormResponse').mockRejectedValue(new Error(errorMessage));

      await expect(controller.submitResponse(formId, formResponseDto)).rejects.toThrow(errorMessage);
    });
  });
});