import { Author } from '../author/author.entity';
import { ConfigService } from '@nestjs/config';
import { HashingService } from './../shared/hashing/hashing.service';
import { Injectable } from '@nestjs/common';
import { AuthorService } from '../author/author.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private authorService: AuthorService, private hashingService: HashingService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.authorService.getOneByUsername(username);
    if (user && await this.hashingService.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
  async login(user: Author) {
    const payload = { username: user.username, userId: user.id, name: user.name };
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}