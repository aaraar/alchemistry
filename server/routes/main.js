import express from 'express';
import mongodb from 'mongodb';
import expressHbs from 'express-handlebars';

const router = express.Router();
router.use('/static', express.static('dist/static'));
router
.get('/', onHome)
.get('/about', onAbout)
.get('/login', onLogin)

router.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

function onHome(req, res) {
    res.render('home', {data: "hello world"});
}
function onAbout(req, res) {n
    res.send('about');
}
function onLogin(req, res) {
    res.send('profile');
}


export default router;
