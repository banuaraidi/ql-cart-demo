import { listProduct, getProduct } from '../dao/product';

export default () => {
  return {
    products: (obj, args, context) => listProduct(obj, args, context),
    product: (obj, args, context) => getProduct(obj, args, context),
  };
};
