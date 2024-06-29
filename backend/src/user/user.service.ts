import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { createPasswordHashed, vaildatePassword } from '../utils/password';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from 'src/auth/dtos/loginPayload.dto';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { ReturnLogin } from 'src/auth/dtos/returnLogin.dto';

@Injectable()
export class UserService {
  // Injeção de dependência do repositório do TypeORM
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  // Método para criar um novo usuário
  async createUser(
    createUserDTO: createUserDTO,
    userType?: number,
  ): Promise<ReturnLogin> {
    const user = await this.findUserByEmail(createUserDTO.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadGatewayException(
        'Este email já está cadastrado no sistema. Tente cadastrar outro email.',
      );
    }
    // Criar hash da senha e salvar o novo usuário no banco de dados
    const passwordHashed = await createPasswordHashed(createUserDTO.password);

    const newUser = await this.userRepository.save({
      ...createUserDTO,
      typeUser: userType ? userType : UserType.User,
      password: passwordHashed,
    });

    return {
      accessToken: this.jwtService.sign({
        ...new LoginPayload(newUser),
      }),
      user: new ReturnUserDto(newUser),
    };
  }

  // Método para obter todos os usuários
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`UserId: ${userId} not found.`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException(`Email: ${email} Not Found`);
    }

    return user;
  }
  // Método para atualizar a senha do usuário
  async updatePasswordUser(
    updatePasswordDTO: UpdatePasswordDTO,
    userId: number,
  ): Promise<UserEntity> {
    // Encontrar o usuário pelo ID
    const user = await this.findUserById(userId);
    // Criar hash da nova senha
    const passwordHashed = await createPasswordHashed(
      updatePasswordDTO.newPassword,
    );
    // Validar a senha antiga
    const isMatch = await vaildatePassword(
      updatePasswordDTO.lastPassword,
      user.password || '',
    );
    // Se a senha antiga não for válida, lançar uma exceção
    if (!isMatch) {
      throw new BadRequestException('Senha inválida');
    }
    // Atualizar a senha do usuário no banco de dados
    return this.userRepository.save({
      ...user,
      password: passwordHashed,
    });
  }
}
