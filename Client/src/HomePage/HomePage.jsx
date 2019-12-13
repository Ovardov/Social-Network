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
    const [posts, SetPosts] = useState([]);
    const { username } = useContext(UserContext);
    const [expectedFriends, setExpectedFriends] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const user = await userService.loadUser(username);
                const posts = await postService.loadPosts();

                const allFriendsUsername = user[0].friends.map(friend => friend.username);
                setExpectedFriends([username, allFriendsUsername]);

                const friendsPosts = user[0].friends.map(friend => friend.posts);
                let allFriendPosts = [];

                for (let oneFriendPosts of friendsPosts) {
                    for (let post of oneFriendPosts) {
                        allFriendPosts.push(post);
                    }
                }

                const postsForDashboard = posts.filter(post => allFriendPosts.includes(post._id));
                SetPosts(postsForDashboard);
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
                <PostList posts={posts} />
            </section>

            <section className={styles['right-column']}>
                <SuggestedFriend expectedFriends={expectedFriends} />
            </section>
        </Fragment>
    )
}

export default HomePage;