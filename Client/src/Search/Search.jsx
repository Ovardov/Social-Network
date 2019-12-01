import React from 'react';
import styles from './search.module.scss';

function Search({ submit }) {
    return (
        <form className={styles.container} onSubmit={submit}>
            <p>
                <input type="text" placeholder="Search" name="search" />
            </p>

            <button type="submit">
                <i className="fas fa-search"></i>
            </button>
        </form>
    )
}

export default Search;