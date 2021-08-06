const express = require('express');
const morgan = require('morgan');
const express_hdb = require('express-handlebars');
const path = require('path');


// inicializacion del modulo express
const app =  express();

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// variables globales
app.use((req, res, next) => {
    next();
});


// rutas del sistema
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/add_teachers'));

// archivos publicos
app.use(express.static(path.join(__dirname,'public')));

// comenzar el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port ',app.get('port'));
});


