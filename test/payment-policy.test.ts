import { describe, expect, it } from 'vitest';
import { Payment } from '../src/domain/entities/payment.js';
import { Money } from '../src/domain/value-objects/money.js';
import { PaymentPolicy } from '../src/domain/services/payment-policy.js';
describe('PaymentPolicy', () => {
  it('authorizes amounts below the review threshold', () => {
    const payment = Payment.create({ merchantId:'mrc_001', customerId:'cus_001', money:Money.of(100,'USD'), idempotencyKey:'test-1' });
    new PaymentPolicy(5000).authorize(payment);
    expect(payment.status).toBe('AUTHORIZED');
  });
  it('rejects amounts above the review threshold', () => {
    const payment = Payment.create({ merchantId:'mrc_001', customerId:'cus_001', money:Money.of(7000,'USD'), idempotencyKey:'test-2' });
    new PaymentPolicy(5000).authorize(payment);
    expect(payment.status).toBe('REJECTED');
  });
});
