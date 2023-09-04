import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import request from "../../utils/request";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AiFillStar } from "react-icons/ai";

const cx = classNames.bind(styles)

function Detail() {
    const {productId} = useParams();
    const [product, setProduct] = useState()
    const [review, setReview] = useState([])
    const [show, setShow] = useState(false);
    const [comment, setComment] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleOnChangeComment = (e) => {
        setComment(e.target.value)
    }

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

    return ( 
    <div className={cx('wrap')}>
        <h1>Product detail</h1>
        <div className={cx('wrap-product')}>
            <div className={cx('product-img')}>
                {product && <img src={`http://localhost:18001/api/public/image?imgName=${product.imageUrl}`} alt={product && product.name}></img>}
            </div>
            <div className={cx('detail-wrap')} >
                <div className={cx('detail-content')}>
                    <h2>{product && product.name}</h2>
                    <p>{product && product.description}</p>
                    <h4>{product && product.price} VND</h4>
                    <Button variant="outline-warning" className={cx('button-buy')}>Add to bag</Button>
                </div>
            </div>
        </div>
        <Button variant="outline-light" onClick={handleShow}  className={cx('add-comment')}>Add your comment</Button>
        <div className={cx('wrap-review')}>
            {review.map((e, index) => {
                return (
                <div key={index} className={cx('wrap-comment')}>
                    <div className={cx('user-comment')}>
                        <p className={cx('user-name')}>{e.User.username}</p>
                        <p>{e.rate}</p>
                        <AiFillStar className={cx("star")} />
                    </div>
                    <p>{e.comment}</p>

                </div>)
            })}
        </div>

        {/* Modal review */}
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rating product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add your comment"
                autoFocus
                onChange={handleOnChangeComment}
                value={comment}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Rating</Form.Label>
              <p>hii</p>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div> );
}

export default Detail