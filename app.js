require('dotenv').config();

const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { limit } = require('./middlewares/expressRateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/index');
const { PORT, DB_ADDRESS } = require('./congfig');

const app = express();

app.use(cors());

app.use(cookieParser());

mongoose.connect(DB_ADDRESS, {
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

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение запущено, порт ${PORT}`);
});
