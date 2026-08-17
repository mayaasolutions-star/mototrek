# Mototrek Database Architecture Placeholder

This directory documents the relational schema, entity-relationship models, migration procedures, and backup policies for the Mototrek platform.

## Database Entities
- **Users & Auth**: `users`, `user_addresses`, `admin_users`
- **Catalog**: `products`, `product_variants`, `product_images`, `categories`, `brands`
- **Inventory**: `inventory`, `inventory_logs`
- **Orders & Checkout**: `orders`, `order_items`, `order_addresses`
- **Payments**: `payments`, `payment_transactions`, `refunds`
- **Promotions**: `coupons`, `coupon_rules`, `coupon_usage`
- **Fulfillment**: `shipments`, `shipment_items`, `tracking_events`, `returns`
