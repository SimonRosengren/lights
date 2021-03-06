const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

require('./startup/init')(app, express)
require('./startup/db')()
app.listen(port, () => console.log(`Listening on port: ${port}`))
    