export type CreatePaymentCommand = { merchantId:string; customerId:string; amount:number; currency:string; idempotencyKey:string };
