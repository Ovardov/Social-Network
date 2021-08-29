// Libraries
import { validationResult } from 'express-validator';
// Models
import { Interest, User } from '../models';

module.exports = {
  get: {
    getOneInterest: async (req, res, next) => {
      try {
        // Check for data errors
        const errors = validationResult(req);

        const { name } = req.params;

        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }

        const query = { name };

        const interests = await Interest.find(query)
          .populate({ path: 'users', select: 'firstName lastName username profilePicture', sort: { firstName: 1, lastName: 1 } });

        res.status(200).send(interests);
      } catch (err) {
        next(err);
      }
    },
  },
};
