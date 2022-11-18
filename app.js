const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routePrefix = "/api";
const authorization = require('./middleware/auth');
const userRoutes = require('./routes/user');
const auth = require('./routes/auth');
const common = require('./routes/common');
const api = require('./routes/api');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${routePrefix}/users`, userRoutes);
app.use(`${routePrefix}/auth`, auth);
app.use(`${routePrefix}/common`, common);
app.use(`${routePrefix}`, authorization, api);
app.listen(5000);
