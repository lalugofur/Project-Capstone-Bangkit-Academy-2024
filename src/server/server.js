const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = 3000;

// Middleware for parsing application/json
app.use(bodyParser.json());

// Set up routes
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
