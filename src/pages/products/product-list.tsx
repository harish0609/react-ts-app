import React, { useEffect, useState } from 'react';
import "./product-list.scss"

function ProductList(props: any) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
    }, []);

    function getProducts() {
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((res) => {
            setProducts(res.products);
        });
    }

    return (
        <div>
        This is Product LIst
        <div className='product-container'>
            {products.map((product: any) => {
                return <div key={product.id} className='product-item'>
                    <div className='product-inner'>
                        <div>
                            <img src={product.thumbnail} alt='Product-image' className='product-image' />
                        </div>
                        <div>
                            {product.title}
                        </div>
                    </div>
                </div>;
            })}
        </div>
        </div>
    )
}

export default ProductList
