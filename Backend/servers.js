const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const vendorRoutes = require('./VendorRouts');
const adminRoutes = require("./admin");


const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // for images in base64
app.use('/admin', adminRoutes);

app.use('/vendor', vendorRoutes);

app.listen(5000, () => console.log('Vendor backend running on port 5000'));
