const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); 
const path = require('path');
const app = express();
const PORT = 3005;

// Set EJS sebagai view engine
app.set('view engine', 'ejs');

// Middleware parsing form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method')); 

// Folder statis
app.use(express.static('public'));

// Import routes
const mobilRoutes = require('./routes/mobilRoutes');
const penyewaRoutes = require('./routes/penyewaRoutes');
const transaksiRoutes = require('./routes/transaksiRoutes');

// Route Home
app.get('/', (req, res) => {
    res.render('index');
});

// Gunakan routes
app.use('/mobil', mobilRoutes);
app.use('/penyewa', penyewaRoutes);
app.use('/transaksi', transaksiRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
