import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './core/config/config';
import { ErrorMap, ErrorCode } from './core/exception/error';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: true,
        playground: configService.get('graphql.playground'),
        debug: configService.get('graphql.debug'),
        formatError: (error) => {
          const originalError = error.extensions?.originalError as any;
          if (originalError && originalError.errorCode) {
            const errorCode = originalError.errorCode as ErrorCode;
            const errorDef = ErrorMap[errorCode];
            return {
              code: errorDef.statusCode,
              message: errorDef.message,
              error_code: errorCode,
            };
          }

          // 기본 에러 처리
          return {
            message: error.message,
            code: 500,
            error_code: ErrorCode.INTERNAL_SERVER_ERROR,
          };
        },
      }),

      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
