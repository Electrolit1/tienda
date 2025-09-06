import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());

// Sirve la carpeta web (frontend)
app.use(express.static(path.join(__dirname, '..', 'web')));

// 🔗 Conexión MySQL (ajusta credenciales)
let db;
(async () => {
  db = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'TU_PASSWORD',
    database: 'tienda_mc',
    waitForConnections: true,
    connectionLimit: 5
  });
  console.log('✅ Pool MySQL listo');
})();

// Guarda compra (desde el front luego de onApprove)
app.post('/api/guardar-compra', async (req, res) => {
  const { orderId, jugador, producto, precio } = req.body;

  if (!orderId || !jugador || !producto || !precio) {
    return res.status(400).json({ status: 'bad_request' });
  }

  try {
    await db.query(
      'INSERT INTO compras (orderId, jugador, producto, precio, entregado) VALUES (?, ?, ?, ?, 0)',
      [orderId, jugador, producto, precio]
    );
    return res.json({ status: 'ok' });
  } catch (err) {
    console.error('DB error:', err.message);
    return res.status(500).json({ status: 'error' });
  }
});

// (Opcional PRO) Endpoint para verificar con PayPal Server-to-Server la orden.
// Requiere CLIENT_ID y CLIENT_SECRET en variables de entorno y fetch al API de PayPal.
// Mantengo el ejemplo simple para pruebas locales.

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Backend en http://localhost:${PORT}`));
