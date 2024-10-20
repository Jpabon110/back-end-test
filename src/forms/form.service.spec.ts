import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormService } from './forms.service';
import { FieldType, Form, FormDocument } from './forms.schema';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

describe('FormService', () => {
  let service: FormService;
  let mockFormModel: Model<FormDocument>;

  const mockForm = {
    _id: 'someId',
    name: 'Test Form',
    fields: [{ name: 'field1', type: 'text' }],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormService,
        {
          provide: getModelToken(Form.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            prototype: {
              save: jest.fn(),
            },
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FormService>(FormService);
    mockFormModel = module.get<Model<FormDocument>>(getModelToken(Form.name));
  });

  describe('create', () => {
    it('should create a new form', async () => {
      const createFormDto: CreateFormDto = {
        name: 'Test Form',
        fields: [{ name: 'field1', label: 'Field 1', type: FieldType.TEXT, required: true }],
      };

      jest.spyOn(mockFormModel, 'create').mockResolvedValueOnce(mockForm as any);

      const result = await service.create(createFormDto);
      expect(result).toEqual(mockForm);
    });
  });

  describe('findAll', () => {
    it('should return all forms', async () => {
      jest.spyOn(mockFormModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce([mockForm]),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual([mockForm]);
    });
  });

  describe('findOne', () => {
    it('should return a single form', async () => {
      jest.spyOn(mockFormModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockForm),
      } as any);

      const result = await service.findOne('someId');
      expect(result).toEqual(mockForm);
    });
  });

  describe('update', () => {
    it('should update a form', async () => {
      const updateFormDto: UpdateFormDto = {
        name: 'Updated Form',
      };

      jest.spyOn(mockFormModel, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({ ...mockForm, ...updateFormDto }),
      } as any);

      const result = await service.update('someId', updateFormDto);
      expect(result).toEqual({ ...mockForm, ...updateFormDto });
    });
  });

  describe('delete', () => {
    it('should delete a form', async () => {
      jest.spyOn(mockFormModel, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockForm),
      } as any);

      const result = await service.delete('someId');
      expect(result).toEqual(mockForm);
    });
  });
});