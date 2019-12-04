import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import PublicHomePage from '../HomePage/PublicHomePage/PublicHomePage';
import LoginRegisterPage from '../LoginRegisterPage/LoginRegisterPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import SearchPage from '../SearchPage/SearchPage';
import styles from './app.module.scss';


function App() {
  return (
    <BrowserRouter >
      <div className={styles.site}>
        {/* <Header /> */}
        {/* className={styles['site-main']} */}
        <main >
          <Switch>
            <Route exact path="/" component={PublicHomePage} />
            <Route path="/login" component={LoginRegisterPage} />
            <Route path="/register" component={LoginRegisterPage} />
            <Route path="/profile/:id" component={ProfilePage} />
            <Route path="/search" component={SearchPage} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>

  );
}

export default App;
