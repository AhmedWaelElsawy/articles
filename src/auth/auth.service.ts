import { HashingService } from './../shared/hashing/hashing.service';
import { Injectable } from '@nestjs/common';
import { AuthorService } from '../author/author.service';

@Injectable()
export class AuthService {
  constructor(private authorService: AuthorService, private hashingService: HashingService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.authorService.getOneByUsername(username);
    if (user && await this.hashingService.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}