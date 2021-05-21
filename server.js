const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const app = express();
// connect database
connectDB();

// init middleware
app.use(express.json({ extended: false }));




//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/item', require('./routes/api/item'));
app.use('/api/sales', require('./routes/api/sales'));
app.use('/api/client', require('./routes/api/client'));
app.use('/api/receipt', require('./routes/api/receipt'))




// server static assets on prod
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));