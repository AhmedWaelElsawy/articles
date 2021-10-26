import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";


export const DatabaseModule = TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const dbUri = `postgres://${configService.get('DATABASE_USER')}:${configService.get('DATABASE_PASS')}@surus.db.elephantsql.com/`;
  
      console.log(`Attempting connection to ${dbUri}`);
      const config: PostgresConnectionOptions = {
        type: 'postgres',
        url: dbUri,
        database: configService.get('DATABASE_NAME'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASS'),
        entities: [
            __dirname + '/**/*.entity{.ts,.js}',
        ],
        synchronize: true,
    };
      return config;
    },
    inject: [ConfigService],
  });
