import classNames from "classnames/bind";
import styles from "./EditPage.module.scss";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import request from "../../utils/request";

const cx = classNames.bind(styles)

function EditPage() {
    const {productId} = useParams();
    const [img, setImg] = useState()
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/')
    }

    const handleSave = async () => {
        try {
            await request.post('/api/private/products', {
                id: productId,
                name: name,
                price: price,
                description: description,
                image: img
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            alert('update success')
            navigate('/')
        } catch (error) {
            alert(error.response.data.message)
        }
    }


    const handelImg = (e) => {
        const file = e.target.files[0]
        file.priview = URL.createObjectURL(file)
        setImg(file)
    }

    const handleChange = (e) => {
        if(e.target.name === 'name') {
          setName(e.target.value)
        } else if (e.target.name === 'price') {
          setPrice(e.target.value)
        } else if (e.target.name === 'description') {
          setDescription(e.target.value)
        }
      } 

      useEffect(() => {
        const getData = async () => {
            try {
                const res = await request.get(`/api/public/products/detail/${productId}`)
                setName(res.data.product.name)
                setPrice(res.data.product.price)
                setDescription(res.data.product.description)
                setImg(res.data.product.imageUrl)
            } catch (error) {
              alert('product not found')
              window.location.replace('/')
            } 
        }
        getData()
      }, [productId])


    return ( 
        <div className={cx('page-wrap')} >
            <h1>Edit product {productId}</h1>

            <div className={cx("form-request")}>
                <div className={cx('img-wrap')}>
                    <input type="file" onChange={handelImg} id="file"></input>
                    {img && <img src={img.priview || `http://localhost:18001/api/public/image?imgName=${img}`} alt="product"></img>}
                </div>
                <div className={cx('content-wrap')}>
                    <div className={cx('name-wrap')}>
                        <span className={cx('name-tilte')}>Name</span> <input type="text" placeholder=" ..." value={name || ''} name="name" onChange={handleChange}/>
                    </div>
                    <div className={cx('price-wrap')}>
                        <span className={cx('price-tilte')}>Price</span> <input type="text" placeholder="  10000" name="price" value={price || ''} onChange={handleChange}/> <span>VND</span>
                    </div>
                    <div className={cx('description-wrap')}>
                        <p>Description</p> 
                        <textarea value={description || ''} name="description" onChange={handleChange}/> 
                    </div>
                </div>
            </div>
            <div className={cx('button-wrap')}>
                <Button variant="outline-secondary" onClick={handleBack}>Back menu</Button>{' '}
                <Button variant="outline-success" onClick={handleSave}>Save</Button>{' '}
            </div>
        </div>
     );
}

export default EditPage;