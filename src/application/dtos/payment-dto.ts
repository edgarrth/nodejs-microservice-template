import { Payment } from '../../domain/entities/payment.js';
export type PaymentResponse = { id:string; merchantId:string; customerId:string; amount:number; currency:string; status:string; createdAt:string; updatedAt:string; idempotencyKey:string };
export const toPaymentResponse = (p: Payment): PaymentResponse => ({ id:p.id, merchantId:p.merchantId, customerId:p.customerId, amount:p.money.amount, currency:p.money.currency, status:p.status, createdAt:p.createdAt.toISOString(), updatedAt:p.updatedAt.toISOString(), idempotencyKey:p.idempotencyKey });
