import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

class Navbar extends Component {
    render() {
        return (
            <div className={ styles.outerContainer }>
                <div className={ styles.innerContainer }>
                    <div className={ styles.siteTitle }>
                        Simple Invoices
                    </div>
                    <ul className={ styles.ul }>
                        <li className={ styles.li }>
                            <Link to="/about">About</Link>
                        </li>
                        <li className={ styles.li }>
                            <Link to="/login">Log In</Link>
                        </li>
                    </ul>
                    <div className={styles.dropdownButton}>
                        <i className="fa fa-bars fa-lg"></i>
                    </div>
                    <div className={styles.sideMenu}>
                        <Link className={styles.sideMenuLink} to="/login">Login</Link>
                        <Link className={styles.sideMenuLink} to="/about">About</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;