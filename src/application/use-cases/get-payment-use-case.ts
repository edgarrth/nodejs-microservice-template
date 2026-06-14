import { PaymentRepository } from '../../domain/repositories/payment-repository.js';
import { toPaymentResponse, PaymentResponse } from '../dtos/payment-dto.js';
export class GetPaymentUseCase { constructor(private readonly repo: PaymentRepository){} async execute(id:string): Promise<PaymentResponse|null>{ const p=await this.repo.findById(id); return p?toPaymentResponse(p):null; } }
