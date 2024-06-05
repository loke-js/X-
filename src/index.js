import express from 'express';
import {connect} from './config/database.js';
import HashtagRepository from './repository/hashtag-repository.js';
import service from './services/tweet-service.js';

const app = express();

app.listen(3000, async () => {
  console.log("server started");
  connect();
  console.log("MongoDB connected"); 

  let serv = new service();
  await serv.create({content:'My #CoDe works'})
}); 
