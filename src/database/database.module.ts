import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';
import { createTableSchemas } from '../combinations/schemas/createSchemas';

@Global()
@Module({
  providers: [
    {
      provide: 'DB_CONNECTION',
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('DB_HOST');
        const user = configService.get<string>('DB_USER');
        const port = configService.get<number>('DB_PORT');
        const password = configService.get<string>('DB_PASSWORD');
        const dbName = configService.get<string>('DB_NAME');

        const dbConnection = await mysql.createConnection({
          host,
          user,
          port,
          password,
          database: dbName,
          multipleStatements: true,
        });

        // --------------------- Create Tables If Not Exist
        for (const query of createTableSchemas) {
          await dbConnection.query(query);
        }

        return dbConnection;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DB_CONNECTION'],
})
export class DatabaseModule {}
