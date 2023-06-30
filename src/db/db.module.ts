import { DynamicModule, Global, Module } from '@nestjs/common';
import { DbService } from './db.service';

@Global()
@Module({})
export class DbModule {
  static forRoot(options: { path: string }): DynamicModule {
    return {
      module: DbModule,
      providers: [
        {
          provide: 'DB_PATH',
          useValue: options,
        },
      ],
      exports: ['DB_PATH'],
    };
  }

  static forFeature(entities: any): DynamicModule {
    const providers = entities.map((value) => ({
      provide: value.name,
      useFactory: (options: { path: string }) => {
        return new DbService<typeof value>(options, value);
      },
      inject: ['DB_PATH'],
    }));

    return {
      module: DbModule,
      providers,
      exports: entities.map((entity) => entity.name),
    };
  }
}
