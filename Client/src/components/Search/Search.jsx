import React from 'react';
import styles from './search.module.scss';

function Search({ submit, changeSet, withoutButton }) {
    return (
        <form className={styles.container} onSubmit={submit}>
            <p>
                {changeSet
                    ? <input type="text" placeholder="Search" name="search" onChange={e => changeSet(e.target.value)} />
                    : <input type="text" placeholder="Search" name="search" />
                }
            </p>

            {withoutButton !== true && <button type="submit"><i className="fas fa-search"></i></button>}
        </form>
    )
}

export default Search;