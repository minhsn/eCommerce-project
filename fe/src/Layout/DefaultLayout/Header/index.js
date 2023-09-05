import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useState } from "react";
import { FaSistrix } from "react-icons/fa";
import Button from "react-bootstrap/esm/Button";

const cx = classNames.bind(styles);

function Header() {
  const cookies = new Cookies();
  const [token] = useState(cookies.get("token"));
  const [searchWord, setSearchWord] = useState();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setSearchWord(e.target.value)
  }

  const handleOnKeyDown = async (e) => {
      if (e.key === 'Enter') {
        navigate(`/?name=${searchWord}`)
    }
  }

  const handleLogout = () => {
    cookies.remove("token")
    navigate(`/login`)
  }

  return (
    // logo
    <header className={cx("wrapper")}>
      <div className={cx("nav")}>
        <ul className={cx("nav-list")}>
          <li className={cx("nav-item")}>
            <Link to="/" className={cx("logo")}></Link>
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
            <Link to={`/?name=${searchWord}`} className={cx("searchButton")} >
              <FaSistrix/>
            </Link>
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
            <Button variant="outline-secondary" onClick={handleLogout}>logout</Button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
