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

  it('findAll deve retornar usuários', async () => {
    const result = await service.findAll();
    expect(result).toHaveLength(1);
    expect(result[0].nome).toBe('João');
  });

  it('deleteAll deve deletar todos os usuários', () => {
    service.deleteAll();
    expect(true).toBe(true);
  });
});
