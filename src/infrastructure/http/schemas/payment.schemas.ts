export const createPaymentSchema = {
  body: { type:'object', required:['merchantId','customerId','amount','currency'], properties:{ merchantId:{type:'string'}, customerId:{type:'string'}, amount:{type:'number', minimum:0.01}, currency:{type:'string', minLength:3, maxLength:3} } },
  headers: { type:'object', required:['idempotency-key'], properties:{ 'idempotency-key': { type:'string' } } }
};
export const idParamSchema = { params: { type:'object', required:['paymentId'], properties:{ paymentId:{type:'string', format:'uuid'} } } };
