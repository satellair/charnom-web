import { ADD_TO_CART } from '../actions/cartAction';
const initState = {
  cart: [],
  total: 0,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total,
      };
    default:
      break;
  }
  return state;
};

export default cartReducer;
