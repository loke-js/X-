import User from "../models/user.js";
import { LikeRepository, TweetRepository } from "../repository/index.js";
class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
  }

  async toggleLike(modelId, modelType, UserId) {
    // /api/v1/likes/toggle?id=modelid&type=Tweet
    // console.log(modelId, modelType, UserId);
    if (modelType == "Tweet") {
      var likeable = await this.tweetRepository.find(modelId);
    } else if (modelType == "Comment") {
      //TODO
    } else {
      throw new Error("Unknown model type");
    }
    const exists = await this.likeRepository.findByUserAndLikeable({
      user: UserId,
      onModel: modelType,
      likeable: modelId,
    });
    // console.log('EXISTS:',exists);
    if (exists) {
      likeable.likes.pull(exists.id);
      await likeable.save();
      await exists.deleteOne();
      var isAdded = false;
    } else {
      const newLike = await this.likeRepository.create({
        user: UserId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike.id);
      await likeable.save();

      var isAdded = true;
    }
    return isAdded;
  }
}

export default LikeService;
