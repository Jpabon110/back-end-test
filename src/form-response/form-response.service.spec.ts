import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormResponseService } from './form-response.service';
import { Form, FormDocument } from '../forms/forms.schema';
import { FormResponse, FormResponseDocument } from './form-response.schema';
import { NotFoundException } from '@nestjs/common';

describe('FormResponseService', () => {
  let service: FormResponseService;
  let formModel: Model<FormDocument>;
  let formResponseModel: Model<FormResponseDocument>;

  const mockForm = {
    _id: 'mockFormId',
    fields: [{ name: 'field1' }, { name: 'field2' }],
  };

  const mockFormResponse = {
    _id: 'mockResponseId',
    form_id: 'mockFormId',
    fields: [
      { name: 'field1', value: 'value1' },
      { name: 'field2', value: 'value2' },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormResponseService,
        {
          provide: getModelToken(Form.name),
          useValue: {
            findById: jest.fn().mockReturnThis(),
            exec: jest.fn(),
          },
        },
        {
          provide: getModelToken(FormResponse.name),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FormResponseService>(FormResponseService);
    formModel = module.get<Model<FormDocument>>(getModelToken(Form.name));
    formResponseModel = module.get<Model<FormResponseDocument>>(getModelToken(FormResponse.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('submitFormResponse', () => {
    it('should successfully submit a form response', async () => {
      jest.spyOn(formModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockForm),
      } as any);

      jest.spyOn(formResponseModel, 'create').mockResolvedValue(mockFormResponse as any);

      const result = await service.submitFormResponse('mockFormId', [
        { name: 'field1', value: 'value1' },
        { name: 'field2', value: 'value2' },
      ]);

      expect(formModel.findById).toHaveBeenCalledWith('mockFormId');
      expect(formResponseModel.create).toHaveBeenCalledWith({
        form_id: 'mockFormId',
        fields: [
          { name: 'field1', value: 'value1' },
          { name: 'field2', value: 'value2' },
        ],
      });
      expect(result).toEqual(mockFormResponse);
    });

    it('should throw NotFoundException when form is not found', async () => {
      jest.spyOn(formModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.submitFormResponse('nonExistentFormId', [])).rejects.toThrow(NotFoundException);
    });

    it('should throw an error when invalid responses are provided', async () => {
      jest.spyOn(formModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockForm),
      } as any);

      await expect(
        service.submitFormResponse('mockFormId', [{ name: 'invalidField', value: 'value' }])
      ).rejects.toThrow('Algunas respuestas no corresponden a los campos del formulario.');
    });
  });
});