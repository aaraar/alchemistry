import express from 'express';
import mongodb from 'mongodb';

const router = express.Router();

router
.get('/', onHome)
.get('/about', onAbout)
.get('/login', onLogin)

router.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

function onHome(req, res) {
    res.send('home');
}
function onAbout(req, res) {
    res.send('about');
}
function onLogin(req, res) {
    res.send('profile');
}


export default router;
