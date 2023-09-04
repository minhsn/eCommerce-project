import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Layout/DefaultLayout";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import {
  AiFillStar,
  AiOutlineUser,
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
import { Link, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import request from "../../utils/request";

const cx = classNames.bind(styles);

function Home() {
  const [products] = useContext(ProductContext);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClose = () => {
    setShow(false);
    setDeleteId()
  }
  const handleShow = (productId) => {
    setDeleteId(productId);
    setShow(true)
  }
  useEffect(() => {
    useSearchParams()
  },[searchParams])


  const handleDelete = async () => {
    try {
        await request.delete(`/api/private/products/${deleteId}`)
        window.location.reload(false);
    } catch (error) {
        alert(error.response.data.message)
    }
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
              <div
                className={cx("product-img")}
                style={{
                  "backgroundImage": `url(http://localhost:18001/api/public/image?imgName=${product.imageUrl})`,
                }}
              ></div>
              <div className={cx("product-content")}>
                <div className={cx("admin-layout")}>
                  <h3>{product.name}</h3>
                  <div>
                    {true && (
                      <Link to={"/edit"}>
                        <AiFillEdit style={{ color: "#3498db" }} />
                      </Link>
                    )}
                    <span> </span>
                    {true && (
                      <Link onClick={() => handleShow(product.id)}>
                        <AiFillDelete style={{ color: "#c0392b" }} />
                      </Link>
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
      </div>
    </div>
  );
}

export default Home;
