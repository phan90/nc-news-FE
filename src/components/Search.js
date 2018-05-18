import React from 'react';
import PT from 'prop-types';

function SearchBar({ handleChange, search }) {
    return (
        <div>
            <form >
                <input className="search" placeholder="Search Articles" onChange={handleChange} value={search} />
            </form>
        </div>
    );
}

SearchBar.proptypes = {
    handleChange: PT.func.isRequired,
    search: PT.string.isRequired
}


export default SearchBar;