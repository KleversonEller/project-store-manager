const express = require('express');
const swaggerUi = require('swagger-ui-express');
const errorMiddleware = require('./middlewares/error');
const productRouter = require('./routers/productRouter');
const salesRouter = require('./routers/salesRouter');
const swaggerFile = require('./swagger_output.json');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/products', productRouter);
app.use('/sales', salesRouter);

app.use(errorMiddleware);

module.exports = app;