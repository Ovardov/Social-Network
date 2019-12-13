import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import PublicHomePage from '../HomePage/PublicHomePage/PublicHomePage';
import LoginRegisterPage from '../LoginRegisterPage/LoginRegisterPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import SearchPage from '../SearchPage/SearchPage';
import userService from '../services/userService';
import styles from './app.module.scss';
import Loader from '../shared/Loader/Loader';

export const UserContext = createContext({ name: '', username: '', isLogged: false })

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    userService.auth()
      .then(user => {

        if (user.hasOwnProperty('username')) {
          setIsLogged(true);
          setName(user.name);
          setUsername(user.username);
          setProfilePicture(user.profilePicture);
        }
      })
      .catch(err => console.log(err))

    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ isLogged, setIsLogged, name, setName, username, setUsername, profilePicture, setProfilePicture }}>
      <BrowserRouter >
        <div className={styles.site}>
          {isLoading === true && <Loader isLoading={isLoading} />}

          {isLogged === true && <Header />}

          <main className={isLogged === true ? styles['site-main'] : ""}>
            <Switch>
              <Route exact path="/" component={isLogged === true ? HomePage : PublicHomePage} />
              {isLogged === false && <Route path="/login" component={LoginRegisterPage} />}
              {isLogged === false && <Route path="/register" component={LoginRegisterPage} />}
              {isLogged === true && <Route path="/profile/:username" component={ProfilePage} />}
              {isLogged === true && <Route path="/search" component={SearchPage} />}
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
