// Router
import { routes } from '../routes';

export const initRoutes = (app) => {
  app.use('/api/auth', routes.auth);

  app.use('/api/users', routes.user);

  app.use('/api/posts', routes.post);

  app.use('/api/comments', routes.comment);

  app.use('/api/conversations', routes.conversation);

  app.use('/api/interests', routes.interest);

  app.use('*', (req, res, next) => res.status(404).end());
};