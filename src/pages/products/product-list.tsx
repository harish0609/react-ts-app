import React, { useCallback, useEffect, useState } from 'react';
import "./product-list.scss"
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from './product-action';
import { IState } from '../redux/state-interface';


function ProductList(props: any) {

    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    // const [cart, setCart]: any = useState([]);
    const [showCart, setShowCart]: any = useState(false);

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
    
    let slowFn = useCallback(debounce((v: any) => {
        getProductsSearch(v)
    }, 500), [])
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
            </div> : <div className='product-container'>
                {products.map((product: any) => {
                    return <div key={product.id} className='product-item'>
                        <div className='product-inner'>
                            <div>
                                <img src={product.thumbnail} alt='Product-image' className='product-image' />
                            </div>
                            <div>
                                {product.title}
                            </div>
                            <div>
                                <button onClick={() => {
                                    // setCart([...cart, product])
                                    dispatch(productActions.addcart(product))
                                }}>Add To Cart</button>
                            </div>
                        </div>
                    </div>;
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