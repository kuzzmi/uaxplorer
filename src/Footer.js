import React from 'react';

import './Footer.scss'; // just for vim reference
import './Footer.css';

const Footer = () => (
    <div className="Footer">
        <p className="center bold mb1">
            Built with ♥ by <a href="https://kuzzmi.com">@kuzzmi</a>
        </p>
        <p className="center h6 muted">
            Data is provided by <a href="https://auto.ria.com">auto.ria.com</a>
        </p>
    </div>
);

export default Footer;
