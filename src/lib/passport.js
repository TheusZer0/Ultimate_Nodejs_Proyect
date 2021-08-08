const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');

passport.use('local.sign-in', new LocalStrategy({
    usernameField: "fullname",
    passwordField: "password",
    passReqToCallback: true
}, async (req,fullname,password,done) => {
    const response = await pool.query('SELECT * FROM public.profesor WHERE name = $1',[fullname]);
    const user = response.rows[0]
    if (password === user.password){
        console.log('CORRECTO');
        done(null,user);
    } else{
        return done(null,false)
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser (async (id, done) => {
    const rows = await pool.query('SELECT * FROM public.profesor WHERE id = $1', [id]);
    done(null, rows[0]);
});









