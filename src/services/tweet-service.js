import { TweetRepository, HashtagRepository } from "../repository/index.js";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  async create(data) {
    let content = data.content;

    const tweet = await this.tweetRepository.create(data);

    if (content.includes("#")) {
      const tags = content
        .match(/#[a-zA-Z0-9_]+/g)
        .map((tag) => tag.substring(1))
        .map((tag) => tag.toLowerCase());
      let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
      let titleOfPresentTags = alreadyPresentTags.map((tags) => tags.title);

      let newTags = tags.filter((tag) => !alreadyPresentTags.includes(tag));
      newTags = newTags.map((tag) => {
        return {
          title: tag,
          tweets: [tweet.id],
        };
      });
      const response = await this.hashtagRepository.bulkCreate(newTags);
      alreadyPresentTags.forEach((tag) => {
        tag.tweets.push(tweet.id);
        tag.save();
      });
      console.log(response);
    }

    return tweet;
  }
}

export default TweetService;
