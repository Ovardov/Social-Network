// Libraries
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// Components
import CreatePost from '../../components/Home/CreatePost';
import ErrorsList from '../../components/Global/ErrorsList';
import PostList from '../../components/Home/PostList';
import SearchBox from '../../components/Global/SearchBox';
import Loader from '../../components/Global/Loader';
// Services
import { getAllPosts } from '../../services/postService';
// Utils
import { Colors } from '../../utils/enums';
// Models
import Post_ from '../../models/Post';
// Styles
import styles from './index.module.scss';
import { setPostsAction } from '../../redux/actions/Posts';

const HomePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initHomePageData = async () => {
      try {
        setIsLoading(true);

        const res = await getAllPosts() as Post_[];

        dispatch(setPostsAction(res));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoading) {
      initHomePageData();
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles['posts-container']}>
        <CreatePost />

        {isLoading ? <Loader type='local' color={Colors.PRIMARY} /> : <PostList />}
      </section>

      <section>
        <SearchBox />
      </section>
    </div>
  );
};

export default HomePage;
