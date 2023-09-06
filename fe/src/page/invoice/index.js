import { useEffect, useState } from "react";
import styles from "./Invoice.module.scss";
import classNames from "classnames/bind";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import request from "../../utils/request";

const cx = classNames.bind(styles)

function Invoice() {
    const [products, setProducts] = useState({})
    const [key, setKey] = useState([])
    const [total, setTotal] = useState()
    const [phone, setPhone] = useState('')
    const [adress, setAddress] = useState('')
    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/')
    }

    const handleChange = (e) => {
        if(e.target.name === 'adress') {
            setAddress(e.target.value)
          } else if (e.target.name === 'phone') {
            setPhone(e.target.value)
          }
    }

    const handleSave = async () => {
        try {
            const pro = key.map(k => {
                return {
                    id: k,
                    number: products[`${k}`].number
                }
            })
            await request.post('/api/private/invoice', {
                products: pro,
                address: adress,
                phone: phone,
                total:total
            }, {
                withCredentials: true,
            })
            localStorage.removeItem('product')
            alert('update success')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleDelete = (i) => {
        const dataProduct = JSON.parse(localStorage.getItem('product')) || {}
        delete dataProduct[`${i}`]
        localStorage.setItem('product', JSON.stringify(dataProduct))
        setKey(k => k.filter(e => e!== i))
    }


    useEffect(() => {
        const dataProduct = JSON.parse(localStorage.getItem('product')) || {}
        const dataKey = Object.keys(dataProduct) || []
        setKey(dataKey);
        setProducts(dataProduct)

        const dataTotal = dataKey.reduce((total, e) => {
            return dataProduct[`${e}`].price * dataProduct[`${e}`].number + total 
        }, 0)
        setTotal(dataTotal)
    }, [key])
    
    return ( <div className={cx('wrap-content')}>
        <h1>Total bill</h1>
        <div className={cx('wrap-item')}>
            {key.map((e, i) => {
                return (
                     <div key={i} className={cx('item')}>
                        <img src={`http://localhost:18001/api/public/image?imgName=${products[e].imageUrl}`} alt="img" ></img>
                        <p> {products[e].name} </p>
                        <p> {products[e].price} </p>
                        <p>X {products[e].number}</p>
                        <p>= {products[e].number * products[e].price}</p>
                        <Button variant="danger" onClick={() => handleDelete(e)}>Delete</Button>{' '}
                    </div>
                )
            })}
        </div>
        <div className={cx('wrap-total')}>
            <h1>Total</h1>
            <h1>{total}</h1>
        </div>
        <div className={cx("wrap-address")}>
            <p>Address</p> <input type="text" onChange={handleChange} name="adress" value={adress}></input>
        </div>
        <div className={cx("wrap-phone")}>
            <p>Phone</p> <input type="text" onChange={handleChange} name="phone" value={phone}></input>
        </div>
        <div className={cx("wrap-button")}>
            <Button variant="outline-secondary" onClick={handleBack}>Back menu</Button>{' '}
            <Button variant="outline-success" onClick={handleSave}>Payment</Button>{' '}
        </div>

    </div> );
}

export default Invoice;