import { loadConfig } from './infrastructure/config/app-config.js';
import { createDataSource } from './infrastructure/db/data-source.js';
import { buildApp } from './app.js';
const config = loadConfig();
const dataSource = createDataSource(config);
await dataSource.initialize();
const app = await buildApp(config, dataSource);
await app.listen({ host: config.server.host, port: config.server.port });
