import { Test, TestingModule } from '@nestjs/testing';

import { GeneratorsService } from '../generators.service';

import { ComponentController } from './component.controller';

describe('ComponentController', () => {
  let controller: ComponentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentController],
      providers: [
        { provide: GeneratorsService, useValue: { execSync: jest.fn() } },
      ],
    }).compile();

    controller = module.get<ComponentController>(ComponentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
