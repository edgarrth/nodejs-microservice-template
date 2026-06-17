import { Payment } from '../entities/payment.js';
export interface PaymentRepository { save(payment: Payment): Promise<Payment>; findById(id: string): Promise<Payment | null>; findByIdempotencyKey(key: string): Promise<Payment | null>; list(limit: number): Promise<Payment[]>; }
