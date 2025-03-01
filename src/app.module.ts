import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MariaDBConfigService } from './infrastructure/config/mariadb.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: MariaDBConfigService,
      inject: [MariaDBConfigService],
    }),
    UserModule,
  ],
})
export class AppModule {}
