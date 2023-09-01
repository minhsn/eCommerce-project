import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { Cookies } from 'react-cookie';
import { useState } from 'react';

const cx = classNames.bind(styles)

function Header() {
    const cookies= new Cookies()
    const [token, setToken] = useState(cookies.get('token'))



    return (<header className={cx('wrapper')}>
        <div className={cx('nav')}>
            <ul className={cx('nav-list')}>
                <li className={cx('nav-item')}>
                    <Link to='/' className={cx("navbar-brand")} ><img src={'logo/logo.png'} className={cx('logo')} alt='logo' /></Link>
                </li>
            </ul>
            <ul className={cx('nav-list')} style={{display: token? 'none': 'block'}}>
                <li className={cx('nav-item')}>
                    <Link to='/login' className={cx('link-button')}>Login</Link>
                </li>
                <li className={cx('nav-item')}>
                    <Link to='/register' className={cx('link-button')}>Register</Link>
                </li>
            </ul>
            <ul className={cx('nav-list')} style={{display: !token? 'none': 'block'}}>
                <li className={cx('nav-item')}>
                    <Link to='/login' >avatar</Link>
                </li>
            </ul>
        </div>
    </header> )
}

export default Header;