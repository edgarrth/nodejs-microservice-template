import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import scalar from '@scalar/fastify-api-reference';
import { DataSource } from 'typeorm';
import { AppConfig } from './infrastructure/config/app-config.js';
import { PaymentOrmEntity } from './infrastructure/db/entities/payment.orm-entity.js';
import { TypeormPaymentRepository } from './infrastructure/db/repositories/typeorm-payment-repository.js';
import { PaymentPolicy } from './domain/services/payment-policy.js';
import { CreatePaymentUseCase } from './application/use-cases/create-payment-use-case.js';
import { GetPaymentUseCase } from './application/use-cases/get-payment-use-case.js';
import { ListPaymentsUseCase } from './application/use-cases/list-payments-use-case.js';
import { CapturePaymentUseCase } from './application/use-cases/capture-payment-use-case.js';
import { RefundPaymentUseCase } from './application/use-cases/refund-payment-use-case.js';
import { PaymentController } from './infrastructure/http/controllers/payment-controller.js';
import { registerPaymentRoutes } from './infrastructure/http/routes/payment-routes.js';
import { DomainError } from './shared/errors/domain-error.js';

export async function buildApp(config: AppConfig, dataSource: DataSource) {
  const app = Fastify({ logger: { transport: process.env.NODE_ENV === 'production' ? undefined : { target: 'pino-pretty' } } });
  await app.register(cors, { origin: true });
  await app.register(helmet);
  await app.register(swagger, { openapi: { info: { title: 'Payment Processing API', version: '1.0.0' } } });
  await app.register(swaggerUi, { routePrefix: '/docs' });
  await app.register(scalar, { routePrefix: '/reference' });

  const paymentRepo = new TypeormPaymentRepository(dataSource.getRepository(PaymentOrmEntity));
  const policy = new PaymentPolicy(config.payment.maxAmountWithoutReview);
  const controller = new PaymentController(
    new CreatePaymentUseCase(paymentRepo, policy), new GetPaymentUseCase(paymentRepo), new ListPaymentsUseCase(paymentRepo), new CapturePaymentUseCase(paymentRepo), new RefundPaymentUseCase(paymentRepo)
  );
  app.get('/health', async () => ({ status: 'UP', service: 'payment-processing', timestamp: new Date().toISOString() }));
  await registerPaymentRoutes(app, controller);
  app.setErrorHandler((err, _req, reply) => {
    if (err instanceof DomainError) return reply.code(400).send({ message: err.message });
    if ('validation' in err) return reply.code(400).send({ message: err.message });
    app.log.error(err); return reply.code(500).send({ message: 'internal server error' });
  });
  return app;
}
