import React from 'react';

import './Radio.css';

export default ({
    name,
    label,
    value,
    onChange,
}) => (
    <div className="radio my1">
        <input
            id={ name }
            name={ name }
            type="radio"
            value={ value }
            onChange={ onChange }
            />
        <label htmlFor={ name }
            className="align-middle">
            { label }
        </label>
    </div>
);
