import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {

    saltOrRounds = 10;

    async hash(data: string): Promise<string> {
        return await bcrypt.hash(data, this.saltOrRounds);
    };

    async compare(data: string, hashed: string): Promise<boolean> {
        return await bcrypt.compare(data, hashed);
    };
}
