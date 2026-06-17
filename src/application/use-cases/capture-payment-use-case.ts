import { DomainError } from '../../shared/errors/domain-error.js';
import { PaymentRepository } from '../../domain/repositories/payment-repository.js';
import { toPaymentResponse, PaymentResponse } from '../dtos/payment-dto.js';
export class CapturePaymentUseCase { constructor(private readonly repo: PaymentRepository){} async execute(id:string): Promise<PaymentResponse>{ const p=await this.repo.findById(id); if(!p) throw new DomainError('payment not found'); p.capture(); return toPaymentResponse(await this.repo.save(p)); } }
