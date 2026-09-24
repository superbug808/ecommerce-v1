import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module.js';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: resolve(process.cwd(), '.env'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        if (!uri) {
          console.error('MONGODB_URI is undefined. Checked path:', resolve(process.cwd(), '.env'));
          throw new Error('MONGODB_URI is not defined in .env');
        }
        return { uri };
      },
    }),
    ProductsModule,
  ],
})
export class AppModule {}