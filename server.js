require('dotenv').config({path: './config.env'});

const express = require('express');
const connectDB = require('./config/db');

// Connect DB
connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5050

app.get('/', (request, response) => {
    response.send("Hello World");
});


const server = app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}/`));

process.on('unhandledRejection', (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => {process.exit(1)});
});