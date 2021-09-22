// Libraries
import React, { FC, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
// Components
import UserInfo from '../../components/Global/UserInfo';
// Models
import User_ from '../../models/User';
// Styles
import styles from './index.module.scss';

interface SearchPageState {
  searchedUsersByFullName: User_[];
  searchedUsersByInterests: User_[];
}

const SearchPage: FC<RouteComponentProps<{}, {}, SearchPageState>> = (props) => {
  const { location: { state, }, } = props;

  const searchedUsersByFullName = useMemo(() => {
    return state?.searchedUsersByFullName || [];
  }, [state]);

  const searchedUsersByInterests = useMemo(() => {
    return state?.searchedUsersByInterests || [];
  }, [state]);


  const sections = [
    { users: searchedUsersByFullName, criterion: "user's name", },
    { users: searchedUsersByInterests, criterion: "interests", }
  ];

  return (
    <div className={styles.container}>
      {sections.map(({ users, criterion, }) => (
        <section key={criterion}>
          <header>
            <h3>By {criterion}</h3>
          </header>

          <div>
            {users.length > 0 && users.map((user: User_) => (
              <UserInfo key={user.username} user={user} isSeparated />
            ))}

            {users.length === 0 && <p className={styles.text}>No users found.</p>}
          </div>

        </section>
      ))}
    </div>
  );
};

export default SearchPage;
