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
import User_ from '../../models/User';
// Styles
import styles from './index.module.scss';
import { setPostsAction } from '../../redux/actions/Posts';
import { getSuggestedNewFriends } from '../../services/userService';
import UserInfo from '../../components/Global/UserInfo';
import InfoCard from '../../components/Global/InfoCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedNewFriends, setSuggestedNewFriends] = useState([]);

  useEffect(() => {
    const initHomePageData = async () => {
      try {
        setIsLoading(true);

        const allPosts = await getAllPosts() as Post_[];
        const allSuggestedNewFriends = await getSuggestedNewFriends() as User_[];

        setSuggestedNewFriends(allSuggestedNewFriends);
        dispatch(setPostsAction(allPosts));
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
        {/* <SearchBox /> */}

        {suggestedNewFriends?.length > 0 && (
          <InfoCard title='Suggested New Friends'>
            {suggestedNewFriends.map((suggestedFriend: User_) => (
              <UserInfo key={suggestedFriend.username} user={suggestedFriend} />
            ))}
          </InfoCard>
        )}
      </section>
    </div>
  );
};

export default HomePage;
