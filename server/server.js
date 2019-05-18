
// deps
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import expHbs from 'express-handlebars';

// routes
import profiles from './routes/api/profiles';
import mainRoutes from './routes/main';

// vars
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/', mainRoutes)
app.use('/api/profiles', profiles);
app.engine('.hbs', expHbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', 'dist/view');

app.listen(PORT, () =>
  console.log(`App listening on port ${PORT}!`),
);