import React from 'react';
import PropTypes from 'prop-types';
import './style.css'; 

function SearchBox(props) {
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <i class="fas fa-search"></i>
                </div>
            </div>
            <input 
                type="text" 
                className="form-control"
                value={props.value} 
                placeholder="Search users" 
                onChange={props.onChange} 
                aria-label="Search Field for users" 
            />
        </div>
    );
}

export default SearchBox; 