export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (product = {}, cart = []) => {
  let exists = false;

  if (cart.length > 0) {
    for (const c of cart) {
      //@ts-ignore
      if (c.id === product.id) {
        //@ts-ignore
        c.qty++;
        exists = true;
      }
    }
  }

  if (!exists) {
    //@ts-ignore
    cart.push(product);
  }
  //@ts-ignore
  const total = cart.reduce((totalQty, product) => totalQty + product.qty, 0);
  
  return {
    type: ADD_TO_CART,
    payload: {
      cart: cart,
      total: total,
    }
  }
};
