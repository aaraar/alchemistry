
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use('/static', express.static('dist'))

app.get('/', (req, res) => {
    res.send('home');
});
app.get('/about', (req, res) => {
  res.send('about');
});
app.get('/login', (req, res) => {
  res.send('login');
});

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);
