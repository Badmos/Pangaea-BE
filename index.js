const express =  require('express');
const { json } = require('body-parser');
const app = express();

const { PORT } = require('./config/config');
const { errorHandler } = require('./src/middlewares/error_handler')

const { appRouter } = require('./src/routes/routes')

app.use(json())
app.use('/', appRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});