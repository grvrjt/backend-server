import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseConfigService } from './config/mongoose-config-service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useClass:TypegooseConfigService
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
