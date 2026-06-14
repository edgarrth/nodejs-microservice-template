import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from '../../../domain/entities/payment.js';
import { Money } from '../../../domain/value-objects/money.js';
import { PaymentRepository } from '../../../domain/repositories/payment-repository.js';
import { PaymentOrmEntity } from '../entities/payment.orm-entity.js';
export class TypeormPaymentRepository implements PaymentRepository {
  constructor(private readonly repo: Repository<PaymentOrmEntity>) {}
  async save(payment: Payment): Promise<Payment> { const entity=this.toOrm(payment); await this.repo.save(entity); return payment; }
  async findById(id: string): Promise<Payment|null> { const entity=await this.repo.findOneBy({ id }); return entity?this.toDomain(entity):null; }
  async findByIdempotencyKey(key: string): Promise<Payment|null> { const entity=await this.repo.findOneBy({ idempotencyKey:key }); return entity?this.toDomain(entity):null; }
  async list(limit: number): Promise<Payment[]> { const rows=await this.repo.find({ order:{ createdAt:'DESC' }, take: limit }); return rows.map((r)=>this.toDomain(r)); }
  private toOrm(p: Payment): PaymentOrmEntity { const e=new PaymentOrmEntity(); e.id=p.id; e.merchantId=p.merchantId; e.customerId=p.customerId; e.amount=p.money.amount.toFixed(2); e.currency=p.money.currency; e.status=p.status; e.idempotencyKey=p.idempotencyKey; e.createdAt=p.createdAt; e.updatedAt=p.updatedAt; return e; }
  private toDomain(e: PaymentOrmEntity): Payment { return Payment.hydrate({ id:e.id, merchantId:e.merchantId, customerId:e.customerId, money:Money.of(Number(e.amount), e.currency), status:e.status as PaymentStatus, createdAt:e.createdAt, updatedAt:e.updatedAt, idempotencyKey:e.idempotencyKey }); }
}
