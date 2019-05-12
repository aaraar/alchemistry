import express from 'express';
import mongodb from 'mongodb';

const router = express.Router();


router.get('/', (req, res) => {
res.send('home');
});
router.get('/about', (req, res) => {
res.send('about');
});
router.get('/login', (req, res) => {
res.send('login');
});


export default router;
