import { Test, TestingModule } from '@nestjs/testing';
import { FormsController } from './forms.controller';
import { FormService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FieldType } from './forms.schema';

describe('FormsController', () => {
  let controller: FormsController;
  let service: FormService;

  const mockForm = {
    _id: 'someId',
    name: 'Test Form',
    fields: [{ name: 'field1', label: 'Field 1', type: FieldType.TEXT, required: true }],
    description: "a"
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormsController],
      providers: [
        {
          provide: FormService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FormsController>(FormsController);
    service = module.get<FormService>(FormService);
  });

  describe('create', () => {
    it('should create a form', async () => {
      const createFormDto: CreateFormDto = {
        name: 'Test Form',
        fields: [{ name: 'field1', label: 'Field 1', type: FieldType.TEXT, required: true }],
      };
      
      jest.spyOn(service, 'create').mockResolvedValue(mockForm);
      
      const result = await controller.create(createFormDto);
      
      expect(service.create).toHaveBeenCalledWith(createFormDto);
      expect(result).toBe(mockForm);
    });
  });

  describe('findAll', () => {
    it('should return an array of forms', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockForm]);
      
      const result = await controller.findAll();
      
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockForm]);
    });
  });

  describe('findOne', () => {
    it('should return a single form', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockForm);
      
      const result = await controller.findOne('someId');
      
      expect(service.findOne).toHaveBeenCalledWith('someId');
      expect(result).toBe(mockForm);
    });
  });

  describe('update', () => {
    it('should update a form', async () => {
      const updateFormDto: UpdateFormDto = {
        name: 'Updated Form',
      };
      const updatedMock = { ...mockForm, ...updateFormDto };
      
      jest.spyOn(service, 'update').mockResolvedValue(updatedMock);
      
      const result = await controller.update('someId', updateFormDto);
      
      expect(service.update).toHaveBeenCalledWith('someId', updateFormDto);
      expect(result).toBe(updatedMock);
    });
  });

  describe('delete', () => {
    it('should delete a form', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(mockForm);
      
      const result = await controller.delete('someId');
      
      expect(service.delete).toHaveBeenCalledWith('someId');
      expect(result).toBe(mockForm);
    });
  });
});