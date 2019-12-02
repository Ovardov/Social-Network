import React, { Fragment, useEffect, useState } from 'react';
import Weather from '../Weather/Weather';
import CreatePost from '../Post/CreatePost/CreatePost';
import PostList from '../Post/PostList/PostList';
import postService from '../services/postService';
import styles from './home-page.module.scss';


function HomePage() {
    const [posts, setData] = useState([]);

    useEffect(() => {
        postService.loadPosts()
            .then(posts => {
                setData(posts)
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    return (
        <Fragment>
            <section className={styles['left-column']}>
                <Weather />
            </section>

            <section className={styles['middle-column']}>
                <CreatePost />
                <PostList posts={posts}/>
            </section>

            <section className={styles['right-column']}>
                <Weather />
            </section>
        </Fragment>
    )

}

export default HomePage;