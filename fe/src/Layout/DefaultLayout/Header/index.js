import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useContext, useState } from "react";
import { FaSistrix } from "react-icons/fa";
import request from "../../../utils/request";
import { ProductContext } from '../index'

const cx = classNames.bind(styles);

function Header() {
  const cookies = new Cookies();
  const [token] = useState(cookies.get("token"));
  const [searchWord, setSearchWord] = useState();
  const [, setProducts] = useContext(ProductContext)

  const handleSubmit = async () => {
      try {
        const res = await request.get('/api/public/products', {params: {
            name: searchWord
        }})
        setProducts(res.data)
    } catch (error) {
        alert('request error')
    }
  }

  const handleChange = (e) => {
    setSearchWord(e.target.value)
  }

  const handleOnKeyDown = async (e) => {
      if (e.key === 'Enter') {
        try {
            const res = await request.get('/api/public/products', {params: {
                name: searchWord
            }})
            setProducts(res.data)
        } catch (error) {
            alert('request error')
        }
    }
  }

  return (
    // logo
    <header className={cx("wrapper")}>
      <div className={cx("nav")}>
        <ul className={cx("nav-list")}>
          <li className={cx("nav-item")}>
            <Link to="/" className={cx("navbar-brand")}>
              <img src={"logo/logo.png"} className={cx("logo")} alt="logo" />
            </Link>
          </li>
        </ul>

        {/* search box */}
        <div className={cx("wrap")}>
          <div className={cx("search")}>
            <input
              type="text"
              className={cx("searchTerm")}
              placeholder="What are you looking for?"
              value={searchWord || ''}
              onChange={handleChange}
              onKeyDown={handleOnKeyDown}
            />
            <button type="submit" className={cx("searchButton")} onClick={handleSubmit}>
              <FaSistrix/>
            </button>
          </div>
        </div>

        {/* login, icon */}
        <ul
          className={cx("nav-list")}
          style={{ display: token ? "none" : "block" }}
        >
          <li className={cx("nav-item")}>
            <Link to="/login" className={cx("link-button")}>
              Login
            </Link>
          </li>
          <li className={cx("nav-item")}>
            <Link to="/register" className={cx("link-button")}>
              Register
            </Link>
          </li>
        </ul>
        <ul
          className={cx("nav-list")}
          style={{ display: !token ? "none" : "block" }}
        >
          <li className={cx("nav-item")}>
            <Link to="/login">avatar</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
