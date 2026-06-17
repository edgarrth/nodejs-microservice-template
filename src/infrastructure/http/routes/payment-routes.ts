import { FastifyInstance } from 'fastify';
import { PaymentController } from '../controllers/payment-controller.js';
import { createPaymentSchema, idParamSchema } from '../schemas/payment.schemas.js';
export async function registerPaymentRoutes(app: FastifyInstance, controller: PaymentController) {
  app.post('/payments/v1/payments', { schema: createPaymentSchema }, controller.create.bind(controller));
  app.get('/payments/v1/payments', controller.list.bind(controller));
  app.get('/payments/v1/payments/:paymentId', { schema: idParamSchema }, controller.find.bind(controller));
  app.post('/payments/v1/payments/:paymentId/capture', { schema: idParamSchema }, controller.capture.bind(controller));
  app.post('/payments/v1/payments/:paymentId/refund', { schema: idParamSchema }, controller.refund.bind(controller));
}
