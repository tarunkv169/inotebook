const connectToMongdb = require('./db');
connectToMongdb();

const express = require('express');

const app = express()
const port = 3000

// app.use((req, res, next) => {
//   res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' http://localhost:3000");
//   next();
// });

app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})