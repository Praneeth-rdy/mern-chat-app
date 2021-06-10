require('dotenv').config({path: './config.env'});

const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Connect DB
connectDB();

const app = express();



app.use(express.json());

app.use('/chat/api/auth', require('./routes/auth'));
app.use('/chat/api/private', require('./routes/private'));

// Error Handler (Should be last piece of middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5050

app.get('/', (request, response) => {
    response.send("Hello World");
});


const server = app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}/`));

process.on('unhandledRejection', (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => {process.exit(1)});
});