export type DomainEvent = { name: string; occurredAt: string; payload: Record<string, unknown> };
export const paymentEvent = (name: string, payload: Record<string, unknown>): DomainEvent => ({ name, occurredAt: new Date().toISOString(), payload });
