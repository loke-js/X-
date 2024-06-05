const express = require("express");
const connect = require("./config/database");
const { HashtagRepository } = require("./repository/index");
const TweetService = require('./services/tweet-service');

const app = express();

app.listen(3000, async () => {
  console.log("server started");
  connect();
  console.log("MongoDB connected");
  // const tweet = await  Tweet.create({
  //     content: 'second Tweet',

  // });

  // const tweets = await Tweet.find({userEmail:'a@b.com'});

  // UPDATE tweet
  // const tweet = await Tweet.findById('6654c828c68817d7a40b6184');
  // tweet.userEmail = 'b@c.com';
  // await tweet.save();

  // const tweetRepo = new TweetRepository();
  // const tweet = await tweetRepo.update('6654c869166a8c65ac96ad71',{content:'new latest content here'});

  // const tweet  = await tweetRepo.create({content:'my tweet'});

  // console.log(tweet);
  // tweet.comments.push({content:'first comment'});
  // await tweet.save();
  // console.log(tweet);

  // const tweet = await tweetRepo.create({content:'Tweet with comment schema'});
  // console.log(tweet);
  // const comment = await Comment.create({content:'new comment'});
  // tweet.comments.push(comment);
  // await tweet.save();
  // console.log(tweet);

//   const tweet = await tweetRepo.getWithComments("66556685721926e8a1dd139f");

    // const tweet = await tweetRepo.getAll(0,4); 
//   console.log(tweet[0].contentWithEmail);

// await tweetRepo.create({content:'With hooks'});



  // let repo =new HashtagRepository();
  // let  response = await repo.findByName(['Excited','Trend']);
  // console.log(response);
  // response = response.map(tags=>tags.title);
  // console.log(response);

let service = new TweetService( );
const tweet =await  service.create({content:'THis is after #new_tweet the #pending promise #Happy #Excited  really '});
console.log(tweet); 


  
});
