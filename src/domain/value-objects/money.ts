import { DomainError } from '../../shared/errors/domain-error.js';
export class Money {
  private constructor(public readonly amount: number, public readonly currency: string) {}
  static of(amount: number, currency: string): Money {
    if (!Number.isFinite(amount) || amount <= 0) throw new DomainError('amount must be greater than zero');
    if (!/^[A-Z]{3}$/.test(currency)) throw new DomainError('currency must be ISO-4217 format');
    return new Money(Number(amount.toFixed(2)), currency);
  }
}
