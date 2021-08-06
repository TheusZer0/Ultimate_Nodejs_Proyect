//ESTE SE DEBE ARREGLAR

const express = require('express');
const router = express.Router();

const pool = require('../database');

//const getUsers = async (req, res) => {
//    const response = await pool.query('SELECT * FROM users');
//    console.log(response.rows);
//    res.send('users')
//}

router.get('/addTeacher',async (req, res) => {
    res.status(200).render('links/addTeacher')
});

router.post('/addTeacher', async (req, res) => {
    const {fullname,email,password} = req.body;
    const response = await pool.query('INSERT INTO public.profesor (name, email, password) VALUES ($1,$2,$3)',[fullname,email,password]);
    res.status(200);
    console.log(response);
    res.send('Usuario creado'); //codigo de status
});


module.exports = router;