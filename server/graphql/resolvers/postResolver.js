'use strict';

import Post from '../../models/Post';

export default {
  Query: {
    posts: async () => {
      try {
        return await Post.find().populate('owner');
      } catch (err) {
        throw new Error(err);
      }
    },
    post: async (_, { postId }) => {
      try {
        return await Post.findById(postId).populate('owner');
      } catch (err) {
        throw new Error(err);
      }
    },
    userPosts: async (_, { userId }) => {
      try {
        return await Post.find({ owner: userId }).populate('owner');
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    addPost: async (_, args) => {
      try {
        const newPost = new Post({ ...args });
        const result = await newPost.save();
        return result.populate('owner');
      } catch (err) {
        throw new Error(err);
      }
    },
    deletePost: async (_, { postId }) => {
      try {
        return await Post.findByIdAndDelete(postId);
      } catch (err) {
        throw new Error(err);
      }
    },
    editPost: async (_, { postId, title, description }) => {
      try {
        return await Post.findByIdAndUpdate(
          postId,
          {
            title,
            description,
            createdAt: Date.now(),
          },
          { new: true }
        );
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
