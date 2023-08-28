import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function Header() {
    return (<header className={cx('wrapper')}>
        <div className={cx('nav')}>
            <ul className={cx('nav-list')}>
                <li className={cx('nav-item')}>
                    <Link to='/' class="navbar-brand" ><img src={'logo/logo.png'} class={cx('logo')} alt='logo' /></Link>
                </li>
                <li className={cx('nav-item')}>menu</li>
                <li className={cx('nav-item')}>order</li>
            </ul>
            <ul className={cx('nav-list')}>
                <li className={cx('nav-item')}>login</li>
                <li className={cx('nav-item')}>register</li>
            </ul>
        </div>
    </header> )
}

export default Header;