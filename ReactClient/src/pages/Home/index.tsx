// Libraries
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// Components
import CreatePost from '../../components/Home/CreatePost';
import PostList from '../../components/Home/PostList';
import SearchBox from '../../components/Global/SearchBox';
import Loader from '../../components/Global/Loader';
import UserInfo from '../../components/Global/UserInfo';
import InfoCard from '../../components/Global/InfoCard';
// Services
import { getAllPosts } from '../../services/postService';
import { getSuggestedNewFriends, searchUsers } from '../../services/userService';
// Actions
import { setPostsAction } from '../../redux/actions/Posts';
// Utils
import { Colors } from '../../utils/enums';
// Models
import Post_ from '../../models/Post';
import User_ from '../../models/User';
// Styles
import styles from './index.module.scss';

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const onSearchHandler = async (searchValue: string) => {
    try {
      const searchedUsersByFullName = await searchUsers(searchValue, 'fullName');
      const searchedUsersByInterests = await searchUsers(searchValue, 'interests');

      history.push('/search', { searchedUsersByFullName, searchedUsersByInterests, });
    } catch (err) {
      // To Do -> Handle Error
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles['posts-container']}>
        <CreatePost />

        {isLoading ? <Loader type='local' color={Colors.PRIMARY} /> : <PostList />}
      </section>

      <section>
        <div className={styles['search-box-container']}>
          <SearchBox onSubmit={onSearchHandler} />
        </div>

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
