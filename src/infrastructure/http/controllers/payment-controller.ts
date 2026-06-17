import { FastifyReply, FastifyRequest } from 'fastify';
import { CreatePaymentUseCase } from '../../../application/use-cases/create-payment-use-case.js';
import { GetPaymentUseCase } from '../../../application/use-cases/get-payment-use-case.js';
import { ListPaymentsUseCase } from '../../../application/use-cases/list-payments-use-case.js';
import { CapturePaymentUseCase } from '../../../application/use-cases/capture-payment-use-case.js';
import { RefundPaymentUseCase } from '../../../application/use-cases/refund-payment-use-case.js';
export class PaymentController {
  constructor(private createPayment:CreatePaymentUseCase, private getPayment:GetPaymentUseCase, private listPayments:ListPaymentsUseCase, private capturePayment:CapturePaymentUseCase, private refundPayment:RefundPaymentUseCase) {}
  async create(req: FastifyRequest, reply: FastifyReply){ const body=req.body as any; const idempotencyKey=String(req.headers['idempotency-key']); const result=await this.createPayment.execute({...body,idempotencyKey}); return reply.code(201).send(result); }
  async find(req: FastifyRequest, reply: FastifyReply){ const { paymentId } = req.params as any; const result=await this.getPayment.execute(paymentId); return result?reply.send(result):reply.code(404).send({message:'payment not found'}); }
  async list(req: FastifyRequest){ const q=req.query as any; return this.listPayments.execute(q.limit?Number(q.limit):50); }
  async capture(req: FastifyRequest){ const { paymentId } = req.params as any; return this.capturePayment.execute(paymentId); }
  async refund(req: FastifyRequest){ const { paymentId } = req.params as any; return this.refundPayment.execute(paymentId); }
}
