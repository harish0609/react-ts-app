import React, { useCallback, useEffect, useRef, useState } from 'react';
import "./product-list.scss"
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from './product-action';
import { IState } from '../redux/state-interface';
import Dialog from '../components/dialog';


function ProductList(props: any) {

    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    // const [cart, setCart]: any = useState([]);
    const [showCart, setShowCart]: any = useState(false);
    const [open, setOpen]: any = useState(false);

    const dispatch = useDispatch();
    const { cartArr  } = useSelector((state: IState) => state.productReducer);

    useEffect(() => {
        getProducts()
    }, []);

    function getProducts() {
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((res) => {
            setProducts(res.products);
        }).catch((err) => {
            console.log(err.message)
        });
    }

    function getProductsSearch(search: string) {
        console.log(search);
        // fetch(`https://dummyjson.com/products/search?q=${search}&limit=10&skip=10`)
        fetch(`https://dummyjson.com/products/search?q=${search}`)
        .then(res => res.json())
        .then((res) => {
            setProducts(res.products);
        });
    }
    
    const debouncedRef = useRef(
        debounce((v: any) => {
            getProductsSearch(v);
        }, 500)
    );

    const slowFn = useCallback((v: any) => {
        debouncedRef.current(v);
    }, []);

    function onChange(v: string) {
        setQuery(v);
        slowFn(v);
    }

    return (
        <div>
            <div className='nav-bar'>
                <div>Header</div>
                <div >
                    <input type='text' onChange={(e) => {
                        onChange(e.target.value)
                    }} value={query}/>
                </div>
                <div >
                    <button className='' onClick={() => {
                        setShowCart(!showCart)
                    }} type='button'>Show / Hide Cart</button>
                </div>
                <div >
                    <h3>{cartArr.length}</h3>
                </div>
                
            </div>
            <button onClick={() => setOpen(true)}>Open Dialog</button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                title="Cart Details"
                width="600px"
                height="100%"
                footer={
                <>
                    <button onClick={() => setOpen(false)}>Cancel</button>
                    <button>Proceed To Payment</button>
                </>
                }
            >
                <p>This is dynamic dialog content</p>
                <p>You can pass anything here</p>
            </Dialog>
            {showCart ?   <div className='product-container'>
                <h1>Cart Details</h1>
                {cartArr.map((product: any) => {
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
            </div> : <div className="product-container">
                {products.map((product: any) => {
                    return (
                    <div key={product.id} className="product-card">
                        
                        {/* Badge */}
                        {product.discountPercentage && (
                        <span className="product-badge">
                            {Math.round(product.discountPercentage)}% OFF
                        </span>
                        )}

                        {/* Image */}
                        <div className="product-image-wrapper">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="product-image"
                        />
                        </div>

                        {/* Info */}
                        <div className="product-info">
                        <h3 className="product-title">{product.title}</h3>

                        {/* Rating */}
                        <div className="product-rating">
                            ⭐ {product.rating} / 5
                        </div>

                        {/* Price */}
                        <div className="product-price">
                            ₹{product.price}
                        </div>

                        {/* Button */}
                        <button
                            className="add-to-cart-btn"
                            onClick={() => dispatch(productActions.addcart(product))}
                        >
                            Add to Cart
                        </button>
                        </div>
                    </div>
                    );
                })}
                </div>}
        </div>
    )
}

export default ProductList

function debounce(fn: Function, delay = 400) {
    let timer: any;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args)
        }, delay);
    }
}