const express = require('express');
const app = express();
const root = `${__dirname}`;

app.use(express.static(root));
app.listen(5678);

console.log('Running on http://localhost:' + 5678);