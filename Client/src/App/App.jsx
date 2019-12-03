import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import PublicHomePage from '../HomePage/PublicHomePage/PublicHomePage';
import LoginPage from '../LoginPage/LoginPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import SearchPage from '../SearchPage/SearchPage';
import styles from './app.module.scss';


function App() {
  return (
    <BrowserRouter >
      <div className={styles.site}>
        <Header />
         
        <main className={styles['site-main']}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/* <Route path="/login" component={LoginPage} /> */}
            <Route path="/profile/:id" component={ProfilePage} />
            <Route path="/search" component={SearchPage} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>

  );
}

export default App;
