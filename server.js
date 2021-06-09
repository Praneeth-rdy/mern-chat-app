const express = require('express');
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 5050

app.get('/', (request, response) => {
    response.send("Hello World");
});


app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}/`));
