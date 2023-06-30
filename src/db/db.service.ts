import { Inject, Injectable } from '@nestjs/common';
import { JsonDB, Config } from 'node-json-db';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DbService<T> {
  private db: JsonDB;

  constructor(
    @Inject('DB_PATH') private options: { path: string },
    entity: any,
  ) {
    if (!fs.existsSync(options.path)) {
      fs.mkdirSync(options.path, { recursive: true });
    }

    const filePath = path.join(options.path, `${entity.name}`);
    this.db = new JsonDB(new Config(filePath, true, true, '/'));
  }

  async save(key: string, data: T): Promise<void> {
    await this.db.push(`/${key}`, data);
    await this.db.save();
  }

  async findOne(key: string): Promise<T> {
    return this.db.getData(key);
  }

  async find(key: string): Promise<T[]> {
    try {
      const data = await this.db.getData(`/${key}`);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return [];
    }
  }

  async updateOne(key: string, data: T): Promise<void> {
    await this.db.push(`/${key}`, data, true);
    await this.db.save();
  }

  async deleteOne(key: string) {
    await this.db.delete(`/${key}`);
    await this.db.save();
  }
}
