// Libraries
import React, { FC } from 'react';
import { Provider } from 'react-redux';
// Components
import Navigation from './Navigation';
// Redux
import store from '../../redux';
import { ExternalState as ExternalState_ } from '../../global';

const App: FC<ExternalState_> = ({ user, posts, }) => {
  return (
    <Provider store={store}>
      <Navigation user={user} posts={posts} />
    </Provider>
  );
};

export default App;
