// Libraries
import React, { FC } from 'react';
import { Provider } from 'react-redux';
// Components
import Navigation from './Navigation';
// Redux
import store from '../../redux';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
