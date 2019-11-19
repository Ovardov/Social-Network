import React from 'react';
import styles from './search.module.scss';

function Search() {
    return (
        <form className={styles.container}>
            <p>
                <input type="text" placeholder="Search" name="search" />
            </p>

            <button type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    )
}

export default Search;