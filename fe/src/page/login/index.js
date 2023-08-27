import React from "react";
import classNames from "classnames/bind";
import { useCookies } from 'react-cookie';
import { useEffect, useState, useRef } from "react";
import request from "../../utils/request";
import styles from './Login.module.css';

const cx = classNames.bind(styles)

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cookies, setCookie] = useCookies(['username']);

  const usernameValidate = useRef()
  const passwordValidate = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorFlg = false;
    usernameValidate.current.innerText = ''
    passwordValidate.current.innerText = ''

    if (!username) {
      usernameValidate.current.innerText = 'Username is required'
      errorFlg = true
    } 
    if (!password) {
      passwordValidate.current.innerText = 'Password is required'
      errorFlg = true
    }
    if (!errorFlg) {
      try {
        const res = await request.post('/api/auth/login', {
          username: username,
          password: password
        })
        setCookie('token', res.data.token, { path: '/' })
        window.location.replace('/')
  
      } catch (error) {
        console.log(error);
        passwordValidate.current.innerText = error.response.data.message || 'login error'
      }
    }
  }

  const handleOnChange = (e) => {
    if(e.target.name === 'username') {
      setUsername(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }

  } 
  useEffect(() => {

  }, [username])



  return (
    <div className={cx("login-page")}>
      <div className={cx("login-form-container")}>
        <h1 className={cx("login-tittle")}>Login account</h1>
        <form>
            <div>
                <label htmlFor="username" className={cx("form-label")}>Username</label>
                <input id="username" className={cx("form-input")} name="username" type="text" value={username || ''} onChange={e => handleOnChange(e)}/>
                <span className={cx('required')} ref={usernameValidate}></span>
            </div>

            <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input id="password" className={cx("form-input")} name="password" type="password" value={password || ''} onChange={e => handleOnChange(e)} />
                <span className={cx('required')} ref={passwordValidate}></span>
            </div>

            <button type="submit" className={cx("submit-button")} onClick={handleSubmit}>Login</button>
        </form>
      </div>
    </div>
  );
}
