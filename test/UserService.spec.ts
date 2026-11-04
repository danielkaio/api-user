import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/service/UserService';
import { User } from '../src/repository/UserRepository';
import { getModelToken } from '@nestjs/sequelize';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const mockUserModel = {
      findAll: jest.fn().mockResolvedValue([
        {
          id: 1,
          nome: 'João',
          isactive: true,
        },
      ]),
      destroy: jest.fn().mockResolvedValue(1),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar todos os usuários', async () => {
    const users = await service.findAll();
    expect(users).toEqual([
      {
        id: 1,
        nome: 'João',
        isactive: true,
      },
    ]);
  });

  it('deve deletar todos os usuários', async () => {
    const result = service.deleteAll();
    expect(result).toBeUndefined();
  });
});
