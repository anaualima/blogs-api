const express = require('express');
const userRouter = require('./controllers/User');
const loginRouter = require('./controllers/Login');
const categoryRouter = require('./controllers/Category');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoryRouter);

app.listen(PORT, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
