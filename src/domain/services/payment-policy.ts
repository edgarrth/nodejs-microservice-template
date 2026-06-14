import { Payment } from '../entities/payment.js';
export class PaymentPolicy { constructor(private readonly maxAmountWithoutReview: number) {} authorize(payment: Payment){ payment.authorize(this.maxAmountWithoutReview); } }
