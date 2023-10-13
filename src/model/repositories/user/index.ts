import { User } from '../../entities/User';
import dataSource from '../../../ormconfig';
import { Repository, FindOptionsWhere } from 'typeorm';
import bcrypt from 'bcrypt';

class UserRepo {
  readonly repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async create(
    email: string,
    password: string,
    name: string,
    dateOfBirth: Date,
    role: string
  ): Promise<User | null> {
    try {
      const user = new User();

      user.email = email;
      user.password = await this.hashPassword(password);
      user.name = name;
      user.dateOfBirth = new Date(dateOfBirth.toISOString());
      user.verificationPath = '';
      user.role = role;

      return await this.repository.save(user);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async findByParam(param: FindOptionsWhere<User>): Promise<User | null> {
    return await this.repository.findOneBy(param);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(password, salt);
  }

  async checkPassword(
    userPassword: string,
    password: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }
}

export default UserRepo;
