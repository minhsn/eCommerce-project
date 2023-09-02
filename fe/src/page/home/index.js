import { useContext } from "react";
import { ProductContext } from "../../Layout/DefaultLayout";
import classNames from "classnames/bind";
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    const [products] = useContext(ProductContext)

    return (
    <div className={cx('wrap')}>
        <h2 >Our Menu</h2>
        <div className={cx("content-wrap")}>
            {products.map(product => {
            return <div key={product.id} className={cx('product-item')}>
                <div>picture</div>
                <div>
                    <h1 >{product.name}</h1>
                    <h1 >{product.price}</h1>
                    <h1 >{product.description}</h1>
                    <h1 >{product.averageRating}</h1>
                    <h1 >{product.numberRating}</h1>
                </div>
            </div>
            })}
        </div>
    </div>)
}

export default Home;