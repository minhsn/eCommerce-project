import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import {
  AiFillStar,
  AiOutlineUser,
  AiFillDelete,
  AiFillEdit,
  AiOutlinePlus
} from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import request from "../../utils/request";
import { Cookies } from "react-cookie";

const cx = classNames.bind(styles);

function Home() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [searchParams, ] = useSearchParams();
  const searchWord = searchParams.get('name')
  const cookies = new Cookies();
  const [role] = useState(cookies.get("role"));
  const navigate = useNavigate()

  const handleClose = () => {
    setShow(false);
    setDeleteId()
  }
  const handleShow = (productId) => {
    setDeleteId(productId);
    setShow(true)
    console.log(products);
  }
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await request.get('/api/public/products', {params: {
            name: searchWord
        }})
        setProducts(res.data)
      } catch (error) {
          alert('request error')
      }
    }

    getData()
  },[searchWord])


  const handleDelete = async () => {
    try {
        await request.delete(`/api/private/products/${deleteId}`, {
          withCredentials: true
        })
        navigate(0)
    } catch (error) {
        alert(error.response.data.message)
        navigate('/login')
    }
  }

  const handleAdd = async () => {
    navigate('/product/create')
  }

  return (
    <div className={cx("wrap")}>
        {/* modal delete */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure delete this product ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Layout screen */}
      <h1 style={{color:'white'}}>Our Menu</h1>
      <div className={cx("content-wrap")}>
        {products.map((product) => {
          return (
            <div key={product.id} className={cx("product-item")}>
              <Link to={`/detail/${product.id}`}>
                <div
                  className={cx("product-img")}
                  style={{
                    "backgroundImage": `url(http://localhost:18001/api/public/image?imgName=${product.imageUrl})`,
                  }}
                >
                </div>
              </Link>
              <div className={cx("product-content")}>
                <div className={cx("admin-layout")}>
                  <h3>{product.name}</h3>
                  <div>
                    {role && (
                      <button className={cx('admin-button')}>
                        <AiFillEdit style={{ color: "#3498db" }} />
                      </button>
                    )}
                    <span> </span>
                    {role && (
                      <button onClick={() => handleShow(product.id)} className={cx('admin-button')}>
                        <AiFillDelete style={{ color: "#c0392b" }} />
                      </button>
                    )}
                  </div>
                </div>
                <p>{product.description}</p>
                <div className={cx("price-wrap")}>
                  <p className={cx("price")}>{product.price + "VND"}</p>
                  <div>
                    {product.averageRating && (
                      <span>{product.averageRating}</span>
                    )}
                    {product.averageRating && (
                      <AiFillStar className={cx("star")} />
                    )}
                    {product.numberRating && (
                      <span>{"   " + product.numberRating + "+"}</span>
                    )}
                    {product.numberRating && (
                      <AiOutlineUser className={cx("star")} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* button add */}
        {role && <Button variant="outline-secondary" className={cx("product-item")} onClick={handleAdd}>
          <AiOutlinePlus className={cx('add-logo')}/>
        </Button>}
      </div>
    </div>
  );
}

export default Home;
