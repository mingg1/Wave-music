'use strict';

import Comment from '../../models/Comment';

export default {
  Query: {
    comments: async (_, { type, pageId }) => {
      try {
        let comments;
        if (type === 'post') {
          comments = await Comment.find({ type, postId: pageId });
        } else comments = await Comment.find({ type, refId: pageId });
        return comments;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    addComment: async (_, args) => {
      try {
        const newComment = new Comment({ ...args });
        const result = await newComment.save();
        return result;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteComment: async (_, { commentId }) => {
      try {
        return await Comment.findByIdAndDelete(commentId);
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
