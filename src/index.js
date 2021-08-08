const express = require('express');
const morgan = require('morgan');
const express_hdb = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const pgSession = require('express-pg-session')

// inicializacion del modulo express
const app =  express();
require("./lib/passport");

// configuracion del puerto para la app
app.set('port', process.env.PORT || 5050);

app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs',express_hdb({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// middlewares
app.use(session({
    secret: "usm-charapter",
    resave: false,
    saveUninitialized: false,
    store: new (pgSession(session))(),
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));
app.use(flash());

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

// variables globales

app.use((req, res, next) => {
    next();
});

app.use(((req, res) => {
    app.locals.success = req.flash('success');
    next();
}));

// rutas del sistema
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/teachers',require('./routes/add_teachers'));

// archivos publicos
app.use(express.static(path.join(__dirname,'public')));

// comenzar el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port ',app.get('port'));
});


