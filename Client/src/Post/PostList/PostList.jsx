import React, { Component } from 'react';
import PostCard from '../PostCard/PostCard';
import styles from './post-list.module.scss';

function renderPosts(posts) {
    return posts.map(post => {
      return (<PostCard key={post.id} {...post} />);
    });
  }

class PostList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className={styles.container}>
                {renderPosts(this.props.posts)}
            </div>
        )
    }
}

export default PostList;