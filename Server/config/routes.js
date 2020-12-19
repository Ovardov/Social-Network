// Router
import { routes } from '../routes';

export const initRoutes = (app) => {
  app.use('/api/auth', routes.auth);

  app.use('/api/user', routes.user);

  app.use('/api/post', routes.post);

  app.use('/api/comment', routes.comment);

  app.use('/api/conversation', routes.conversation)

  app.use('*', (req, res, next) => res.status(404).end());
};