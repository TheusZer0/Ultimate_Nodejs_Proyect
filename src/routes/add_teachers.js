//ESTE SE DEBE ARREGLAR

const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/addTeacher',async (req, res) => {
    res.status(200).render('links/addTeacher')
});

router.post('/addTeacher', async (req, res) => {
    const {fullname,email,password} = req.body;
    const response = await pool.query('INSERT INTO public.profesor (name, email, password) VALUES ($1,$2,$3)',[fullname,email,password]);
    req.flash('success','Agregado correctamente');
    res.status(200).redirect('/teachers/');//codigo de status
});

router.get('/', async (req, res) => {
    const response = await pool.query('SELECT * FROM public.profesor');
    const responsejson = response.rows
    res.render('links/listTeachers', {responsejson});
    res.status(200)
});

router.get('/deleteTeacher/:id', async (req, res) => {
    const response = await pool.query('DELETE FROM public.profesor WHERE id = $1', [parseInt(req.params.id)]);
    res.status(200).redirect('/teachers/');//codigo de status
});

router.get('/editTeacher/:id', async (req, res) => {
    //const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM public.profesor WHERE id = $1', [parseInt(req.params.id)]);
    const responsejson = response.rows;
    res.render('links/editTeacher', {responsejson});
    //res.status(200).redirect('/teachers/');//codigo de status
});

router.post('/editTeacher/:id', async (req, res) => {
    const {id} = req.params;
    const {fullname,email,password} = req.body;
    console.log(id)
    const response =await pool.query('UPDATE public.profesor SET name = $1, email = $2,password = $3 WHERE id = $4', [
        fullname,
        email,
        password,
        id
    ]);
    res.status(200).redirect('/teachers/');//codigo de status
});


module.exports = router;