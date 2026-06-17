import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AppConfig } from '../config/app-config.js';
import { PaymentOrmEntity } from './entities/payment.orm-entity.js';
export function createDataSource(config: AppConfig): DataSource {
  return new DataSource({ type:'postgres', host:config.postgres.host, port:config.postgres.port, username:config.postgres.username, password:config.postgres.password, database:config.postgres.database, synchronize:config.postgres.synchronize, logging:config.postgres.logging, entities:[PaymentOrmEntity] });
}
