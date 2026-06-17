import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { z } from 'zod';

const schema = z.object({
  server: z.object({ host: z.string(), port: z.number().int() }),
  postgres: z.object({
    host: z.string(), port: z.number().int(), username: z.string(), password: z.string(), database: z.string(), synchronize: z.boolean(), logging: z.boolean()
  }),
  payment: z.object({ maxAmountWithoutReview: z.number() })
});
export type AppConfig = z.infer<typeof schema>;
export function loadConfig(): AppConfig {
  const file = process.env.CONFIG_FILE ?? 'properties.yml';
  const content = fs.readFileSync(path.resolve(process.cwd(), file), 'utf8');
  const parsed = YAML.parse(content);
  return schema.parse(parsed);
}
