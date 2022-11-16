const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routePrefix = "/api";
const authorization = require('./middleware/auth');
const userRoutes = require('./routes/user');
const auth = require('./routes/auth');
const accounts = require('./routes/accounts');
const api = require('./routes/api');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${routePrefix}/users`, userRoutes);
app.use(`${routePrefix}/auth`, auth);
//app.use(`${routePrefix}/accounts`, accounts);
app.use(`${routePrefix}`, api);

// const customer = require('./routes/customer');
// app.use(`${routePrefix}/customer`, customer);

app.listen(5000);
