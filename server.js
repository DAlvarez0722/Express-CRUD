import Express from 'express';
import Cors from 'cors';
import MySql2 from 'mysql2';
import BodyParser from 'body-parser';
import Dotenv from 'dotenv';

const app = Express();
app. get('/', (req, res) => {res.send('Hello World!')});
app.listen(3000, () => {console.log('Server is running on port 3000')});

