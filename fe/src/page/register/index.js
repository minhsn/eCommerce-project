import React from "react";
import { useRef, useState } from "react";
import request from "../../utils/request";
import classNames from "classnames/bind";
import styles from './Register.module.css'

const cx = classNames.bind(styles)

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')

  const usernameValidate = useRef()
  const passwordValidate = useRef()
  const sdtValidate = useRef()
  const adressValidate = useRef()

  
  let errorFlg = false
  
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    usernameValidate.current.innerText = ''
    passwordValidate.current.innerText = ''
    sdtValidate.current.innerText = ''
    adressValidate.current.innerText = ''

    if (!username) {
      usernameValidate.current.innerText = 'Username is required'
      errorFlg = true
    } 
    if (!password) {
      passwordValidate.current.innerText = 'Password is required'
      errorFlg = true
    }
    if (!phone) {
      sdtValidate.current.innerText = 'Phone is required'
      errorFlg = true
    }
    if (!address) {
      adressValidate.current.innerText = 'Adress is required'
      errorFlg = true
    }
    if (!errorFlg) {
      try {
        await request.post('/api/auth/register', {
          username: username,
          password: password,
          address: address,
          sdt: phone,
          email: email
      })
      window.location.replace('/login')
      } catch (error) {
        console.log(error);
        usernameValidate.current.innerText = error.response.data.message || 'login error'
      }
    }

  }

  const handleOnChange = (e) => {
    if(e.target.name === 'username') {
      setUsername(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else if (e.target.name === 'sdt') {
      setPhone(e.target.value)
    } else if (e.target.name === 'address') {
      setAddress(e.target.value)
    } else if (e.target.name === 'email') {
      setEmail(e.target.value)
    }

  } 

  return (
    <div className={cx("register-page")}>
      <div className={cx("register-form-container")}>
        <h1 className={cx("register-tittle")}>Register account</h1>
        <form>
            <div>
                <label htmlFor="username" className={cx("form-label")}>Username</label>
                <input id="username" className={cx("form-input")} name="username" type="text" onChange={handleOnChange} value={username}/>
                <span className={cx('required')} ref={usernameValidate}></span>
            </div>

            <div>
                <label htmlFor="password" className={cx("form-label")}>Password</label>
                <input id="password" className={cx("form-input")} name="password" type="password" onChange={handleOnChange} value={password}/>
                <span className={cx('required')} ref={passwordValidate}></span>
            </div>

            <div>
                <label htmlFor="sdt" className={cx("form-label")}>Phone</label>
                <input id="sdt" className={cx("form-input")} name="sdt" type="text" onChange={handleOnChange} value={phone}/>
                <span className={cx('required')} ref={sdtValidate}></span>
            </div>

            <div>
                <label htmlFor="address" className={cx("form-label")}>Address</label>
                <input id="address" className={cx("form-input")} name="address" type="text" onChange={handleOnChange} value={address}/>
                <span className={cx('required')} ref={adressValidate}></span>
            </div>

            <div>
                <label htmlFor="email" className={cx("form-label")}>Email</label>
                <input id="email" className={cx("form-input")} name="email" type="text" onChange={handleOnChange} value={email}/>
            </div>

            <button type="submit" className={cx("submit-button")} onClick={handleOnSubmit}>Register</button>
        </form>
      </div>
    </div>
  );
}
