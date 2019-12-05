import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import PublicHomePage from '../HomePage/PublicHomePage/PublicHomePage';
import LoginRegisterPage from '../LoginRegisterPage/LoginRegisterPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import SearchPage from '../SearchPage/SearchPage';
import styles from './app.module.scss';

export const UserContext = createContext({name: '', username: '', isLogged: false})

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={{isLogged, setIsLogged, name, setName, username, setUsername}}>
      <BrowserRouter >
        <div className={styles.site}>
          {isLogged === true && <Header />}

          <main className={isLogged === true ? styles['site-main'] : ""}>
            <Switch>
              <Route exact path="/" component={isLogged === true ? HomePage : PublicHomePage} />
              {isLogged === false && <Route path="/login" component={LoginRegisterPage} />}
              {isLogged === false && <Route path="/register" component={LoginRegisterPage} />}
              {isLogged === true && <Route path="/profile/:id" component={ProfilePage} />}
              {isLogged === true && <Route path="/search" component={SearchPage} />}
            </Switch>
          </main>
        </div>
      </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
