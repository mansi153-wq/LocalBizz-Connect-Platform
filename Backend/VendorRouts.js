const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');

/* ---------------------- VENDOR REGISTRATION ---------------------- */
/*
router.post('/register', async (req, res) => {
  const { shopName, ownerName, email, password, mobile } = req.body;
*/
router.post('/register', async (req, res) => {
  const { shopName, ownerName, email, password, mobile, shop_logo } = req.body;


  try {
    if (!shopName || !ownerName || !email || !password) {
      return res.json({ success: false, error: 'All fields are required' });
    }

    // Check if email exists
    const [existing] = await db.execute(
      'SELECT vendor_id FROM vendors WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.json({ success: false, error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      `INSERT INTO vendors (shop_name, owner_name, email, password, phone, shop_logo,status)
       VALUES (?, ?,?, ?, ?, ?, 'Active')`,
      [shopName, ownerName, email, hashedPassword, mobile || null,shop_logo || null]
    );

    res.json({
      success: true,
      vendor_id: result.insertId,
      shopName
    });
  } catch (err) {
    console.error('REGISTER ERROR:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/* ---------------------- VENDOR LOGIN ---------------------- */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({ success: false, error: 'Email and password required' });
    }

    const [vendors] = await db.execute(
      'SELECT * FROM vendors WHERE email = ?',
      [email]
    );

    if (vendors.length === 0) {
      return res.json({ success: false, error: 'Vendor not found' });
    }

    const vendor = vendors[0];

    const match = await bcrypt.compare(password, vendor.password);
    if (!match) {
      return res.json({ success: false, error: 'Incorrect password' });
    }

    res.json({ success: true, vendor_id: vendor.vendor_id, shopName: vendor.shop_name });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/* ---------------------- ADD PRODUCT ---------------------- */
router.post('/add-product', async (req, res) => {
  const { vendor_id, name, category, price, stock, description, image, status } = req.body;

  try {
    if (!vendor_id || !name || !price) {
      return res.json({ success: false, error: 'Required fields missing' });
    }

    const [result] = await db.execute(
      `INSERT INTO products (vendor_id, name, category, price, stock, description, image, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [vendor_id, name, category, price, stock || 0, description || '', image || null, status || 'Active']
    );

    res.json({ success: true, product_id: result.insertId });
  } catch (err) {
    console.error('ADD PRODUCT ERROR:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/* ---------------------- GET PRODUCTS FOR VENDOR ---------------------- */
router.get('/products/:vendor_id', async (req, res) => {
  const { vendor_id } = req.params;

  try {
    const [products] = await db.execute(
      'SELECT * FROM products WHERE vendor_id = ?',
      [vendor_id]
    );

    res.json({ success: true, products });
  } catch (err) {
    console.error('GET PRODUCTS ERROR:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/* ---------------------- UPDATE PRODUCT ---------------------- */
router.put('/update-product/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, price, stock, description, image, status } = req.body;

  try {
    await db.execute(
      `UPDATE products
       SET name=?, category=?, price=?, stock=?, description=?, image=?, status=?
       WHERE product_id=?`,
      [name, category, price, stock, description, image, status, id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('UPDATE PRODUCT ERROR:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/* ---------------------- DELETE PRODUCT ---------------------- */
router.delete('/delete-product/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute('DELETE FROM products WHERE product_id=?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE PRODUCT ERROR:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/* ---------------------- UPDATE STOCK ONLY ---------------------- */
router.patch('/update-stock/:id', async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    await db.execute('UPDATE products SET stock=? WHERE product_id=?', [stock, id]);
    res.json({ success: true });
  } catch (err) {
    console.error('UPDATE STOCK ERROR:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
