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



/* ---------------------- GET ALL ACTIVE PRODUCTS (FOR CUSTOMERS) ---------------------- */
router.get('/products', async (req, res) => {
  try {
    const [products] = await db.execute(
      "SELECT * FROM products WHERE status = 'Active'"
    );

    res.json({ success: true, products });
  } catch (err) {
    console.error('GET ALL PRODUCTS ERROR:', err);
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


router.get('/profile/:vendor_id', async (req, res) => {
  const { vendor_id } = req.params;

  try {
    const [vendors] = await db.execute(
      'SELECT vendor_id, shop_name, owner_name, email, phone, shop_logo, created_at FROM vendors WHERE vendor_id = ?',
      [vendor_id]
    );

    if (vendors.length === 0) {
      return res.json({ success: false, error: 'Vendor not found' });
    }

    res.json({ success: true, vendor: vendors[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.put('/update-profile/:vendor_id', async (req, res) => {
  const { vendor_id } = req.params;
  const { shop_name, owner_name, phone, shop_logo } = req.body;

  try {
    await db.execute(
      `UPDATE vendors 
       SET shop_name=?, owner_name=?, phone=?, shop_logo=? 
       WHERE vendor_id=?`,
      [shop_name, owner_name, phone, shop_logo, vendor_id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});


router.put('/change-password/:vendor_id', async (req, res) => {
  const { vendor_id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const [vendors] = await db.execute(
      'SELECT password FROM vendors WHERE vendor_id = ?',
      [vendor_id]
    );

    if (vendors.length === 0) {
      return res.json({ success: false, error: 'Vendor not found' });
    }

    const match = await bcrypt.compare(currentPassword, vendors[0].password);

    if (!match) {
      return res.json({ success: false, error: 'Current password incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.execute(
      'UPDATE vendors SET password=? WHERE vendor_id=?',
      [hashedPassword, vendor_id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.get('/products', async (req, res) => {
  try {
    const [products] = await db.execute(`
      SELECT p.*, v.shop_name
      FROM products p
      JOIN vendors v ON p.vendor_id = v.vendor_id
      WHERE p.status = 'Active'
      AND v.status = 'Active'
      ORDER BY p.created_at DESC
    `);

    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});




/* ---------------------- CREATE ORDER (CUSTOMER → VENDOR) ---------------------- */
router.post('/orders', async (req, res) => {
  const { customer_id, vendor_id, items } = req.body;

  try {
    if (!customer_id || !vendor_id || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid order data' });
    }

    let total_amount = 0;

    // 🔥 CHECK STOCK FOR EACH ITEM
    for (let item of items) {

      const [products] = await db.execute(
        "SELECT stock, price FROM products WHERE product_id = ? AND status = 'Active'",
        [item.product_id]
      );

      if (products.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Product not found or inactive"
        });
      }

      const product = products[0];

      // ❌ STOCK VALIDATION
      if (item.quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} items available in stock`
        });
      }

      // ✅ Always use DB price (security)
      total_amount += item.quantity * product.price;
    }

    // ✅ Create Order
    const [orderResult] = await db.execute(
      `INSERT INTO orders (customer_id, vendor_id, total_amount, order_status)
       VALUES (?, ?, ?, 'Pending')`,
      [customer_id, vendor_id, total_amount]
    );

    const order_id = orderResult.insertId;

    // ✅ Insert order items + reduce stock
    for (let item of items) {

      const [products] = await db.execute(
        "SELECT stock, price FROM products WHERE product_id = ?",
        [item.product_id]
      );

      const product = products[0];

      await db.execute(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [order_id, item.product_id, item.quantity, product.price]
      );

      // 🔥 REDUCE STOCK
      await db.execute(
        "UPDATE products SET stock = stock - ? WHERE product_id = ?",
        [item.quantity, item.product_id]
      );
    }

    res.json({
      success: true,
      message: "Order placed successfully",
      order_id
    });

  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ---------------------- GET ORDERS FOR VENDOR ---------------------- */
router.get('/orders/:vendor_id', async (req, res) => {
  const { vendor_id } = req.params; // route param now

  try {
    if (!vendor_id) {
      return res.json({ success: false, error: 'Vendor ID required' });
    }

    const [orders] = await db.execute(`
      SELECT o.order_id, o.total_amount, o.order_status, o.order_date, c.name AS customer_name
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE o.vendor_id = ?
      ORDER BY o.order_date DESC
    `, [vendor_id]);

    res.json({ success: true, orders });
  } catch (err) {
    console.error('FETCH VENDOR ORDERS ERROR:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.put("/update-order-status", async (req, res) => {
  try {
    const { order_id, status } = req.body;
    if (!order_id || !status) return res.status(400).json({ success: false, message: "Missing order_id or status" });

    const allowedStatuses = ["Pending","Confirmed","Shipped","Delivered","Cancelled"];
    if (!allowedStatuses.includes(status)) return res.status(400).json({ success: false, message: "Invalid status value" });

    // 1️⃣ Update order status
    await db.execute("UPDATE orders SET order_status = ? WHERE order_id = ?", [status, order_id]);

    // 2️⃣ If accepted, fetch full order info to send to customer
    if (status === "Accepted") {
      const [orderDetails] = await db.execute(`
        SELECT o.order_id, o.total_amount, c.name AS customer_name, c.mobile AS customer_mobile,
               v.shop_name, v.phone AS vendor_phone, v.address AS vendor_address,
               p.name AS product_name, oi.quantity, oi.price
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        JOIN vendors v ON o.vendor_id = v.vendor_id
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.order_id = ?
      `, [order_id]);

      return res.json({
        success: true,
        message: "Order accepted",
        orderDetails
      });
    }

    res.json({ success: true, message: "Order status updated" });
  } catch (err) {
    console.log("Server route error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
