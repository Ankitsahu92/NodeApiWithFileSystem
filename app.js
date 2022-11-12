// const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const app = express();
const routePrefix = "/api";
// app.set('view engine', 'ejs');
// app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
//const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, 'public')));

app.use(`${routePrefix}/admin`, adminRoutes);
app.use(`${routePrefix}/user`, userRoutes);
//app.use(shopRoutes);

//app.use(errorController.get404);

app.listen(5000);
