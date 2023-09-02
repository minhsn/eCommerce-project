import classNames from 'classnames/bind';
import Header from './Header' 
import Sidebar from './Sidebar'
import styles from './DefaultLayout.module.scss'
import request from '../../utils/request';
import { createContext, useEffect, useState } from 'react';

const cx = classNames.bind(styles)
export const ProductContext = createContext()

function DefaultLayout( {children} ) {

    const [products, setProducts] = useState([])
    
    useEffect(() => {
        const callApi = async () => {
            try {
                const res = await request.get('/api/public/products')
                setProducts(res.data)
            } catch (error) {
                alert('request error')
            }
        }
        callApi()
    }, [])

    return (
        <ProductContext.Provider value={[products, setProducts]}>
            <div className={cx('wrapper')}>
                <Header/>
                <div className={cx('container')}>
                    <Sidebar/>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </ProductContext.Provider>
    );
}

export default DefaultLayout;