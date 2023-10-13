import { Session } from '../../entities/Session';
import dataSource from '../../../ormconfig';
import { Repository, FindOptionsWhere } from 'typeorm';

class SessionRepo {

  readonly repository: Repository<Session>;

  constructor() {
    this.repository = dataSource.getRepository(Session);
  }

  public async findById(id: string): Promise<Session | null> {
    return this.repository.findOneBy({ id });
  }

  public async findByParam(param: FindOptionsWhere<Session>): Promise<Session | null> {
    return this.repository.findOneBy(param);
  }

  public async create(tokenRefresh: string, tokenAccess: string): Promise<Session | null> {
    try {
      const session = new Session();
      session.tokenRefresh = tokenRefresh;
      session.tokenAccess = tokenAccess;
      return this.repository.save(session);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async deleteByToken(token: string, tokenAlias: 'tokenAccess' | 'tokenRefresh'): Promise<boolean> {
    try {
      await this.repository.delete({
        [tokenAlias]: token
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

export default SessionRepo;