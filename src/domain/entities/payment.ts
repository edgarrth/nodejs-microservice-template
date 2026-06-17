import { randomUUID } from 'node:crypto';
import { Money } from '../value-objects/money.js';
import { DomainError } from '../../shared/errors/domain-error.js';
export type PaymentStatus = 'PENDING'|'AUTHORIZED'|'REJECTED'|'CAPTURED'|'REFUNDED';
export class Payment {
  private constructor(
    public readonly id: string,
    public readonly merchantId: string,
    public readonly customerId: string,
    public readonly money: Money,
    public status: PaymentStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public readonly idempotencyKey: string
  ) {}
  static create(input: {merchantId:string; customerId:string; money: Money; idempotencyKey:string}) {
    if (!input.merchantId || !input.customerId) throw new DomainError('merchantId and customerId are required');
    return new Payment(randomUUID(), input.merchantId, input.customerId, input.money, 'PENDING', new Date(), new Date(), input.idempotencyKey);
  }
  static hydrate(input: {id:string;merchantId:string;customerId:string;money:Money;status:PaymentStatus;createdAt:Date;updatedAt:Date;idempotencyKey:string}) {
    return new Payment(input.id,input.merchantId,input.customerId,input.money,input.status,input.createdAt,input.updatedAt,input.idempotencyKey);
  }
  authorize(maxAmountWithoutReview: number) {
    if (this.status !== 'PENDING') throw new DomainError(`payment cannot be authorized from ${this.status}`);
    this.status = this.money.amount <= maxAmountWithoutReview ? 'AUTHORIZED' : 'REJECTED';
    this.updatedAt = new Date();
  }
  capture() { if (this.status !== 'AUTHORIZED') throw new DomainError('only authorized payments can be captured'); this.status='CAPTURED'; this.updatedAt=new Date(); }
  refund() { if (this.status !== 'CAPTURED') throw new DomainError('only captured payments can be refunded'); this.status='REFUNDED'; this.updatedAt=new Date(); }
}
