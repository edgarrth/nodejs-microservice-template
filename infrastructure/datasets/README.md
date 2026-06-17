# Datasets de la PoC

Esta carpeta contiene los scripts de datos iniciales para PostgreSQL.

## Archivos

- `sql/001_seed_payments.sql`: crea la tabla `payments` si no existe y precarga pagos de ejemplo en estados `AUTHORIZED`, `REJECTED` y `CAPTURED`.

## Uso con Docker Compose

Desde la raíz del proyecto:

```bash
docker compose -f infrastructure/docker-compose.yml up -d
```

PostgreSQL ejecuta automáticamente los scripts ubicados en `infrastructure/datasets/sql` cuando el volumen se crea por primera vez.

## Reiniciar datos desde cero

```bash
docker compose -f infrastructure/docker-compose.yml down -v
docker compose -f infrastructure/docker-compose.yml up -d
```

## Validar carga

```bash
docker exec -it payments-postgres psql -U payments_user -d payments_db -c "select id, merchant_id, amount, currency, status from payments;"
```
