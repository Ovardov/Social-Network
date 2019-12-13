import React, { Fragment, useEffect, useState, useContext } from 'react';
import { UserContext } from '../App/App';
import Weather from '../Weather/Weather';
import SuggestedFriend from '../SuggestedFriend/SuggestedFriend';
import CreatePost from '../Post/CreatePost/CreatePost';
import PostList from '../Post/PostList/PostList';
import postService from '../services/postService';
import userService from '../services/userService';
import styles from './home-page.module.scss';


function HomePage(props) {
    const [posts, setPosts] = useState([]);
    const { username } = useContext(UserContext);
    const [expectedFriends, setExpectedFriends] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await userService.loadUser(username);
                setUser(res[0]);
                const posts = await postService.loadPosts();

                const allFriendsUsername = res[0].friends.map(friend => friend.username);
                setExpectedFriends([username, allFriendsUsername]);

                const friendsPosts = res[0].friends.map(friend => friend.posts);
                let allFriendPosts = [];

                for (let oneFriendPosts of friendsPosts) {
                    for (let post of oneFriendPosts) {
                        allFriendPosts.push(post);
                    }
                }

                const postsForDashboard = posts.filter(post => allFriendPosts.includes(post._id));
                setPosts(postsForDashboard);
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, [username]);

    return (
        <Fragment>
            <section className={styles['left-column']}>
                <Weather />
            </section>

            <section className={styles['middle-column']}>
                <CreatePost props={props}/>
                <PostList posts={posts} user={user} setPosts={setPosts}/>
            </section>

            <section className={styles['right-column']}>
                <SuggestedFriend expectedFriends={expectedFriends} />
            </section>
        </Fragment>
    )
}

export default HomePage;