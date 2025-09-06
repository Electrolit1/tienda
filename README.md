# Minecraft Tienda Web + PayPal + Plugin (Spigot/Paper)

## Requisitos
- Node.js 18+
- MySQL/MariaDB
- Java 17+ (para Paper 1.20.x) o Java 8+ (ajusta api-version)
- Spigot/Paper

## 1) Base de datos
Ejecuta `db.sql`:

```sql
CREATE DATABASE IF NOT EXISTS tienda_mc DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tienda_mc;

CREATE TABLE IF NOT EXISTS compras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orderId VARCHAR(255),
  jugador VARCHAR(16),
  producto VARCHAR(255),
  precio DECIMAL(10,2),
  entregado TINYINT(1) DEFAULT 0,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
