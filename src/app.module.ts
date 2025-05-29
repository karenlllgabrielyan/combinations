import { Module } from '@nestjs/common';
import { CombinationsModule } from './combinations/combinations.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    CombinationsModule,
    DatabaseModule
  ],
})
export class AppModule {}
