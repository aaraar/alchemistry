import express from 'express';
import mongo from 'mongodb';
import 'dotenv/config';

let db = null;
const url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;
const router = express.Router();

// mongo.MongoClient.connect(url, function (err, client) {
//     if (err) {
//       throw err
//     }
  
//     db = client.db(process.env.DB_NAME)
//   })

export default router;
