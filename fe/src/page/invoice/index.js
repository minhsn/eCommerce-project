import { useEffect, useState } from "react";
import styles from "./Invoice.module.scss";
import classNames from "classnames/bind";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles)

function Invoice() {
    const [products, setProducts] = useState({})
    const [key, setKey] = useState([])
    const [total, setTotal] = useState()
    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/')
    }

    const handleSave = async () => {
        alert(1)
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
        <div>
            <p>Total</p>
            <p>{total}</p>
        </div>
        <div>
            <span>Address</span> <input type="text"></input>
        </div>
        <div>
            <span>Phone</span> <input type="text"></input>
        </div>
        <div>
        <Button variant="outline-secondary" onClick={handleBack}>Back menu</Button>{' '}
                <Button variant="outline-success" onClick={handleSave}>Payment</Button>{' '}
        </div>

    </div> );
}

export default Invoice;