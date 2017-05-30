import React from 'react';

import './Checkbox.scss';
import './Checkbox.css';

export default ({
    name,
    label,
    checked,
    onChange,
}) => (
    <div className="checkbox my1">
        <input
            id={ name }
            type="checkbox"
            defaultChecked={ true }
            />
        <label htmlFor={ name }
            className="align-middle">
            { label }
        </label>
    </div>
);
