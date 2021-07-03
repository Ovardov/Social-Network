// Libraries
import React, { useState } from 'react';
// Components
import CreatePost from '../../components/Home/CreatePost';
import ErrorsList from '../../components/Global/ErrorsList';
import PostList from '../../components/Home/PostList';
import SearchBox from '../../components/Global/SearchBox';
// Styles
import styles from './index.module.scss';

const HomePage = () => {
  const [errors, setErrors] = useState([]);

  return (
    <div className={styles.container}>
      <section>
        {/* Errors Box */}
        {errors.length > 0 && <ErrorsList errors={errors} />}

        <CreatePost />

        <PostList />
      </section>

      <section>
        <SearchBox />
      </section>
    </div>
  );
};

export default HomePage;
