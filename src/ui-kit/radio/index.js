import React from 'react';

import './Radio.scss';
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
            defaultChecked={ true }
            />
        <label htmlFor={ name }
            className="align-middle">
            { label }
        </label>
    </div>
);
