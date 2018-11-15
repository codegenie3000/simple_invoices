import React, {Component} from 'react'
import styles from './Splash.module.css';
import GlobalStyles from '../stylesheets/GlobalElements.module.css';

export default () => {
    return (
        <div className={GlobalStyles.container}>
            <div className={styles.jumbotron}>
                <h1>Create simple invoices for people to pay</h1>
                <h2>Log in to get started</h2>
            </div>
        </div>
    );
}