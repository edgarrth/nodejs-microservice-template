import { Money } from '../../domain/value-objects/money.js';
import { Payment } from '../../domain/entities/payment.js';
import { PaymentRepository } from '../../domain/repositories/payment-repository.js';
import { PaymentPolicy } from '../../domain/services/payment-policy.js';
import { CreatePaymentCommand } from '../commands/create-payment-command.js';
import { toPaymentResponse, PaymentResponse } from '../dtos/payment-dto.js';
export class CreatePaymentUseCase {
  constructor(private readonly repo: PaymentRepository, private readonly policy: PaymentPolicy) {}
  async execute(cmd: CreatePaymentCommand): Promise<PaymentResponse> {
    const existing = await this.repo.findByIdempotencyKey(cmd.idempotencyKey);
    if (existing) return toPaymentResponse(existing);
    const payment = Payment.create({ merchantId: cmd.merchantId, customerId: cmd.customerId, money: Money.of(cmd.amount, cmd.currency), idempotencyKey: cmd.idempotencyKey });
    this.policy.authorize(payment);
    const saved = await this.repo.save(payment);
    return toPaymentResponse(saved);
  }
}
