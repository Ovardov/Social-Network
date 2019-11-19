import React, { Fragment } from 'react';
import Weather from '../Weather/Weather';
import CreatePost from '../Post/CreatePost/CreatePost';
import PostList from '../Post/PostList/PostList';
import styles from './home-page.module.scss';
import data from '../data';


function HomePage() {
    return (
        <Fragment>
            <section className={styles['left-column']}>
                <Weather />
            </section>

            <section className={styles['middle-column']}>
                <CreatePost />
                <PostList posts={data} />
            </section>

            <section className={styles['right-column']}>
                <Weather />
            </section>
        </Fragment>
    )

}

export default HomePage;