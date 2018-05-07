import express from 'express';

import appConfig from './config/appConfig';
import ErrorHandler from './middleware/ErrorHandler';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', routes.auth);
app.use('/api/v1/products', routes.product);
app.use('/api/v1/orders', routes.order);

app.get('/', (req, res) => res.json({ message: 'Welcome' }));

app.use(ErrorHandler.handle);

app.listen(appConfig.port);
