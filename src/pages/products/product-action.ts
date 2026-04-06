export let productActions = {
    addcart: addcart
}

function addcart(value: any) {
    return { type: PRODUCT_CONST.ADD_CART, value: value }
}


export const PRODUCT_CONST = {
    ADD_CART: "ADD_CARD"
}