require('dotenv').config();

const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { auth } = require('./middlewares/auth');
const { limit } = require('./middlewares/expressRateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const NotFoundError = require('./errors/404_NotFoundError');

const authRouter = require('./routes/auth.js');
const usersRouter = require('./routes/users.js');
const moviesRouter = require('./routes/movie.js');

const app = express();
const { PORT = 3000 } = process.env;

app.use(cors());

app.use(cookieParser());

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => { console.log('База данных подключена'); })
  .catch((err) => { console.log(`Ошибка при подключении базы данных: ${err}`); });

app.use(requestLogger);

app.use(helmet());
app.use(limit);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', authRouter);
app.use('/users', auth, usersRouter);
app.use('/movies', auth, moviesRouter);

app.use('/*', () => {
  throw new NotFoundError({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение запущено, порт ${PORT}`);
});
