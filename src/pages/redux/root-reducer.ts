import { combineReducers, createStore } from "redux";
import { productReducer } from "../products/product-reducer";

export const rootreducer =  combineReducers({
    productReducer: productReducer
})

export let store = createStore(rootreducer);