import PRODUCT from '../../config/product';

export default {
  // Value of all items in basket
  get total(): number {
    return PRODUCT.price;
  },
}

