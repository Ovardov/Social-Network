import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import ProfilePage from '../ProfilePage/ProfilePage';
import FriendList from '../Friend/FriendList/FriendList';
import styles from './app.module.scss';
import friends from '../friends';


function App() {
  return (
    <BrowserRouter>
      <div className={styles.site}>
        <Header />

        <main className={styles['site-main']}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/profile/:id" component={ProfilePage} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>

  );
}

export default App;
