import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import request from "../../utils/request";

const cx = classNames.bind(styles)

function Detail() {
    const {productId} = useParams();
    const [product, setProduct] = useState()
    const [review, setReview] = useState([])
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await request.get(`/api/public/products/detail/${productId}`)
                setProduct(res.data.product)
                setReview(res.data.review)
            } catch (error) {
              alert('product not found')
              window.location.replace('/')
            } 
        }
        getData()
    },[productId])

    console.log(product);
    return ( 
    <div className={cx('wrap')}>
        <h1>Product detail</h1>
        <div className={cx('wrap-product')}>
            <div className={cx('product-img')}>
                <img src={`http://localhost:18001/api/public/image?imgName=${product && product.imageUrl}`} alt={product && product.name}></img>
            </div>
            <div className={cx('detail-wrap')} >
                <div className={cx('detail-content')}>
                    <h2>{product && product.name}</h2>
                    <p>{product && product.description}</p>
                    <h3>{product && product.price}</h3>
                </div>
            </div>
        </div>
        <div className={cx('wrap-review')}>
            {review.map((e, index) => {
                return (
                <div key={index}>
                    <p>{e.comment}</p>
                </div>)
            })}
        </div>
    </div> );
}

export default Detail