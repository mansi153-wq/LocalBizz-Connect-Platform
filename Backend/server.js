const http = require('http');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'krishna@123',
  database: 'simple_login',
  port: 3306
});

db.connect(() => console.log('MySQL Connected'));

const server = http.createServer((req, res) => {

  // ===== CORS =====
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json'); // IMPORTANT

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let body = '';
  req.on('data', chunk => body += chunk.toString());

  req.on('end', () => {

    // ================= SIGNUP =================
    if (req.method === 'POST' && req.url === '/signup') {

      const { name, email, password, mobile } = JSON.parse(body);
      const otp = Math.floor(100000 + Math.random() * 900000);

      const sql = `
        INSERT INTO customers (name, email, password, mobile, otp)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(sql, [name, email, password, mobile, otp], err => {

        if (err) {
          res.writeHead(500);
          res.end(JSON.stringify({
            success: false,
            message: "User already exists"
          }));
          return;
        }

        console.log('OTP (demo):', otp);

        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          message: "OTP sent successfully"
        }));
      });
    }

    // ================= VERIFY OTP =================
    else if (req.method === 'POST' && req.url === '/verify-otp') {

      const { email, otp } = JSON.parse(body);

      const sql = `
        UPDATE customers 
        SET is_verified = TRUE 
        WHERE email = ? AND otp = ?
      `;

      db.query(sql, [email, otp], (err, result) => {

        if (result.affectedRows === 0) {
          res.writeHead(400);
          res.end(JSON.stringify({
            success: false,
            message: "Invalid OTP"
          }));
        } else {
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            message: "Signup successful"
          }));
        }
      });
    }

    // ================= LOGIN =================
    else if (req.method === 'POST' && req.url === '/login') {

      let { email, password } = JSON.parse(body);
      email = email.toLowerCase().trim();

      const sql = `
        SELECT * FROM customers
        WHERE email = ? AND password = ? AND is_verified = 1
      `;

      db.query(sql, [email, password], (err, result) => {

        if (err) {
          res.writeHead(500);
          res.end(JSON.stringify({
            success: false,
            message: "Server error"
          }));
          return;
        }

        if (result.length === 0) {
          res.writeHead(401);
          res.end(JSON.stringify({
            success: false,
            message: "Invalid email or password"
          }));
        } else {

          const user = result[0];

     res.writeHead(200);
res.end(JSON.stringify({
  success: true,
  id: user.id,
  name: user.name,
  email: user.email,
  mobile: user.mobile
}));
        }
      });
    }

    else if (req.method === 'POST' && req.url === '/change-password') {
  const { id, oldPassword, newPassword } = JSON.parse(body);

  const checkSql = `SELECT * FROM customers WHERE id = ? AND password = ?`;

  db.query(checkSql, [id, oldPassword], (err, result) => {

    if (result.length === 0) {
      res.writeHead(400);
      return res.end(JSON.stringify({ success: false, message: "Wrong old password" }));
    }

    const updateSql = `UPDATE customers SET password = ? WHERE id = ?`;

    db.query(updateSql, [newPassword, id], () => {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, message: "Password updated" }));
    });
  });
}

    else if (req.method === 'POST' && req.url === '/update-profile') {
  const { id, name, email, mobile } = JSON.parse(body);

  const sql = `
    UPDATE customers
    SET name = ?, email = ?, mobile = ?
    WHERE id = ?
  `;

  db.query(sql, [name, email, mobile, id], (err) => {
    if (err) {
      res.writeHead(500);
      return res.end(JSON.stringify({ success: false, message: "Update failed" }));
    }

    res.writeHead(200);
    res.end(JSON.stringify({ success: true, message: "Profile updated" }));
  });
}


        // ================= GET CUSTOMER ORDERS =================
  else if (req.method === 'GET' && req.url.startsWith('/customer/orders/')) {
    const customerId = req.url.split('/').pop(); // get last part of URL

    const sql = `
      SELECT o.order_id, o.total_amount, o.order_status, o.order_date, v.shop_name AS vendor_name
      FROM orders o
      JOIN vendors v ON o.vendor_id = v.vendor_id
      WHERE o.customer_id = ?
      ORDER BY o.order_date DESC
    `;

    db.query(sql, [customerId], (err, results) => {
      if (err) {
        res.writeHead(500);
        return res.end(JSON.stringify({ success: false, message: "Server error" }));
      }
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, orders: results }));
    });
  }
    // ================= NOT FOUND =================
    else {
      res.writeHead(404);
      res.end(JSON.stringify({
        success: false,
        message: "Not found"
      }));
    }

  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});