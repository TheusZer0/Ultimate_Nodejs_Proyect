const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get('/sign-in', async (req, res) => {
    res.status(200).render('links/sign-in.hbs');
});

router.post('/sign-in', ((req, res, next) => {
    passport.authenticate('local.sign-in',{
        succesRedirect: '/profile',
        failureRedirect: '/sign-in'
    })(req,res,next);
}));

router.get('/profile',((req, res) => {
    res.send('ESTE ES EL PERFIL')
}));

module.exports = router;