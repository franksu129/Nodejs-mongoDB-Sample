
const express = require('express');
const userRouter = require('./routes/usersRoutes');
const monGoRoutes = require('./routes/monGoRoutes');

const app = express();
const port = 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRouter);
app.use('/api/mongo', monGoRoutes);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));