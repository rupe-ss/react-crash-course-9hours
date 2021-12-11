import React from 'react';

const Search = ({ search, setSearch }) => {
    return (
        <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
            <input
                autoFocus
                id='search'
                type='text'
                placeholder='Search'
                role='searchbox'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    );
};

export default Search;
