import React from 'react';
import 'index.css';

const Footer = ({ length }) => {
    return (
        <footer className='main'>
            {length} List {length === 1 ? 'item' : 'items'}
        </footer>
    );
};

export default Footer;
