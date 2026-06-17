CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY,
  merchant_id VARCHAR(120) NOT NULL,
  customer_id VARCHAR(120) NOT NULL,
  amount NUMERIC(14,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  status VARCHAR(30) NOT NULL,
  idempotency_key VARCHAR(180) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

INSERT INTO payments (id, merchant_id, customer_id, amount, currency, status, idempotency_key, created_at, updated_at) VALUES
('11111111-1111-1111-1111-111111111111','mrc_intercorp_001','cus_1001',120.50,'USD','AUTHORIZED','seed-payment-001',now(),now()),
('22222222-2222-2222-2222-222222222222','mrc_intercorp_001','cus_1002',6500.00,'USD','REJECTED','seed-payment-002',now(),now()),
('33333333-3333-3333-3333-333333333333','mrc_fintech_002','cus_1003',89.90,'PEN','CAPTURED','seed-payment-003',now(),now())
ON CONFLICT (idempotency_key) DO NOTHING;
