import React from 'react';

import './Button.scss';
import './Button.css';

export default ({
    type = 'default',
    onClick,
    children,
}) =>
    <button className={ `button button-${type}` }
        onClick={ onClick }>
        { children }
    </button>;
