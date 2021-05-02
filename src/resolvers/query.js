import { listProduct, getProduct } from '../dao/product';
import listCart from '../services/cartList'

export default () => {
  return {
    products: (obj, args, context) => listProduct(obj, args, context),
    product: (obj, args, context) => getProduct(obj, args, context),
    cart: (obj, args, context) => listCart(obj, args, context)
  };
};
