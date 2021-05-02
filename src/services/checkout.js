import { Sequelize } from 'sequelize';

import CartItem from '../dao/cartItem'
import Promo from '../dao/promo'
import Product from '../dao/product'

import { calculateTotalPayment } from '../libs/payment'

CartItem.belongsTo(Product, { foreignKey: 'productId' })
Product.hasMany(Promo, { foreignKey: 'productId'})
Promo.belongsTo(Product, {foreignKey: 'freeProductId'})

export default async (obj, args) => {
  const Op = Sequelize.Op;
  const { 
    input: {
      cartItemIds
    } 
  } = args || {}

  const result = await CartItem.findAll({
    where: { id: {
      [Op.in]: cartItemIds
    }},
    raw: true,
    include: [
      {
        model: Product,
        include: [ 
          {
            model: Promo, 
            include: [ Product ],
          }
        ]
      }
    ]
  })

  const cartItems = result.map(item => {

    let freeProduct = {}
    if(item['product.promos.freeProductId']){
      freeProduct = {
        id: item['product.promos.product.id'],
        sku: item['product.promos.product.sku'],
        name: item['product.promos.product.name'],
        price: item['product.promos.product.price'],
        quantity: item['product.promos.product.quantity'],
      }
    }

    return {
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      promo: {
        minQuantity: item['product.promos.minQuantity'],
        discount: item['product.promos.discount'],
        freeQuantity: item['product.promos.freeQuantity'],
        freeProduct: {
          ...freeProduct
        }
      },
      product: {
        sku: item['product.sku'],
        name: item['product.name'],
        quantity: item['product.quantity'],
        price: item['product.price'],
      }
    }
  })

  return {
    totalPayment: calculateTotalPayment(cartItems),
    items: cartItems
  }
}
