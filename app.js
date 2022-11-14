const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routePrefix = "/api";

const userRoutes = require('./routes/user');
const auth = require('./routes/auth');
const accounts = require('./routes/accounts');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${routePrefix}/users`, userRoutes);
app.use(`${routePrefix}/auth`, auth);
app.use(`${routePrefix}/accounts`, accounts);

const customer = require('./routes/customer');
app.use(`${routePrefix}/customer`, customer);

app.listen(5000);
