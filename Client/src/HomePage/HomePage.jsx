import React, { Fragment, useEffect, useState, useContext } from 'react';
import { UserContext } from '../App/App';
import Weather from '../Weather/Weather';
import SuggestedFriend from '../SuggestedFriend/SuggestedFriend';
import PostList from '../Post/PostList/PostList';
import CreatePost from '../Post/CreatePost/CreatePost';
import postService from '../services/postService';
import userService from '../services/userService';
import styles from './home-page.module.scss';
import Loader from '../shared/Loader/Loader';


function HomePage(props) {
    const [posts, setPosts] = useState([]);
    const { username } = useContext(UserContext);
    const [expectedFriends, setExpectedFriends] = useState([]);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async function () {
            try {
                const res = await userService.loadUser(username);
                setUser(res[0]);
                const posts = await postService.loadPosts();

                const expected = res[0].friends.map(friend => friend.username);
                expected.push(res[0].username);
                setExpectedFriends(expected);

                const friendsPosts = res[0].friends.map(friend => friend.posts);
                let allFriendPosts = [];

                for (let oneFriendPosts of friendsPosts) {
                    for (let post of oneFriendPosts) {
                        allFriendPosts.push(post);
                    }
                }

                const postsForDashboard = posts.filter(post => allFriendPosts.includes(post._id));
                setPosts(postsForDashboard);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [username]);


    return (
        <Fragment>
            {isLoading === true && <Loader isLoading={isLoading} />}

            <section className={styles['left-column']}>
                <Weather />
            </section>

            <section className={styles['middle-column']}>
                <CreatePost props={props} />
                <PostList posts={posts} props={props} user={user} setPosts={setPosts} />
            </section>

            <section className={styles['right-column']}>
                <SuggestedFriend props={props} expectedFriends={expectedFriends} />
            </section>
        </Fragment >
    )
}

export default HomePage;