import { PaymentRepository } from '../../domain/repositories/payment-repository.js';
import { toPaymentResponse, PaymentResponse } from '../dtos/payment-dto.js';
export class ListPaymentsUseCase { constructor(private readonly repo: PaymentRepository){} async execute(limit=50): Promise<PaymentResponse[]>{ return (await this.repo.list(limit)).map(toPaymentResponse); } }
