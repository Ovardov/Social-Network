// Libraries
import React, { FC } from 'react';
import { Provider } from 'react-redux';
// Components
import Navigation from './Navigation';
// Redux
import store from '../../redux';

// ToDo -> Remove any type
const App: FC<any> = ({ user, posts, }) => {
  return (
    <Provider store={store}>
      <Navigation user={user} postData={posts} />
    </Provider>
  );
};

export default App;
