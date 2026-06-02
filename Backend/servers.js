const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const vendorRoutes = require('./VendorRouts');
const adminRoutes = require("./admin");


const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // for images in base64
app.use('/admin', adminRoutes);
app.use('/vendor', vendorRoutes);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'Backend is running' });
});

app.post('/signup', async (req, res) => {
  const { name, email, password, mobile } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }

  try {
    await db.execute(
      `INSERT INTO customers (name, email, password, mobile, otp)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, password, mobile || null, otp]
    );

    console.log('OTP (demo):', otp);
    return res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'User already exists' });
  }
});

app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const [result] = await db.execute(
      `UPDATE customers
       SET is_verified = TRUE
       WHERE email = ? AND otp = ?`,
      [email, otp]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    return res.status(200).json({ success: true, message: 'Signup successful' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  let { email, password } = req.body;
  email = (email || '').toLowerCase().trim();

  try {
    const [result] = await db.execute(
      `SELECT * FROM customers
       WHERE email = ? AND password = ? AND is_verified = 1`,
      [email, password]
    );

    if (result.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = result[0];
    return res.status(200).json({
      success: true,
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/change-password', async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;

  try {
    const [result] = await db.execute(
      'SELECT * FROM customers WHERE id = ? AND password = ?',
      [id, oldPassword]
    );

    if (result.length === 0) {
      return res.status(400).json({ success: false, message: 'Wrong old password' });
    }

    await db.execute('UPDATE customers SET password = ? WHERE id = ?', [newPassword, id]);
    return res.status(200).json({ success: true, message: 'Password updated' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/update-profile', async (req, res) => {
  const { id, name, email, mobile } = req.body;

  try {
    await db.execute(
      `UPDATE customers
       SET name = ?, email = ?, mobile = ?
       WHERE id = ?`,
      [name, email, mobile, id]
    );

    return res.status(200).json({ success: true, message: 'Profile updated' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Update failed' });
  }
});

app.get('/customer/orders/:customerId', async (req, res) => {
  const { customerId } = req.params;

  try {
    const [results] = await db.execute(
      `SELECT o.order_id, o.total_amount, o.order_status, o.order_date, v.shop_name AS vendor_name
       FROM orders o
       JOIN vendors v ON o.vendor_id = v.vendor_id
       WHERE o.customer_id = ?
       ORDER BY o.order_date DESC`,
      [customerId]
    );

    return res.status(200).json({ success: true, orders: results });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

const port = Number(process.env.PORT || 5000);
app.listen(port, () => console.log(`Backend running on port ${port}`));
