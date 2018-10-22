import React from 'react';
import PropTypes from 'prop-types';
import './style.css'; 

function SearchBox(props) {
    return (
        <div className="input-group mb-4">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <i class="fas fa-search"></i>
                </div>
            </div>
            <input 
                type="text" 
                className="form-control yodlr-searchbox__field"
                value={props.value} 
                placeholder="Search users" 
                onChange={props.onChange} 
                aria-label="Search Field for users" 
            />
        </div>
    );
}

export default SearchBox; 