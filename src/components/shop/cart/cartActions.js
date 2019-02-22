export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';

export function addProductToCart(product) {
  console.log(product);
  return (dispatch) => {
    dispatch({ 
      type: ADD_PRODUCT_TO_CART,
      payload: product,
    });
  }
}

const cartActions = {
  addProductToCart,
};

export default cartActions;
