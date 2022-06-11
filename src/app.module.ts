import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtStrategy,
    },
  ],
})
export class AppModule {}
