import { PRODUCT_CONST } from "./product-action"

let initialState = {
    cartArr: []
}

export function productReducer(state = initialState, action: any) {
    switch (action.type) {
        case PRODUCT_CONST.ADD_CART:
            return { ...state, cartArr: [...state.cartArr, action.value]}
    
        default:
            return state;
    }
}