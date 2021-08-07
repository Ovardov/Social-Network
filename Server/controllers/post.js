// Libraries
import { validationResult } from 'express-validator';
import { uploader as cloudinaryUploader } from 'cloudinary/lib/v2';
// Models
import models from '../models';

const populateOptions = {
  image: 'image',
  author: [
    {
      path: 'author',
      select: [
        'firstName',
        'lastName',
        'fullName',
        'username',
        'profilePicture',
      ],
      populate: 'profilePicture',
    },
  ],
  comments: [
    {
      path: 'comments',
      populate: {
        path: 'author',
        select: ['firstName', 'lastName', 'fullName', 'username'],
      },
    },
  ],
  likes: [
    {
      path: 'likes',
      populate: {
        path: 'likedBy',
        select: ['firstName', 'lastName', 'fullName', 'username'],
      },
    },
  ]
};

module.exports = {
  get: {
    getOnePost: (req, res, next) => {
      const { id } = req.params;

      // Check for data errors
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const query = { _id: id };

      models.Post.find(query)
        .populate('image')
        .populate([
          {
            path: 'author',
            select: [
              'firstName',
              'lastName',
              'fullName',
              'username',
              'profilePicture',
            ],
            populate: 'profilePicture',
          },
        ])
        .populate([
          {
            path: 'comments',
            populate: {
              path: 'author',
              select: ['firstName', 'lastName', 'fullName', 'username'],
            },
          },
        ])
        .populate([
          {
            path: 'likes',
            populate: {
              path: 'likedBy',
              select: ['firstName', 'lastName', 'fullName', 'username'],
            },
          },
        ])
        .sort({ createdAt: -1 })
        .then((post) => res.send(post))
        .catch(next);
    },
    getAllPosts: async (req, res, next) => {
      const userId = req.user._id;

      try {
        // Get my friends
        const { friends: myFriends } = await models.User.findOne({
          _id: userId,
        }).select('friends');

        // Get all my friends'posts and all my posts, sorted by created date in descending
        const posts = await models.Post.find({
          author: { $in: [...myFriends, userId] },
        })
          .populate('image')
          .populate([
            {
              path: 'author',
              select: [
                'firstName',
                'lastName',
                'fullName',
                'username',
                'profilePicture',
              ],
              populate: 'profilePicture',
            },
          ])
          .populate([
            {
              path: 'comments',
              populate: {
                path: 'author',
                select: ['firstName', 'lastName', 'fullName', 'username'],
              },
            },
          ])
          .populate([
            {
              path: 'likes',
              populate: {
                path: 'likedBy',
                select: ['firstName', 'lastName', 'fullName', 'username'],
              },
            },
          ])
          .sort({ createdAt: -1 });

        res.send(posts);
      } catch (err) {
        next(err);
      }
    },
  },

  post: {
    create: async (req, res, next) => {
      const { content } = req.body;
      const authorId = req.user._id;

      // Post Image
      const { file } = req;

      try {
        // Check for data errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }

        let createdImage;

        if (file) {
          // Upload profile picture to cloudinary
          const uploadedImage = await cloudinaryUploader.upload(file.path, {
            quality: 'auto',
            width: 1024,
            height: 1024,
            crop: 'limit',
          });

          createdImage = await models.Image.create({
            imageUrl: uploadedImage.url,
          });
        }

        const postData = {
          content,
          //  If image is empty do not save to db
          ...(createdImage ? { image: createdImage._id } : null),
          author: authorId,
        };

        const createdPost = await models.Post.create(postData);

        const authorOptions = populateOptions.author[0];
        const authorFields = authorOptions.select.join(' ');
        const authorPopulateFields = authorOptions.populate;

        const author = await models.User

          .findByIdAndUpdate(
            { _id: authorId },
            { $push: { posts: createdPost._id } },
            { select: authorFields, }
          )
          .populate(authorPopulateFields);

          
        const post = {
          ...createdPost.toJSON(),
          author: author.toJSON(),
          ...(createdImage ? { image: createdImage } : null),
        };

        res.status(201).send(post);
      } catch (e) {
        next(e);
      }
    },
  },

  put: {
    edit: async (req, res, next) => {
      const { id } = req.params;
      const { content } = req.body;

      

      try {
        await models.Post.findOneAndUpdate({ _id: id }, { content });
        res.status(200).send('Edited Successfully!');
      } catch (e) {
        next(e);
      }
    },

    likePost: async (req, res, next) => {
      const { id } = req.params;
      const authorId = req.user._id;

      try {
        const createdLike = await models.Like.create({
          post: id,
          likedBy: authorId,
        });

        const updatedPost = await models.Post
          .findByIdAndUpdate(
            { _id: id },
            { $push: { likes: createdLike._id } },
            { new: true },
          )
          .populate(populateOptions.image)
          .populate(populateOptions.author)
          .populate(populateOptions.comments)
          .populate(populateOptions.likes);

        res.status(200).send(updatedPost);
      } catch (e) {
        next(e);
      }
    },

    dislikePost: async (req, res, next) => {
      const { id } = req.params;
      const authorId = req.user._id;

      try {
        const removedLike = await models.Like.findOneAndDelete({
          post: id,
          likedBy: authorId,
        });

        const post = await models.Post
          .findByIdAndUpdate(
            { _id: id },
            { $pull: { likes: removedLike._id } },
            { new: true, }
          )
          .populate(populateOptions.image)
          .populate(populateOptions.author)
          .populate(populateOptions.comments)
          .populate(populateOptions.likes);

        res.status(200).send(post);
      } catch (e) {
        next(e);
      }
    },
  },

  delete: {
    removePost: async (req, res, next) => {
      const id = req.params.id;

      try {
        const removedPost = await models.Post.findOneAndDelete({ _id: id });

        await models.Comment.deleteMany({ post: id });
        await models.Like.deleteMany({ post: id });
        await models.Image.findOneAndDelete({ _id: removedPost.image });

        await models.User.updateOne(
          { _id: removedPost.author },
          { $pull: { posts: removedPost._id } }
        );

        res.status(200).send(removedPost);
      } catch (e) {
        next(e);
      }
    },
  },
};
