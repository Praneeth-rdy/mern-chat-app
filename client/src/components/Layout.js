import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'
import Styles from '../styles/layout.module.css';

function Layout({ children }) {
    return (
        <div className={Styles.mainBgContainer}>
            <header>
                <nav className={Styles.navbar}>
                    <Link to="/">textMe</Link>
                    <FaBars className={Styles.bars} />
                    <ul className={Styles.navbarNav}>
                        <li className={Styles.navItem}>
                            <Link to="/register">Register</Link>
                        </li>
                        <li className={Styles.navItem}>
                            <Link to="/login">Login</Link>
                        </li>
                        <li className={Styles.navItem}>
                            <Link to="/private">Private</Link>
                        </li>
                    </ul>

                </nav>
            </header>

            <div className={Styles.mainBody}>
                {children}
            </div>
            <footer>
                <div className={Styles.footerBlock}>
                    <h1>textMe</h1>
                    <p>Best texting app ever</p>
                </div>
                <div className={Styles.footerBlock}>
                    <h2>Quick Links</h2>
                    <Link to="" className={Styles.footerLink}>Link-1</Link>
                    <Link to="" className={Styles.footerLink}>Link-2</Link>
                    <Link to="" className={Styles.footerLink}>Link-3</Link>
                    <Link to="" className={Styles.footerLink}>Link-4</Link>
                </div>
                <div className={Styles.footerBlock}>
                    <p>Subscribe to Newsletter</p>
                    <input type="text"></input>
                </div>
                                
            </footer>
        </div>
    )
}

export default Layout;
