// Libraries
import React, { FC } from 'react';
// Components
import Navigation from './Navigation';
// Hooks
import { AuthProvider } from '../../hooks/useAuth';

// ToDo -> Remove any type
const App: FC<any> = ({ ...props }) => {
  return (
    <AuthProvider userData={props?.user}>
      <Navigation postData={props?.posts} />
    </AuthProvider>
  );
};

export default App;
