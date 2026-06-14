import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
@Entity({ name: 'payments' })
export class PaymentOrmEntity {
  @PrimaryColumn('uuid') id!: string;
  @Column({ name:'merchant_id' }) merchantId!: string;
  @Column({ name:'customer_id' }) customerId!: string;
  @Column('numeric', { precision: 14, scale: 2 }) amount!: string;
  @Column({ length: 3 }) currency!: string;
  @Column() status!: string;
  @Index({ unique: true }) @Column({ name:'idempotency_key' }) idempotencyKey!: string;
  @CreateDateColumn({ name:'created_at' }) createdAt!: Date;
  @UpdateDateColumn({ name:'updated_at' }) updatedAt!: Date;
}
