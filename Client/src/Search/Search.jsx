import React from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from './search.module.scss';

function Search() {
    return (
        <form className={styles.container}>
            <p>
                <input type="text" placeholder="Search" name="search" />
            </p>

            <button type="submit">
                <FiSearch />
            </button>
        </form>
    )
}

export default Search;