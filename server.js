// import Express from 'express';
// import Cors from 'cors';
// import MySql2 from 'mysql2';
// import BodyParser from 'body-parser';
// import Dotenv from 'dotenv';

// const app = Express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))

// const port = 3000;
// app.get('/', (req, res) => {res.send('Hello World!')});
// app.listen(port, () => {console.log( 'Express server running on port 3000')});
// const db = mysql.createConnection({
//     host: 'thresholds-test.mysql.database.azure.com',
//     user: 'Dalvarez', // Replace with your MySQL username
//     port: 3306, // Replace with the port you need - may be different from mine
//     password: 'test', // Replace with your MySQL password
//     database: 'Dalvarez_tasks', // Replace with your database name
// });
 
// db.connect((err) => {
//     if (err) {
//         console.error('Failed to connect to the database please check your code:', err);
//         return;
//     }
//     console.log('You just got connected to the database, welcome to shemar info');
// });

import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import 'dotenv/config';
 
const app = express(); // this calls the express function
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
const port = process.env.PORT;  // Use the correct environment variable name
// app.use(cors({origin: 'http://localhost:5173'}));
 
const db = mysql.createConnection({
    host: 'thresholds-test.mysql.database.azure.com',
    user: process.env.pf, // Replace with your MySQL username
    port: 3306, // Replace with the port you need - may be different from mine
    password:process.env.PASSWORD, // Replace with your MySQL password
    database: 'dalvarez_tasks', // Replace with your database name
});
 
db.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database please check your code:', err);
        return;
    }
    console.log('database connected');
});
app.get('/', (req, res) => {res.send('Hello World!')});
app.listen(port, () => {
    console.log('Express is running on port 3000');
});
app.get('/tasks', (req, res) => {
    const query = "SELECT * FROM tasks;";

    db.query(query, (err, results) => {
        if (err) {
            console.log("oh no we did bad");
            console.log(err);
            res.status(500).json({error: 'Error getting tasks.'})
        }
        else {
            res.json(results);
        }
    })
})

// new route to add a task to the database
app.post('/tasks', (req, res) => {

    const params = [req.body['title'], req.body['description'], req.body['is_completed']];
    console.log(req.body)
    const query = "INSERT INTO tasks (title, description, is_completed) VALUES (?, ?, ?);"

    db.query(query, params, (err, results) => {
        if (err) {
            console.log("oh no we did bad");
            console.log(err);
            res.status(500).json({error: 'Error adding task to database.'})
        }
        else {
            res.status(200).json(results);
        }
    })
})

// starts the app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})