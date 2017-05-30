import React, { Component } from 'react';

import './Header.scss';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <div className="p3 title">
                    <h1 className="h3">UAXplorer</h1>
                </div>
            </div>
        );
    }
}

export default Header;
